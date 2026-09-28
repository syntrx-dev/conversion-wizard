import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { makeFile } from './helpers';

// Mock the real (canvas/wasm) converter so the hook is testable in jsdom.
vi.mock('@/lib/conversion/convert', () => ({
  isConversionSupported: () => true,
  convertImage: vi.fn(async () => ({
    blob: new Blob(['png'], { type: 'image/png' }),
    width: 120,
    height: 90,
  })),
}));

import { useConverter } from '@/lib/hooks/useConverter';
import { getConversion } from '@/lib/config/conversions';

// The hook now takes a Conversion (from/to format pair). Use HEIC -> PNG so the
// existing HEIC fixtures and .png output expectations still apply.
const heicToPng = getConversion('heic-png')!;

describe('useConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('adds valid files and auto-converts them, creating an object URL', async () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL');
    const { result } = renderHook(() => useConverter(heicToPng));

    act(() => {
      result.current.addFiles([makeFile('IMG_1234.heic', { size: 2048 })]);
    });

    await waitFor(() => {
      expect(result.current.items[0]?.status).toBe('complete');
    });

    expect(result.current.items[0].result?.filename).toBe('IMG_1234.png');
    expect(createSpy).toHaveBeenCalled();
  });

  it('rejects duplicate files', async () => {
    const { result } = renderHook(() => useConverter(heicToPng));
    const file = makeFile('dupe.heic', { size: 1000 });

    act(() => {
      result.current.addFiles([file]);
    });
    await waitFor(() => expect(result.current.items).toHaveLength(1));

    let summary: { added: number; rejected: number } | undefined;
    act(() => {
      summary = result.current.addFiles([makeFile('dupe.heic', { size: 1000 })]);
    });
    expect(summary?.added).toBe(0);
    expect(summary?.rejected).toBe(1);
    expect(result.current.items).toHaveLength(1);
  });

  it('surfaces invalid files as failed rows', async () => {
    const { result } = renderHook(() => useConverter(heicToPng));
    act(() => {
      result.current.addFiles([makeFile('doc.pdf', { type: 'application/pdf' })]);
    });
    await waitFor(() => expect(result.current.items[0]?.status).toBe('failed'));
    expect(result.current.items[0].validationCode).toBe('unsupported-type');
  });

  it('revokes the result object URL when an item is removed', async () => {
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');
    const { result } = renderHook(() => useConverter(heicToPng));

    act(() => {
      result.current.addFiles([makeFile('IMG.heic', { size: 2048 })]);
    });
    await waitFor(() => expect(result.current.items[0]?.status).toBe('complete'));

    const url = result.current.items[0].result!.url;
    act(() => {
      result.current.removeItem(result.current.items[0].id);
    });

    expect(result.current.items).toHaveLength(0);
    expect(revokeSpy).toHaveBeenCalledWith(url);
  });

  it('clears all items and revokes their URLs', async () => {
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');
    const { result } = renderHook(() => useConverter(heicToPng));

    act(() => {
      result.current.addFiles([
        makeFile('a.heic', { size: 2048 }),
        makeFile('b.heic', { size: 4096 }),
      ]);
    });
    await waitFor(() => {
      expect(result.current.items.filter((i) => i.status === 'complete')).toHaveLength(2);
    });

    act(() => {
      result.current.clearAll();
    });
    expect(result.current.items).toHaveLength(0);
    expect(revokeSpy).toHaveBeenCalled();
  });
});
