import type { QueueItem, ConversionStatus, ConvertedResult } from './types';
import type { ValidationCode } from '@/lib/files/validate';
import { createId } from '@/lib/utils/id';
import { fileKey } from '@/lib/files/validate';

/**
 * Pure, framework-agnostic queue transforms. Keeping status transitions here
 * (rather than tangled inside React state setters) makes them unit-testable and
 * keeps the component logic thin.
 */

export interface CreateItemOptions {
  file: File;
  previewUrl?: string | null;
  status?: ConversionStatus;
  error?: string;
  validationCode?: ValidationCode;
}

export function createQueueItem({
  file,
  previewUrl = null,
  status = 'waiting',
  error,
  validationCode,
}: CreateItemOptions): QueueItem {
  return {
    id: createId(),
    file,
    key: fileKey(file),
    name: file.name,
    size: file.size,
    previewUrl,
    status,
    progress: status === 'complete' ? 100 : 0,
    error,
    validationCode,
  };
}

/** Immutably patch a single item by id. */
export function patchItem(
  items: QueueItem[],
  id: string,
  patch: Partial<QueueItem>,
): QueueItem[] {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

export function setStatus(
  items: QueueItem[],
  id: string,
  status: ConversionStatus,
): QueueItem[] {
  return patchItem(items, id, { status });
}

export function setProgress(
  items: QueueItem[],
  id: string,
  progress: number,
): QueueItem[] {
  return patchItem(items, id, { progress: Math.max(0, Math.min(100, progress)) });
}

export function setResult(
  items: QueueItem[],
  id: string,
  result: ConvertedResult,
): QueueItem[] {
  return patchItem(items, id, {
    status: 'complete',
    progress: 100,
    result,
    error: undefined,
  });
}

export function setError(items: QueueItem[], id: string, error: string): QueueItem[] {
  return patchItem(items, id, { status: 'failed', progress: 0, error });
}

/** Reset a failed item back to waiting so it can be retried. */
export function resetForRetry(items: QueueItem[], id: string): QueueItem[] {
  return patchItem(items, id, {
    status: 'waiting',
    progress: 0,
    error: undefined,
    result: undefined,
  });
}

export function removeItem(items: QueueItem[], id: string): QueueItem[] {
  return items.filter((item) => item.id !== id);
}

/** Existing de-dup keys, used to reject accidental duplicate adds. */
export function existingKeys(items: QueueItem[]): Set<string> {
  return new Set(items.map((item) => item.key));
}

export function countByStatus(items: QueueItem[]): Record<ConversionStatus, number> {
  const counts: Record<ConversionStatus, number> = {
    waiting: 0,
    converting: 0,
    complete: 0,
    failed: 0,
  };
  for (const item of items) counts[item.status] += 1;
  return counts;
}

export const isPending = (item: QueueItem): boolean => item.status === 'waiting';
export const isComplete = (item: QueueItem): boolean => item.status === 'complete';
export const completedItems = (items: QueueItem[]): QueueItem[] =>
  items.filter(isComplete);
