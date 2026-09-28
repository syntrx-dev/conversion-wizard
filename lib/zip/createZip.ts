import { ConversionError } from '@/lib/conversion/errors';
import { ensureUniqueName } from '@/lib/files/naming';

export interface ZipEntry {
  filename: string;
  blob: Blob;
}

/**
 * Build a ZIP archive from converted PNGs. JSZip is dynamically imported so it
 * is only pulled into the bundle when a user actually downloads a ZIP.
 *
 * Filenames are de-duplicated a second time here so two different queue items
 * that happen to resolve to the same name can never collide inside the archive.
 */
export async function createZipBlob(entries: ZipEntry[]): Promise<Blob> {
  if (entries.length === 0) {
    throw new ConversionError('unknown', 'There are no converted images to download.');
  }

  try {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const used = new Set<string>();

    for (const entry of entries) {
      const name = ensureUniqueName(entry.filename, used);
      zip.file(name, entry.blob);
    }

    return await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      // PNGs are already compressed; a light level keeps zipping fast.
      compressionOptions: { level: 3 },
    });
  } catch (err) {
    if (err instanceof ConversionError) throw err;
    throw new ConversionError(
      'unknown',
      'We couldn’t create the ZIP file. Please try again.',
    );
  }
}

/** Default name for the downloaded archive. */
export function defaultZipName(): string {
  return 'heic-to-png-images.zip';
}
