/**
 * A conversion error carrying a user-facing, plain-language message and a code
 * for programmatic handling. Never leaks filenames or raw stack traces to the UI.
 */
export class ConversionError extends Error {
  code: ConversionErrorCode;

  constructor(code: ConversionErrorCode, message: string) {
    super(message);
    this.name = 'ConversionError';
    this.code = code;
  }
}

export type ConversionErrorCode =
  | 'unsupported-browser'
  | 'decode-failed'
  | 'unsupported-variant'
  | 'encode-failed'
  | 'out-of-memory'
  | 'unknown';

/** The plain-language messages shown to users for each failure mode. */
export const errorMessages: Record<ConversionErrorCode, string> = {
  'unsupported-browser':
    'Your browser can’t run the in-browser converter. Try the latest Chrome, Edge, Firefox, or Safari.',
  'decode-failed':
    'We couldn’t decode this image file. It may be corrupted or incomplete.',
  'unsupported-variant':
    'We couldn’t decode this image file. It may use a format that your browser does not support.',
  'encode-failed': 'The image decoded but we couldn’t create the PNG. Please try again.',
  'out-of-memory':
    'The browser ran low on memory converting this image. Try fewer or smaller files at once.',
  unknown: 'Something went wrong converting this file. Please try again.',
};

/**
 * Map an unknown thrown value to a ConversionError with a friendly message.
 * heic2any/libheif surface a variety of messages; we classify the common ones.
 */
export function toConversionError(err: unknown): ConversionError {
  if (err instanceof ConversionError) return err;

  const raw = err instanceof Error ? err.message : String(err ?? '');
  const msg = raw.toLowerCase();

  if (msg.includes('memory') || msg.includes('allocat')) {
    return new ConversionError('out-of-memory', errorMessages['out-of-memory']);
  }
  if (
    msg.includes('libheif') ||
    msg.includes('format not supported') ||
    msg.includes('unsupported')
  ) {
    return new ConversionError(
      'unsupported-variant',
      errorMessages['unsupported-variant'],
    );
  }
  if (msg.includes('encode') || msg.includes('toblob') || msg.includes('canvas')) {
    return new ConversionError('encode-failed', errorMessages['encode-failed']);
  }
  return new ConversionError('decode-failed', errorMessages['decode-failed']);
}
