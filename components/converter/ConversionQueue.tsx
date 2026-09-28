'use client';

import type { QueueItem } from '@/lib/conversion/types';
import { ConversionItem } from './ConversionItem';

interface ConversionQueueProps {
  items: QueueItem[];
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onDownload: (item: QueueItem) => void;
  canReduce?: boolean;
  onReduceSize?: () => void;
}

export function ConversionQueue({
  items,
  onRemove,
  onRetry,
  onDownload,
  canReduce = false,
  onReduceSize,
}: ConversionQueueProps) {
  if (items.length === 0) return null;

  return (
    <section aria-label="Conversion queue">
      <h3 className="sr-only">Your files</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <ConversionItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onRetry={onRetry}
            onDownload={onDownload}
            canReduce={canReduce}
            onReduceSize={onReduceSize}
          />
        ))}
      </ul>
    </section>
  );
}
