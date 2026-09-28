import { describe, it, expect } from 'vitest';
import {
  ConversionError,
  toConversionError,
  errorMessages,
} from '@/lib/conversion/errors';

describe('toConversionError', () => {
  it('passes through an existing ConversionError', () => {
    const original = new ConversionError('decode-failed', 'x');
    expect(toConversionError(original)).toBe(original);
  });

  it('classifies out-of-memory errors', () => {
    const err = toConversionError(new Error('Cannot allocate memory'));
    expect(err.code).toBe('out-of-memory');
    expect(err.message).toBe(errorMessages['out-of-memory']);
  });

  it('classifies unsupported libheif variants', () => {
    const err = toConversionError(new Error('libheif: format not supported'));
    expect(err.code).toBe('unsupported-variant');
  });

  it('classifies encode failures', () => {
    const err = toConversionError(new Error('canvas toBlob returned null'));
    expect(err.code).toBe('encode-failed');
  });

  it('defaults unknown messages to decode-failed', () => {
    const err = toConversionError(new Error('something odd'));
    expect(err.code).toBe('decode-failed');
  });

  it('handles non-Error throwables', () => {
    const err = toConversionError('a string');
    expect(err).toBeInstanceOf(ConversionError);
  });

  it('never leaks the raw message for unknown errors', () => {
    const err = toConversionError(new Error('/Users/secret/IMG_1234.heic missing'));
    // Friendly message, not the raw path.
    expect(err.message).not.toContain('secret');
  });
});
