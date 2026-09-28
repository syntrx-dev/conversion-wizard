/**
 * File naming strategies offered in the settings panel.
 * - `original`: keep the source base name.
 * - `lowercase`: lower-case the base name.
 * - `clean`: remove dashes/underscores (and collapse whitespace).
 * - `custom`: use a user-provided base name (see `customName`).
 */
export type NamingFormat = 'original' | 'lowercase' | 'clean' | 'custom';

/**
 * PNG output mode:
 * - `optimized`: palette quantisation (much smaller, lossy but usually visually
 *   indistinguishable). This is the default.
 * - `lossless`: exact 24/32-bit PNG (largest, pixel-perfect).
 */
export type CompressionMode = 'lossless' | 'optimized';

export interface ConversionSettings {
  /**
   * Keep the source image's pixel dimensions. When false the output is scaled
   * down to `maxDimension` on its longest side (useful for very large photos).
   */
  preserveDimensions: boolean;
  /** Longest-edge cap in pixels when preserveDimensions is false. */
  maxDimension: number;
  /**
   * PNG output quality hint (0–1). PNG is lossless, but this is passed to the
   * decoder/encoder and influences intermediate quality where supported.
   */
  quality: number;
  /** Keep an alpha channel if the source contains transparency. */
  preserveTransparency: boolean;
  /** How output filenames are derived from the source filename. */
  namingFormat: NamingFormat;
  /**
   * Base name used when `namingFormat === 'custom'`. Multiple files share this
   * base and are de-duplicated automatically (name.png, name-2.png, …).
   */
  customName: string;
  /**
   * Strip metadata (EXIF/location). Re-encoding through a canvas already drops
   * most metadata; this keeps the intent explicit and future-proof.
   */
  removeMetadata: boolean;
  /** Lossless PNG, or optimized (smaller) palette-quantised PNG. */
  compression: CompressionMode;
  /**
   * Colour count for `optimized` mode (2–256). Fewer colours = smaller files.
   * 256 keeps quality high while still shrinking most photos dramatically.
   */
  colors: number;
}

/**
 * Defaults favour high-quality, no-fuss output: the default is `lossless`
 * (exact, pixel-perfect). Converted files surface a "reduce file size?" prompt
 * that switches to `optimized` (much smaller) for anyone who wants it.
 */
export const defaultSettings: ConversionSettings = {
  preserveDimensions: true,
  maxDimension: 4096,
  // Quality for lossy targets (JPG/WEBP), 0–1. Ignored for PNG output.
  quality: 0.92,
  preserveTransparency: true,
  namingFormat: 'original',
  customName: '',
  removeMetadata: true,
  compression: 'lossless',
  colors: 256,
};
