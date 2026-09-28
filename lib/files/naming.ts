import type { NamingFormat } from '@/lib/config/settings';

/** Split a filename into its base name and extension (without the dot). */
export function splitExtension(filename: string): { base: string; ext: string } {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot <= 0) return { base: filename, ext: '' };
  return { base: filename.slice(0, lastDot), ext: filename.slice(lastDot + 1) };
}

/**
 * Strip characters that are illegal or awkward in filenames (path separators,
 * reserved characters) and trim surrounding dots/spaces. Also drops any
 * extension the user typed. Returns '' if nothing usable remains.
 */
export function sanitizeBaseName(name: string): string {
  return name
    .replace(/\.[^.]*$/, '')
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^[.\s]+|[.\s]+$/g, '')
    .trim();
}

/**
 * Derive the output filename from the source filename, honouring the chosen
 * naming strategy. `targetExt` is the output extension without a dot ("png").
 *
 *   IMG_1234.HEIC  ->  IMG_1234.png   (original)
 *   IMG_1234.HEIC  ->  img_1234.png   (lowercase)
 *   IMG_1234.HEIC  ->  IMG 1234.png   (clean — dashes/underscores removed)
 *   IMG_1234.HEIC  ->  <custom>.png   (custom — see customName)
 */
export function toOutputName(
  originalName: string,
  targetExt: string,
  format: NamingFormat = 'original',
  customName = '',
): string {
  const { base } = splitExtension(originalName.trim() || 'image');
  const safeBase = base.length > 0 ? base : 'image';
  const ext = targetExt.replace(/^\./, '');

  switch (format) {
    case 'lowercase':
      return `${safeBase.toLowerCase()}.${ext}`;
    case 'clean': {
      const cleaned = safeBase.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
      return `${cleaned || safeBase}.${ext}`;
    }
    case 'custom': {
      const custom = sanitizeBaseName(customName);
      return `${custom || safeBase}.${ext}`;
    }
    case 'original':
    default:
      return `${safeBase}.${ext}`;
  }
}

/**
 * Ensure `desired` is unique against a set of already-used names (case
 * insensitive). If taken, inserts `-2`, `-3`, ... before the extension.
 */
export function ensureUniqueName(desired: string, used: Set<string>): string {
  const { base, ext } = splitExtension(desired);
  const extSuffix = ext ? `.${ext}` : '';
  const isTaken = (name: string) => used.has(name.toLowerCase());

  let candidate = desired;
  let counter = 2;
  while (isTaken(candidate)) {
    candidate = `${base}-${counter}${extSuffix}`;
    counter += 1;
  }
  used.add(candidate.toLowerCase());
  return candidate;
}
