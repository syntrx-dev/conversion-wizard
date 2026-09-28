import { describe, it, expect } from 'vitest';
import { splitExtension, toOutputName, ensureUniqueName } from '@/lib/files/naming';

describe('splitExtension', () => {
  it('splits base and extension', () => {
    expect(splitExtension('IMG_1234.HEIC')).toEqual({ base: 'IMG_1234', ext: 'HEIC' });
  });
  it('handles names with multiple dots', () => {
    expect(splitExtension('my.photo.heic')).toEqual({ base: 'my.photo', ext: 'heic' });
  });
  it('handles no extension', () => {
    expect(splitExtension('photo')).toEqual({ base: 'photo', ext: '' });
  });
  it('treats a leading dot as part of the base (dotfile)', () => {
    expect(splitExtension('.heic')).toEqual({ base: '.heic', ext: '' });
  });
});

describe('toOutputName — extension handling', () => {
  it('replaces the source extension with the target extension', () => {
    expect(toOutputName('IMG_1234.HEIC', 'png')).toBe('IMG_1234.png');
    expect(toOutputName('photo.heif', 'png')).toBe('photo.png');
  });
  it('supports any target extension', () => {
    expect(toOutputName('IMG_1234.HEIC', 'jpg')).toBe('IMG_1234.jpg');
    expect(toOutputName('IMG_1234.png', 'webp')).toBe('IMG_1234.webp');
  });
  it('strips a leading dot from the target extension', () => {
    expect(toOutputName('IMG_1234.HEIC', '.png')).toBe('IMG_1234.png');
  });
});

describe('toOutputName — naming formats', () => {
  it('keeps the original base by default', () => {
    expect(toOutputName('IMG_1234.HEIC', 'png')).toBe('IMG_1234.png');
    expect(toOutputName('IMG_1234.HEIC', 'png', 'original')).toBe('IMG_1234.png');
  });
  it('lowercases when requested', () => {
    expect(toOutputName('IMG_1234.HEIC', 'png', 'lowercase')).toBe('img_1234.png');
  });
  it('removes dashes and underscores for the clean format', () => {
    expect(toOutputName('IMG_1234.HEIC', 'png', 'clean')).toBe('IMG 1234.png');
    expect(toOutputName('my-vacation_photo.heic', 'png', 'clean')).toBe(
      'my vacation photo.png',
    );
  });
  it('uses the custom name when provided', () => {
    expect(toOutputName('IMG_1234.HEIC', 'png', 'custom', 'Vacation')).toBe(
      'Vacation.png',
    );
  });
  it('sanitizes the custom name and strips a typed extension', () => {
    expect(toOutputName('IMG.heic', 'png', 'custom', 'my/photo.png')).toBe('myphoto.png');
    expect(toOutputName('IMG.heic', 'png', 'custom', '  spaced out  ')).toBe(
      'spaced out.png',
    );
  });
  it('falls back to the original base when the custom name is empty', () => {
    expect(toOutputName('IMG_1234.heic', 'png', 'custom', '')).toBe('IMG_1234.png');
    expect(toOutputName('IMG_1234.heic', 'png', 'custom', '   ')).toBe('IMG_1234.png');
  });
  it('falls back to a default base for an empty name', () => {
    expect(toOutputName('.heic', 'png')).toBe('.heic.png');
    expect(toOutputName('', 'png')).toBe('image.png');
  });
});

describe('ensureUniqueName', () => {
  it('returns the name unchanged when unused', () => {
    const used = new Set<string>();
    expect(ensureUniqueName('IMG_1234.png', used)).toBe('IMG_1234.png');
  });

  it('adds -2, -3 suffixes for duplicates', () => {
    const used = new Set<string>();
    expect(ensureUniqueName('IMG_1234.png', used)).toBe('IMG_1234.png');
    expect(ensureUniqueName('IMG_1234.png', used)).toBe('IMG_1234-2.png');
    expect(ensureUniqueName('IMG_1234.png', used)).toBe('IMG_1234-3.png');
  });

  it('is case-insensitive when detecting collisions', () => {
    const used = new Set<string>();
    ensureUniqueName('Photo.png', used);
    expect(ensureUniqueName('photo.png', used)).toBe('photo-2.png');
  });

  it('records each returned name so future calls stay unique', () => {
    const used = new Set<string>();
    ensureUniqueName('a.png', used);
    ensureUniqueName('a-2.png', used); // pre-claim the -2 slot
    expect(ensureUniqueName('a.png', used)).toBe('a-3.png');
  });
});
