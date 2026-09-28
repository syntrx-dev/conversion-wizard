/**
 * Client-side limits and validation configuration.
 *
 * These are intentionally conservative defaults tuned for smooth in-browser
 * conversion. Edit any value here to loosen or tighten the limits — the UI,
 * validation, and warnings all read from this single source of truth.
 */
export const limits = {
  /** Maximum number of images allowed in a single batch. */
  maxFiles: 50,
  /** Maximum size of an individual file, in bytes (100 MB). */
  maxFileSizeBytes: 100 * 1024 * 1024,
  /**
   * Above this many files we surface a "large batch may take a while" notice.
   */
  largeBatchThreshold: 20,
  /**
   * How many conversions run at the same time. Kept low so large batches do
   * not freeze the browser or exhaust memory. 2–3 is a good balance.
   */
  concurrency: 2,
  /**
   * Hard cap on how long a single decode may take before we give up and report
   * a friendly error. Prevents a pathological or unsupported HEIC variant from
   * hanging the decoder (and holding a concurrency slot) forever.
   */
  conversionTimeoutMs: 60_000,
  /** Accepted file extensions (lower-case, with dot). */
  acceptedExtensions: ['.heic', '.heif'] as const,
  /**
   * MIME types that browsers/OSes report for HEIC/HEIF. Some environments
   * report an empty type, which we allow and fall back to signature checks.
   */
  acceptedMimeTypes: [
    'image/heic',
    'image/heif',
    'image/heic-sequence',
    'image/heif-sequence',
  ] as const,
} as const;

export type Limits = typeof limits;

/** Human-friendly max file size, e.g. "100 MB". */
export const maxFileSizeLabel = `${Math.round(limits.maxFileSizeBytes / (1024 * 1024))} MB`;
