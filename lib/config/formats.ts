/**
 * Image-format metadata. This drives the whole multi-converter site: which
 * files each converter accepts, how they're decoded/encoded, and the
 * format-specific copy shown on each conversion page.
 *
 * Decoding: `native` formats are decoded by the browser itself
 * (createImageBitmap); `heic` formats are decoded by heic2any (WASM libheif).
 * Encoding: only formats with an `outputMime` can be produced by a canvas
 * (PNG, JPG, WEBP) — those are the valid conversion targets.
 */
export interface FormatMeta {
  id: string;
  /** Short label, e.g. "PNG". */
  label: string;
  /** Full name, e.g. "Portable Network Graphics". */
  fullName: string;
  /** Accepted file extensions (lower-case, with dot). First is canonical. */
  exts: string[];
  /** MIME types the browser/OS may report. */
  mimes: string[];
  /** How the file is decoded in the browser. */
  decoder: 'native' | 'heic' | 'svg' | 'pdf';
  /**
   * Broad family this format belongs to. Defaults to `raster`. `vector` (SVG)
   * and `document` (PDF) inputs are rasterized before encoding. `document`
   * formats are excluded from the image-format comparison table.
   */
  category?: 'raster' | 'vector' | 'document';
  /**
   * Optional note shown on the converter for formats with a caveat worth
   * stating up front (e.g. PDF renders the first page).
   */
  inputNote?: string;
  /** MIME used to encode this format via canvas. Present only for valid targets. */
  outputMime?: string;
  /** True for lossy formats. */
  lossy: boolean;
  /** Supports an alpha (transparency) channel. */
  transparency: boolean;
  /** Supports animation / multiple frames. */
  animation: boolean;
  /** One-sentence description. */
  summary: string;
  /** Selling points, used in "why convert" copy. */
  strengths: string[];
  /** Typical real-world use. */
  typicalUse: string;
}

export const formats: Record<string, FormatMeta> = {
  heic: {
    id: 'heic',
    label: 'HEIC',
    fullName: 'High Efficiency Image Container',
    exts: ['.heic'],
    mimes: ['image/heic', 'image/heic-sequence'],
    decoder: 'heic',
    lossy: true,
    transparency: true,
    animation: true,
    summary:
      'Apple’s default photo format, storing high-quality images in about half the space of a JPEG.',
    strengths: [
      'Very small file sizes',
      'High image quality',
      'Used by iPhones and iPads',
    ],
    typicalUse: 'iPhone and iPad camera photos',
  },
  heif: {
    id: 'heif',
    label: 'HEIF',
    fullName: 'High Efficiency Image Format',
    exts: ['.heif'],
    mimes: ['image/heif', 'image/heif-sequence'],
    decoder: 'heic',
    lossy: true,
    transparency: true,
    animation: true,
    summary:
      'The container standard behind HEIC, used by some Android phones and cameras.',
    strengths: ['Small file sizes', 'High quality', 'Modern container format'],
    typicalUse: 'Android phones, mirrorless cameras, and exports',
  },
  jpg: {
    id: 'jpg',
    label: 'JPG',
    fullName: 'JPEG',
    exts: ['.jpg', '.jpeg'],
    mimes: ['image/jpeg'],
    decoder: 'native',
    outputMime: 'image/jpeg',
    lossy: true,
    transparency: false,
    animation: false,
    summary:
      'The universal photo format — small files and support in every app and device.',
    strengths: ['Opens everywhere', 'Small file sizes', 'Ideal for photographs'],
    typicalUse: 'Sharing photos and web images',
  },
  png: {
    id: 'png',
    label: 'PNG',
    fullName: 'Portable Network Graphics',
    exts: ['.png'],
    mimes: ['image/png'],
    decoder: 'native',
    outputMime: 'image/png',
    lossy: false,
    transparency: true,
    animation: false,
    summary:
      'A lossless format with transparency support that opens in every browser and editor.',
    strengths: ['Lossless quality', 'Transparency support', 'Universal compatibility'],
    typicalUse: 'Graphics, screenshots, logos, and editing',
  },
  webp: {
    id: 'webp',
    label: 'WEBP',
    fullName: 'WebP',
    exts: ['.webp'],
    mimes: ['image/webp'],
    decoder: 'native',
    outputMime: 'image/webp',
    lossy: true,
    transparency: true,
    animation: true,
    summary:
      'Google’s modern web format offering small files with optional transparency.',
    strengths: ['Small file sizes', 'Transparency support', 'Great for websites'],
    typicalUse: 'Fast-loading website images',
  },
  avif: {
    id: 'avif',
    label: 'AVIF',
    fullName: 'AV1 Image File Format',
    exts: ['.avif'],
    mimes: ['image/avif'],
    decoder: 'native',
    lossy: true,
    transparency: true,
    animation: true,
    summary:
      'A cutting-edge format with excellent compression, increasingly used on the web.',
    strengths: ['Excellent compression', 'High quality', 'Transparency support'],
    typicalUse: 'Modern web images',
  },
  gif: {
    id: 'gif',
    label: 'GIF',
    fullName: 'Graphics Interchange Format',
    exts: ['.gif'],
    mimes: ['image/gif'],
    decoder: 'native',
    lossy: false,
    transparency: true,
    animation: true,
    summary: 'An old but universal format best known for simple animations.',
    strengths: ['Universal support', 'Simple animation', 'Small palette graphics'],
    typicalUse: 'Simple animations and low-color graphics',
  },
  bmp: {
    id: 'bmp',
    label: 'BMP',
    fullName: 'Bitmap',
    exts: ['.bmp'],
    mimes: ['image/bmp', 'image/x-ms-bmp'],
    decoder: 'native',
    lossy: false,
    transparency: false,
    animation: false,
    summary: 'An uncompressed Windows image format that produces very large files.',
    strengths: ['Uncompressed', 'Simple format', 'Lossless'],
    typicalUse: 'Legacy Windows images',
  },
  svg: {
    id: 'svg',
    label: 'SVG',
    fullName: 'Scalable Vector Graphics',
    exts: ['.svg'],
    mimes: ['image/svg+xml'],
    decoder: 'svg',
    category: 'vector',
    lossy: false,
    transparency: true,
    animation: false,
    inputNote:
      'SVG is a vector format, so it’s rasterized at up to 4096 px on the longest side. Increase the source’s width/height for a larger result.',
    summary:
      'A vector format that stays razor-sharp at any size, defined by shapes and paths rather than pixels.',
    strengths: [
      'Infinitely scalable',
      'Tiny files for icons and logos',
      'Editable as code',
    ],
    typicalUse: 'Logos, icons, and illustrations',
  },
  pdf: {
    id: 'pdf',
    label: 'PDF',
    fullName: 'Portable Document Format',
    exts: ['.pdf'],
    mimes: ['application/pdf'],
    decoder: 'pdf',
    category: 'document',
    lossy: false,
    transparency: false,
    animation: false,
    inputNote:
      'PDF is a document format, so the first page of each file is rendered to a high-resolution image.',
    summary:
      'A universal document format that preserves layout, text, and graphics exactly across every device.',
    strengths: [
      'Looks identical everywhere',
      'Great for documents and print',
      'Widely supported',
    ],
    typicalUse: 'Documents, invoices, and scans',
  },
};

export function getFormat(id: string): FormatMeta | undefined {
  return formats[id];
}

/** All input formats (anything the converter can decode). */
export const inputFormats: FormatMeta[] = Object.values(formats);

/**
 * Image formats shown in the homepage comparison table — every input except
 * document formats (PDF), whose lossy/transparency/animation columns don't apply.
 */
export const comparableFormats: FormatMeta[] = inputFormats.filter(
  (f) => f.category !== 'document',
);

/** All output formats (anything a canvas can encode). */
export const outputFormats: FormatMeta[] = Object.values(formats).filter(
  (f) => !!f.outputMime,
);

/** All accepted input file extensions across every supported format. */
export const allInputExtensions: string[] = Array.from(
  new Set(inputFormats.flatMap((f) => f.exts)),
);

/** All accepted input MIME types across every supported format. */
export const allInputMimes: string[] = Array.from(
  new Set(inputFormats.flatMap((f) => f.mimes)),
);

/** Detect a source format from a filename's extension. */
export function detectFormat(filename: string): FormatMeta | undefined {
  const dot = filename.lastIndexOf('.');
  if (dot < 0) return undefined;
  const ext = filename.slice(dot).toLowerCase();
  return inputFormats.find((f) => f.exts.includes(ext));
}
