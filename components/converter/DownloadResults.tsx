'use client';

import { useState } from 'react';
import { Sparkles, Archive, Trash2, Plus, Loader2 } from 'lucide-react';
import type { QueueItem } from '@/lib/conversion/types';
import { countByStatus } from '@/lib/conversion/queue';

interface DownloadResultsProps {
  items: QueueItem[];
  isConverting: boolean;
  onConvertAll: () => void;
  onDownloadZip: () => Promise<void> | void;
  onClearAll: () => void;
  onAddMore: () => void;
}

export function DownloadResults({
  items,
  isConverting,
  onConvertAll,
  onDownloadZip,
  onClearAll,
  onAddMore,
}: DownloadResultsProps) {
  const [zipping, setZipping] = useState(false);
  const counts = countByStatus(items);
  const pending = counts.waiting;
  const completed = counts.complete;

  const handleZip = async () => {
    setZipping(true);
    try {
      await onDownloadZip();
    } finally {
      setZipping(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
        <span className="font-semibold text-ink">
          {items.length} file{items.length === 1 ? '' : 's'}
        </span>
        {completed > 0 && (
          <span className="text-emerald-700 dark:text-emerald-400">
            {completed} converted
          </span>
        )}
        {pending > 0 && <span>{pending} waiting</span>}
        {counts.failed > 0 && (
          <span className="text-red-600 dark:text-red-400">{counts.failed} failed</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onAddMore}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add more
        </button>

        <button
          type="button"
          onClick={onClearAll}
          disabled={isConverting}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear all
        </button>

        {completed > 1 && (
          <button
            type="button"
            onClick={handleZip}
            disabled={zipping}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-60 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
          >
            {zipping ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Archive className="h-4 w-4" aria-hidden="true" />
            )}
            Download all as ZIP
          </button>
        )}

        {pending > 0 && (
          <button
            type="button"
            onClick={onConvertAll}
            disabled={isConverting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isConverting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            )}
            {isConverting
              ? 'Converting…'
              : `Convert ${pending} image${pending === 1 ? '' : 's'}`}
          </button>
        )}
      </div>
    </div>
  );
}
