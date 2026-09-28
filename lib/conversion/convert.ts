import type { ConversionSettings } from '@/lib/config/settings';
import type { FormatMeta } from '@/lib/config/formats';
import { limits } from '@/lib/config/limits';
import { ConversionError, toConversionError } from './errors';

/**
 * Client-side image conversion for any supported format pair.
 *
 * Decoding: HEIC/HEIF are decoded by `heic2any` (a WebAssembly build of
 * libheif, dynamically imported so it only loads when needed). Every other
 * input (JPG, PNG, WEBP, AVIF, GIF, BMP) is decoded natively by the browser via
 * createImageBitmap. Encoding is done with a canvas, which can produce PNG, JPG,
 * and WEBP. Everything runs on the user's device — no uploads.
 */

export interface ConvertOutput {
  blob: Blob;
  width: number;
  height: number;
}

let heic2anyPromise: Promise<typeof import('heic2any').default> | null = null;
function loadDecoder() {
  if (!heic2anyPromise) {
    heic2anyPromise = import('heic2any').then((m) => m.default);
  }
  return heic2anyPromise;
}

let upngPromise: Promise<typeof import('upng-js').default> | null = null;
function loadUpng() {
  if (!upngPromise) {
    upngPromise = import('upng-js').then((m) => m.default);
  }
  return upngPromise;
}

type PdfjsModule = typeof import('pdfjs-dist/legacy/build/pdf.mjs');
let pdfjsPromise: Promise<PdfjsModule> | null = null;
function loadPdfjs(): Promise<PdfjsModule> {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist/legacy/build/pdf.mjs').then((pdfjs) => {
      // The worker ships as a separate ESM chunk; webpack emits it as an asset
      // and `new URL(..., import.meta.url)` resolves to its deployed URL.
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
        import.meta.url,
      ).toString();
      return pdfjs;
    });
  }
  return pdfjsPromise;
}

/** Longest side (px) we rasterize vector/document sources to. */
const RASTER_TARGET = 2048;
const RASTER_MAX = 4096;

/** Reject if a promise doesn't settle within `ms` (guards a hung decoder). */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new ConversionError(
          'unsupported-variant',
          'This file took too long to decode and may use an unsupported variant.',
        ),
      );
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/** Feature check for the APIs the converter depends on. */
export function isConversionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const hasCanvas =
    typeof document !== 'undefined' &&
    typeof document.createElement('canvas').getContext === 'function';
  const hasBlob =
    typeof Blob !== 'undefined' && typeof URL.createObjectURL === 'function';
  return hasCanvas && hasBlob;
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new ConversionError('decode-failed', 'Failed to load image.'));
    img.src = src;
  });
}

/** Decode a blob into a drawable source + its dimensions. */
async function decodeToSource(blob: Blob): Promise<{
  source: CanvasImageSource;
  width: number;
  height: number;
  cleanup: () => void;
}> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(blob);
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        cleanup: () => bitmap.close(),
      };
    } catch {
      // Fall through to the <img> path (e.g. Safari quirks).
    }
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImageElement(url);
    return {
      source: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      cleanup: () => URL.revokeObjectURL(url),
    };
  } catch (err) {
    URL.revokeObjectURL(url);
    throw err;
  }
}

export type DecodedSource = {
  source: CanvasImageSource;
  width: number;
  height: number;
  cleanup: () => void;
};

/** Parse a CSS length like "512", "512px", or "512pt" to a number (NaN if %/unknown). */
function parseLength(value: string | null): number {
  if (!value) return NaN;
  const m = value.trim().match(/^([0-9]*\.?[0-9]+)(px|pt)?$/i);
  return m ? parseFloat(m[1]) : NaN;
}

/**
 * Rasterize an SVG. The browser re-rasterizes an SVG at whatever pixel size is
 * set on the `<img>`, so we compute a sensible output resolution from the SVG's
 * intrinsic size / viewBox and bake explicit width/height into the markup.
 */
async function decodeSvgToSource(file: File): Promise<DecodedSource> {
  const text = await file.text();
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = doc.documentElement;
  if (
    svg.nodeName.toLowerCase() !== 'svg' ||
    doc.getElementsByTagName('parsererror').length > 0
  ) {
    throw new ConversionError('decode-failed', 'This file is not a valid SVG image.');
  }

  const vb = (svg.getAttribute('viewBox') || '')
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  let w = parseLength(svg.getAttribute('width'));
  let h = parseLength(svg.getAttribute('height'));
  if ((!w || !h) && vb.length === 4) {
    w = w || vb[2];
    h = h || vb[3];
  }
  if (!w || !h) {
    w = 512;
    h = 512;
  }
  // Preserve a viewBox so scaling the width/height stays crisp.
  if (vb.length !== 4) svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

  const longest = Math.max(w, h);
  let scale = longest < RASTER_TARGET ? RASTER_TARGET / longest : 1;
  if (longest * scale > RASTER_MAX) scale = RASTER_MAX / longest;
  const rw = Math.max(1, Math.round(w * scale));
  const rh = Math.max(1, Math.round(h * scale));
  svg.setAttribute('width', String(rw));
  svg.setAttribute('height', String(rh));

  const serialized = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([serialized], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImageElement(url);
    return {
      source: img,
      width: rw,
      height: rh,
      cleanup: () => URL.revokeObjectURL(url),
    };
  } catch (err) {
    URL.revokeObjectURL(url);
    throw err;
  }
}

/**
 * Render the first page of a PDF to a canvas at a high resolution. PDF is a
 * document format, so we take the first page — the most common thing people
 * want when turning a PDF into an image.
 */
async function decodePdfToSource(file: File): Promise<DecodedSource> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  try {
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const longest = Math.max(base.width, base.height);
    const scale = Math.min(3, Math.max(1, RASTER_TARGET / longest));
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new ConversionError('decode-failed', 'Canvas is unavailable.');
    // PDF pages are logically white; fill so transparent areas don't turn black.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;
    return {
      source: canvas,
      width: canvas.width,
      height: canvas.height,
      cleanup: () => {
        void pdf.destroy();
      },
    };
  } catch (err) {
    void pdf.destroy();
    throw err;
  }
}

/**
 * Decode any supported input file to a drawable source, dispatching by decoder
 * family: HEIC/HEIF via heic2any, SVG rasterized from markup, PDF's first page
 * via pdf.js, and everything else natively. Shared by the converter and the
 * task-specific image tools (compress, resize, …). `from` is the detected
 * source format; when omitted it decodes natively.
 */
export async function decodeImageToSource(
  file: File,
  from?: { decoder: 'native' | 'heic' | 'svg' | 'pdf' },
): Promise<DecodedSource> {
  const decoder = from?.decoder ?? 'native';
  if (decoder === 'svg') {
    return withTimeout(decodeSvgToSource(file), limits.conversionTimeoutMs);
  }
  if (decoder === 'pdf') {
    return withTimeout(decodePdfToSource(file), limits.conversionTimeoutMs);
  }
  if (decoder === 'heic') {
    const heic2any = await loadDecoder();
    const output = await withTimeout(
      heic2any({ blob: file, toType: 'image/png', quality: 1 }),
      limits.conversionTimeoutMs,
    );
    const decodable = Array.isArray(output) ? output[0] : output;
    if (!decodable || decodable.size === 0) {
      throw new ConversionError('decode-failed', 'The decoder returned an empty image.');
    }
    return decodeToSource(decodable);
  }
  return decodeToSource(file);
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new ConversionError('encode-failed', 'Failed to encode the image.'));
      },
      mime,
      quality,
    );
  });
}

async function encodeOptimizedPng(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: number,
): Promise<Blob> {
  const UPNG = await loadUpng();
  const imageData = ctx.getImageData(0, 0, width, height);
  const cnum = Math.max(2, Math.min(256, Math.round(colors)));
  const rgba = imageData.data.buffer.slice(
    imageData.data.byteOffset,
    imageData.data.byteOffset + imageData.data.byteLength,
  );
  const png = UPNG.encode([rgba], width, height, cnum);
  return new Blob([png], { type: 'image/png' });
}

/**
 * Draw a decoded image onto a canvas (optionally downscaled and flattened) and
 * encode it to the target format.
 */
async function renderToOutput(
  source: CanvasImageSource,
  srcWidth: number,
  srcHeight: number,
  to: FormatMeta,
  settings: ConversionSettings,
): Promise<ConvertOutput> {
  let width = srcWidth;
  let height = srcHeight;

  if (!settings.preserveDimensions && settings.maxDimension > 0) {
    const longest = Math.max(width, height);
    if (longest > settings.maxDimension) {
      const scale = settings.maxDimension / longest;
      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));
    }
  }

  // The target keeps transparency only if the format supports it AND the user
  // hasn't asked to flatten it. Formats without alpha (JPG, BMP) always flatten.
  const keepAlpha = to.transparency && settings.preserveTransparency;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: keepAlpha });
  if (!ctx) throw new ConversionError('encode-failed', 'Canvas is unavailable.');

  if (!keepAlpha) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, width, height);

  const mime = to.outputMime ?? 'image/png';

  let blob: Blob;
  if (to.id === 'png' && settings.compression === 'optimized') {
    blob = await encodeOptimizedPng(ctx, width, height, settings.colors);
  } else if (to.lossy) {
    // JPG / WEBP: use the quality setting.
    blob = await canvasToBlob(canvas, mime, settings.quality);
  } else {
    blob = await canvasToBlob(canvas, mime);
  }

  // Some browsers silently fall back to PNG when a mime is unsupported; if the
  // returned blob isn't the requested type, treat it as an encode failure.
  if (to.outputMime && blob.type && blob.type !== to.outputMime) {
    throw new ConversionError(
      'encode-failed',
      `Your browser can’t encode ${to.label} images. Try a different browser.`,
    );
  }

  return { blob, width, height };
}

/**
 * Convert a single file from `from` to `to`. Throws a `ConversionError` with a
 * user-friendly message on any failure.
 */
export async function convertImage(
  file: File,
  from: FormatMeta,
  to: FormatMeta,
  settings: ConversionSettings,
): Promise<ConvertOutput> {
  if (!isConversionSupported()) {
    throw new ConversionError('unsupported-browser', 'Conversion is not supported here.');
  }

  // 1 + 2. Decode the source to a drawable canvas/bitmap/image.
  let decoded: DecodedSource;
  try {
    decoded = await decodeImageToSource(file, from);
  } catch (err) {
    throw toConversionError(err);
  }

  // 3. Draw + encode to the target format.
  try {
    const output = await renderToOutput(
      decoded.source,
      decoded.width,
      decoded.height,
      to,
      settings,
    );
    decoded.cleanup();
    return output;
  } catch (err) {
    decoded.cleanup();
    throw toConversionError(err);
  }
}
