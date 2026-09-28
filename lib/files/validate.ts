import { limits, maxFileSizeLabel } from '@/lib/config/limits';
import type { FormatMeta } from '@/lib/config/formats';

export type ValidationCode =
  'unsupported-type' | 'too-large' | 'empty' | 'duplicate' | 'too-many';

export interface ValidationResult {
  ok: boolean;
  code?: ValidationCode;
  message?: string;
}

/** A minimal shape so validators are testable without a real File object. */
export interface FileLike {
  name: string;
  size: number;
  type: string;
}

const OK: ValidationResult = { ok: true };

/** Lower-cased extension including the leading dot, e.g. ".jpg". */
export function getExtension(filename: string): string {
  const dot = filename.lastIndexOf('.');
  if (dot < 0) return '';
  return filename.slice(dot).toLowerCase();
}

/** True when the filename ends in one of `exts` (e.g. ['.jpg', '.jpeg']). */
export function hasExtension(filename: string, exts: readonly string[]): boolean {
  return exts.includes(getExtension(filename));
}

/**
 * A stable de-duplication key. Two selections of the same file (same name and
 * byte length) are treated as duplicates so accidental double-adds are ignored.
 */
export function fileKey(file: FileLike): string {
  return `${file.name.toLowerCase()}::${file.size}`;
}

/**
 * Validate a single file against the expected source format. Pure and
 * synchronous so it's easy to unit test.
 */
export function validateFile(file: FileLike, from: FormatMeta): ValidationResult {
  if (!hasExtension(file.name, from.exts)) {
    const accepted = from.exts.join(', ');
    return {
      ok: false,
      code: 'unsupported-type',
      message: `Only ${accepted} files are supported here.`,
    };
  }

  // Some browsers/OSes report an empty MIME type; only reject a type that is
  // present AND clearly wrong for this format (and isn't any image type).
  if (file.type && !from.mimes.includes(file.type) && !file.type.startsWith('image/')) {
    return {
      ok: false,
      code: 'unsupported-type',
      message: `This file does not appear to be a ${from.label} image.`,
    };
  }

  if (file.size === 0) {
    return { ok: false, code: 'empty', message: 'This file is empty.' };
  }

  if (file.size > limits.maxFileSizeBytes) {
    return {
      ok: false,
      code: 'too-large',
      message: `File is larger than the ${maxFileSizeLabel} limit.`,
    };
  }

  return OK;
}

/** True when adding `incoming` files would exceed the per-batch cap. */
export function wouldExceedBatchLimit(currentCount: number, incoming: number): boolean {
  return currentCount + incoming > limits.maxFiles;
}

/** The `accept` attribute value for a file input, for a given source format. */
export function acceptAttr(from: FormatMeta): string {
  return [...from.exts, ...from.mimes].join(',');
}
