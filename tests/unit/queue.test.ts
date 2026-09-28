import { describe, it, expect } from 'vitest';
import {
  createQueueItem,
  setStatus,
  setProgress,
  setResult,
  setError,
  resetForRetry,
  removeItem,
  existingKeys,
  countByStatus,
  completedItems,
} from '@/lib/conversion/queue';
import type { ConvertedResult } from '@/lib/conversion/types';
import { makeFile } from './helpers';

function fakeResult(): ConvertedResult {
  return {
    blob: new Blob(['x'], { type: 'image/png' }),
    url: 'blob:mock/1',
    filename: 'IMG.png',
    width: 100,
    height: 80,
    size: 1234,
  };
}

describe('createQueueItem', () => {
  it('creates a waiting item with a de-dup key', () => {
    const item = createQueueItem({ file: makeFile('IMG.heic', { size: 999 }) });
    expect(item.status).toBe('waiting');
    expect(item.progress).toBe(0);
    expect(item.name).toBe('IMG.heic');
    expect(item.size).toBe(999);
    expect(item.key).toContain('img.heic');
  });

  it('can create a pre-failed (invalid) item', () => {
    const item = createQueueItem({
      file: makeFile('a.jpg'),
      status: 'failed',
      error: 'nope',
      validationCode: 'unsupported-type',
    });
    expect(item.status).toBe('failed');
    expect(item.error).toBe('nope');
    expect(item.validationCode).toBe('unsupported-type');
  });
});

describe('status transitions', () => {
  const base = () => [createQueueItem({ file: makeFile('IMG.heic') })];

  it('sets converting status', () => {
    const items = base();
    const next = setStatus(items, items[0].id, 'converting');
    expect(next[0].status).toBe('converting');
    // original is untouched (immutability)
    expect(items[0].status).toBe('waiting');
  });

  it('clamps progress between 0 and 100', () => {
    const items = base();
    expect(setProgress(items, items[0].id, 150)[0].progress).toBe(100);
    expect(setProgress(items, items[0].id, -5)[0].progress).toBe(0);
  });

  it('sets a complete result', () => {
    const items = base();
    const next = setResult(items, items[0].id, fakeResult());
    expect(next[0].status).toBe('complete');
    expect(next[0].progress).toBe(100);
    expect(next[0].result?.filename).toBe('IMG.png');
  });

  it('sets an error and marks failed', () => {
    const items = base();
    const next = setError(items, items[0].id, 'boom');
    expect(next[0].status).toBe('failed');
    expect(next[0].error).toBe('boom');
  });

  it('resets a failed item back to waiting', () => {
    let items = base();
    items = setError(items, items[0].id, 'boom');
    const next = resetForRetry(items, items[0].id);
    expect(next[0].status).toBe('waiting');
    expect(next[0].error).toBeUndefined();
  });
});

describe('removeItem', () => {
  it('removes by id', () => {
    const items = [
      createQueueItem({ file: makeFile('a.heic') }),
      createQueueItem({ file: makeFile('b.heic') }),
    ];
    const next = removeItem(items, items[0].id);
    expect(next).toHaveLength(1);
    expect(next[0].name).toBe('b.heic');
  });
});

describe('existingKeys / counts', () => {
  it('collects unique keys', () => {
    const items = [
      createQueueItem({ file: makeFile('a.heic', { size: 1 }) }),
      createQueueItem({ file: makeFile('b.heic', { size: 2 }) }),
    ];
    expect(existingKeys(items).size).toBe(2);
  });

  it('counts by status and lists completed items', () => {
    let items = [
      createQueueItem({ file: makeFile('a.heic') }),
      createQueueItem({ file: makeFile('b.heic') }),
    ];
    items = setResult(items, items[0].id, fakeResult());
    const counts = countByStatus(items);
    expect(counts.complete).toBe(1);
    expect(counts.waiting).toBe(1);
    expect(completedItems(items)).toHaveLength(1);
  });
});
