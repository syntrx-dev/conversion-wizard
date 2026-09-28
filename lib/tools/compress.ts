import { detectFormat } from '@/lib/config/formats';
import { decodeImageToSource } from '@/lib/conversion/convert';
import { ConversionError, toConversionError } from '@/lib/conversion/errors';

/**
 * Compress an image down to a target file size, entirely in the browser.
 *
 * Strategy: draw the decoded image to a canvas and binary-search the encoder
 * quality for the highest quality whose encoded size is at or below the target.
 * If even the lowest quality can't reach the target (a big image, a tiny
 * target), progressively downscale the canvas and try again. This is the same
 * approach desktop "save for web" tools use, and it runs with no uploads.
 */

export type CompressMime = 'image/jpeg' | 'image/webp';

export interface CompressOptions {
  /** Desired maximum output size, in bytes. */
  targetBytes: number;
  /** Output encoder. JPEG is the most compatible; WEBP squeezes smaller. */
  mime?: CompressMime;
}

export interface CompressResult {
  blob: Blob;
  bytes: number;
  width: number;
  height: number;
  /** Encoder quality used (0–1). */
  quality: number;
  /** True if the image had to be downscaled to approach the target. */
  scaled: boolean;
  /** True if the output actually reached the target size. */
  reachedTarget: boolean;
}

const MAX_START_DIM = 5000; // don't start from an enormous canvas
const MIN_DIM = 120; // don't shrink past the point of usefulness

function toBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
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

export async function compressToTargetBytes(
  file: File,
  { targetBytes, mime = 'image/jpeg' }: CompressOptions,
): Promise<CompressResult> {
  let decoded;
  try {
    decoded = await decodeImageToSource(file, detectFormat(file.name));
  } catch (err) {
    throw toConversionError(err);
  }

  try {
    let baseW = decoded.width;
    let baseH = decoded.height;
    const longest = Math.max(baseW, baseH);
    if (longest > MAX_START_DIM) {
      const s = MAX_START_DIM / longest;
      baseW = Math.round(baseW * s);
      baseH = Math.round(baseH * s);
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new ConversionError('encode-failed', 'Canvas is unavailable.');

    const encode = async (w: number, h: number, q: number): Promise<Blob> => {
      canvas.width = w;
      canvas.height = h;
      // JPEG has no alpha; flatten onto white so transparency doesn't go black.
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(decoded.source, 0, 0, w, h);
      return toBlob(canvas, mime, q);
    };

    let scale = 1;
    let scaled = false;
    // Track the smallest output we've produced, in case the target is unreachable.
    let smallest: { blob: Blob; quality: number; w: number; h: number } | null = null;

    for (let attempt = 0; attempt < 9; attempt++) {
      const w = Math.max(1, Math.round(baseW * scale));
      const h = Math.max(1, Math.round(baseH * scale));

      // Binary-search quality for the highest one that fits the target.
      let lo = 0.05;
      let hi = 0.95;
      let best: { blob: Blob; quality: number } | null = null;
      for (let i = 0; i < 7; i++) {
        const q = (lo + hi) / 2;
        const blob = await encode(w, h, q);
        if (!smallest || blob.size < smallest.blob.size) {
          smallest = { blob, quality: q, w, h };
        }
        if (blob.size <= targetBytes) {
          best = { blob, quality: q };
          lo = q; // fits — try for higher quality
        } else {
          hi = q; // too big — lower quality
        }
      }

      if (best) {
        return {
          blob: best.blob,
          bytes: best.blob.size,
          width: w,
          height: h,
          quality: best.quality,
          scaled,
          reachedTarget: true,
        };
      }

      // Even the lowest quality overshot. Downscale and try again.
      if (Math.max(w, h) <= MIN_DIM) break;
      scale *= 0.8;
      scaled = true;
    }

    // Target unreachable without destroying the image — return the smallest we got.
    const s = smallest!;
    return {
      blob: s.blob,
      bytes: s.blob.size,
      width: s.w,
      height: s.h,
      quality: s.quality,
      scaled,
      reachedTarget: s.blob.size <= targetBytes,
    };
  } finally {
    decoded.cleanup();
  }
}
