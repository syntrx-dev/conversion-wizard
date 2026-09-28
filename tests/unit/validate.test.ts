import { describe, it, expect } from 'vitest';
import {
  validateFile,
  hasExtension,
  getExtension,
  fileKey,
  wouldExceedBatchLimit,
} from '@/lib/files/validate';
import { limits } from '@/lib/config/limits';
import { formats } from '@/lib/config/formats';

describe('getExtension', () => {
  it('returns the lower-cased extension with the dot', () => {
    expect(getExtension('IMG_1234.HEIC')).toBe('.heic');
    expect(getExtension('photo.HEIF')).toBe('.heif');
  });
  it('returns empty string when there is no extension', () => {
    expect(getExtension('noextension')).toBe('');
  });
});

describe('hasExtension', () => {
  it('accepts the given extensions in any case', () => {
    const exts = ['.heic', '.heif'];
    expect(hasExtension('a.heic', exts)).toBe(true);
    expect(hasExtension('a.HEIC', exts)).toBe(true);
    expect(hasExtension('a.heif', exts)).toBe(true);
  });
  it('rejects extensions not in the list', () => {
    const exts = ['.heic', '.heif'];
    expect(hasExtension('a.jpg', exts)).toBe(false);
    expect(hasExtension('a.png', exts)).toBe(false);
    expect(hasExtension('a.pdf', exts)).toBe(false);
  });
});

describe('validateFile', () => {
  it('accepts a valid HEIC file for the HEIC format', () => {
    expect(
      validateFile({ name: 'IMG.heic', size: 2048, type: 'image/heic' }, formats.heic),
    ).toEqual({
      ok: true,
    });
  });

  it('accepts a HEIC file with an empty MIME type (common on some OSes)', () => {
    const result = validateFile({ name: 'IMG.heic', size: 2048, type: '' }, formats.heic);
    expect(result.ok).toBe(true);
  });

  it('rejects an extension that does not match the expected format', () => {
    const result = validateFile(
      { name: 'IMG.jpg', size: 2048, type: 'image/jpeg' },
      formats.heic,
    );
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unsupported-type');
  });

  it('rejects a clearly non-image MIME type even with a matching extension', () => {
    const result = validateFile(
      {
        name: 'IMG.heic',
        size: 2048,
        type: 'application/pdf',
      },
      formats.heic,
    );
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unsupported-type');
  });

  it('rejects an empty file', () => {
    const result = validateFile(
      { name: 'IMG.heic', size: 0, type: 'image/heic' },
      formats.heic,
    );
    expect(result.ok).toBe(false);
    expect(result.code).toBe('empty');
  });

  it('rejects a file over the size limit', () => {
    const result = validateFile(
      {
        name: 'IMG.heic',
        size: limits.maxFileSizeBytes + 1,
        type: 'image/heic',
      },
      formats.heic,
    );
    expect(result.ok).toBe(false);
    expect(result.code).toBe('too-large');
  });

  it('validates against a different source format (e.g. JPG)', () => {
    expect(
      validateFile({ name: 'photo.jpg', size: 2048, type: 'image/jpeg' }, formats.jpg).ok,
    ).toBe(true);
    // A PNG file is not a valid input for the JPG converter.
    const result = validateFile(
      { name: 'photo.png', size: 2048, type: 'image/png' },
      formats.jpg,
    );
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unsupported-type');
  });
});

describe('fileKey', () => {
  it('is stable and case-insensitive on name', () => {
    expect(fileKey({ name: 'IMG.heic', size: 100, type: '' })).toBe(
      fileKey({ name: 'img.heic', size: 100, type: '' }),
    );
  });
  it('differs when size differs', () => {
    expect(fileKey({ name: 'IMG.heic', size: 100, type: '' })).not.toBe(
      fileKey({ name: 'IMG.heic', size: 200, type: '' }),
    );
  });
});

describe('wouldExceedBatchLimit', () => {
  it('is true when the total would exceed the cap', () => {
    expect(wouldExceedBatchLimit(limits.maxFiles, 1)).toBe(true);
    expect(wouldExceedBatchLimit(limits.maxFiles - 1, 1)).toBe(false);
  });
});
