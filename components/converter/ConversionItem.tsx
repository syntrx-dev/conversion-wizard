'use client';

import {
  Download,
  RotateCcw,
  Trash2,
  FileImage,
  ArrowRight,
  Minimize2,
} from 'lucide-react';
import type { QueueItem } from '@/lib/conversion/types';
import { StatusBadge } from './StatusBadge';
import { formatBytes, formatDimensions, sizeDeltaLabel } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface ConversionItemProps {
  item: QueueItem;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onDownload: (item: QueueItem) => void;
  /** Whether to offer the "reduce file size" prompt (true when output is lossless). */
  canReduce?: boolean;
  /** Opens settings and highlights the "Smaller" option. */
  onReduceSize?: () => void;
}

function Thumbnail({ item }: { item: QueueItem }) {
  // The browser can't natively render HEIC, so before conversion we show a
  // labelled placeholder; after conversion we show the real PNG.
  if (item.status === 'complete' && item.result) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.result.url}
        alt={`Converted PNG preview of ${item.name}`}
        className="h-14 w-14 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div
      className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-slate-100 text-slate-400 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700"
      aria-hidden="true"
    >
      <FileImage className="h-5 w-5" />
      <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide">
        HEIC
      </span>
    </div>
  );
}

export function ConversionItem({
  item,
  onRemove,
  onRetry,
  onDownload,
  canReduce = false,
  onReduceSize,
}: ConversionItemProps) {
  const isConverting = item.status === 'converting';
  const isFailed = item.status === 'failed';
  const isComplete = item.status === 'complete';

  return (
    <li className="animate-fade-in rounded-xl border border-slate-200 bg-white p-3 shadow-card transition-shadow hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 sm:p-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <Thumbnail item={item} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="truncate text-sm font-semibold text-ink" title={item.name}>
              {item.name}
            </p>
            <StatusBadge status={item.status} />
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-muted">
            <span>{formatBytes(item.size)}</span>
            {isComplete && item.result && (
              <>
                <ArrowRight
                  className="h-3 w-3 text-slate-300 dark:text-slate-600"
                  aria-hidden="true"
                />
                <span className="font-medium text-ink-soft">{item.result.filename}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDimensions(item.result.width, item.result.height)}</span>
                <span aria-hidden="true">·</span>
                <span>{formatBytes(item.result.size)}</span>
                <span className="text-ink-muted">
                  ({sizeDeltaLabel(item.size, item.result.size)})
                </span>
              </>
            )}
          </div>

          {isComplete && canReduce && onReduceSize && (
            <button
              type="button"
              onClick={onReduceSize}
              className="mt-1.5 inline-flex items-center gap-1 rounded text-xs font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
            >
              <Minimize2 className="h-3 w-3" aria-hidden="true" />
              Want to reduce file size?
            </button>
          )}

          {isConverting && (
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              role="progressbar"
              aria-label={`Converting ${item.name}`}
            >
              <div className="progress-indeterminate h-full w-full rounded-full bg-gradient-to-r from-brand-300 via-brand-600 to-brand-300" />
            </div>
          )}

          {isFailed && item.error && (
            <p className="mt-2 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs leading-relaxed text-red-700 dark:bg-red-500/10 dark:text-red-400">
              {item.error}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {isComplete && (
            <button
              type="button"
              onClick={() => onDownload(item)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Download</span>
              <span className="sr-only">Download {item.result?.filename}</span>
            </button>
          )}
          {isFailed && item.validationCode == null && (
            <button
              type="button"
              onClick={() => onRetry(item.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Retry</span>
              <span className="sr-only">Retry {item.name}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            disabled={isConverting}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400',
              isConverting &&
                'cursor-not-allowed opacity-40 hover:bg-transparent hover:text-ink-muted',
            )}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
}
