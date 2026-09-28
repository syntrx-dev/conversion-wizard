import { describe, it, expect } from 'vitest';
import { createZipBlob, defaultZipName } from '@/lib/zip/createZip';
import { ConversionError } from '@/lib/conversion/errors';

function pngBlob(content = 'png-bytes') {
  return new Blob([content], { type: 'image/png' });
}

describe('createZipBlob', () => {
  it('throws a ConversionError when there are no entries', async () => {
    await expect(createZipBlob([])).rejects.toBeInstanceOf(ConversionError);
  });

  it('produces a non-empty Blob for valid entries', async () => {
    const blob = await createZipBlob([
      { filename: 'IMG_1234.png', blob: pngBlob() },
      { filename: 'IMG_5678.png', blob: pngBlob('more') },
    ]);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(0);
  });

  it('de-duplicates colliding filenames inside the archive', async () => {
    const JSZip = (await import('jszip')).default;
    const blob = await createZipBlob([
      { filename: 'IMG.png', blob: pngBlob('a') },
      { filename: 'IMG.png', blob: pngBlob('b') },
      { filename: 'IMG.png', blob: pngBlob('c') },
    ]);
    const zip = await JSZip.loadAsync(blob);
    const names = Object.keys(zip.files).sort();
    expect(names).toEqual(['IMG-2.png', 'IMG-3.png', 'IMG.png']);
  });
});

describe('defaultZipName', () => {
  it('returns a sensible archive name', () => {
    expect(defaultZipName()).toMatch(/\.zip$/);
  });
});
