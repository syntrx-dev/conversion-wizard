import { describe, it, expect } from 'vitest';
import { formatBytes, formatDimensions, sizeDeltaLabel } from '@/lib/utils/format';

describe('formatBytes', () => {
  it('formats bytes, KB, MB', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(1024 * 1024)).toBe('1 MB');
  });
  it('handles invalid input', () => {
    expect(formatBytes(-1)).toBe('—');
    expect(formatBytes(NaN)).toBe('—');
  });
});

describe('formatDimensions', () => {
  it('formats width x height', () => {
    expect(formatDimensions(4032, 3024)).toBe('4032 × 3024');
  });
});

describe('sizeDeltaLabel', () => {
  it('reports larger output', () => {
    expect(sizeDeltaLabel(100, 250)).toBe('+150% larger');
  });
  it('reports smaller output', () => {
    expect(sizeDeltaLabel(100, 50)).toBe('-50% smaller');
  });
  it('reports same size', () => {
    expect(sizeDeltaLabel(100, 100)).toBe('same size');
  });
});
