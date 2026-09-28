'use client';

import { useCallback, useRef, useState } from 'react';
import { Download, Loader2, AlertTriangle, X, Package } from 'lucide-react';
import { FileDropzone } from '@/components/converter/FileDropzone';
import { PrivacyNotice } from '@/components/converter/PrivacyNotice';
import { compressToTargetBytes, type CompressMime } from '@/lib/tools/compress';
import { allInputExtensions, allInputMimes } from '@/lib/config/formats';
import { toConversionError } from '@/lib/conversion/errors';
import { runWithConcurrency } from '@/lib/utils/concurrency';
import { createZipBlob, defaultZipName } from '@/lib/zip/createZip';
import { downloadBlob, downloadUrl } from '@/lib/utils/download';
import { limits } from '@/lib/config/limits';
import { cn } from '@/lib/utils/cn';

const accept = [...allInputExtensions, ...allInputMimes].join(',');
const acceptText = 'JPG, PNG, WEBP, HEIC, AVIF, GIF, BMP';

/** Preset target sizes (KB) offered on the flexible /compress-image page. */
const PRESET_KB = [50, 100, 200, 500, 1000];

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(n < 10240 ? 1 : 0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

interface Item {
  id: string;
  file: File;
  baseName: string;
  origBytes: number;
  status: 'waiting' | 'working' | 'done' | 'error';
  error?: string;
  result?: {
    url: string;
    blob: Blob;
    filename: string;
    bytes: number;
    width: number;
    height: number;
    scaled: boolean;
    reachedTarget: boolean;
  };
}

function baseNameOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(0, dot) : name;
}

export function CompressTool({ fixedTargetKB }: { fixedTargetKB?: number }) {
  const [items, setItems] = useState<Item[]>([]);
  const [targetKB, setTargetKB] = useState<number>(fixedTargetKB ?? 200);
  const [mime, setMime] = useState<CompressMime>('image/jpeg');
  const [busy, setBusy] = useState(false);

  const itemsRef = useRef<Item[]>([]);
  itemsRef.current = items;
  const targetRef = useRef(targetKB);
  targetRef.current = fixedTargetKB ?? targetKB;
  const mimeRef = useRef(mime);
  mimeRef.current = mime;

  const patch = useCallback((id: string, next: Partial<Item>) => {
    setItems((cur) => cur.map((it) => (it.id === id ? { ...it, ...next } : it)));
  }, []);

  const run = useCallback(
    async (pending: Item[]) => {
      setBusy(true);
      try {
        await runWithConcurrency(
          pending,
          async (item) => {
            patch(item.id, { status: 'working' });
            try {
              const ext = mimeRef.current === 'image/webp' ? 'webp' : 'jpg';
              const targetBytes = Math.round(targetRef.current * 1024);
              const res = await compressToTargetBytes(item.file, {
                targetBytes,
                mime: mimeRef.current,
              });
              const url = URL.createObjectURL(res.blob);
              const filename = `${item.baseName}-${targetRef.current}kb.${ext}`;
              patch(item.id, {
                status: 'done',
                result: {
                  url,
                  blob: res.blob,
                  filename,
                  bytes: res.bytes,
                  width: res.width,
                  height: res.height,
                  scaled: res.scaled,
                  reachedTarget: res.reachedTarget,
                },
              });
            } catch (err) {
              patch(item.id, { status: 'error', error: toConversionError(err).message });
            }
          },
          limits.concurrency,
        );
      } finally {
        setBusy(false);
      }
    },
    [patch],
  );

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const incoming = Array.from(files).slice(0, limits.maxFiles);
      const newItems: Item[] = incoming.map((file) => ({
        id: crypto.randomUUID(),
        file,
        baseName: baseNameOf(file.name),
        origBytes: file.size,
        status: 'waiting',
      }));
      setItems((cur) => [...cur, ...newItems]);
      void run(newItems);
    },
    [run],
  );

  // Re-compress everything when the target size or output format changes.
  const recompute = useCallback(() => {
    const reset = itemsRef.current.map((it) => {
      if (it.result) URL.revokeObjectURL(it.result.url);
      return { ...it, status: 'waiting' as const, result: undefined, error: undefined };
    });
    setItems(reset);
    void run(reset);
  }, [run]);

  const removeItem = useCallback((id: string) => {
    setItems((cur) => {
      const t = cur.find((i) => i.id === id);
      if (t?.result) URL.revokeObjectURL(t.result.url);
      return cur.filter((i) => i.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    for (const it of itemsRef.current) if (it.result) URL.revokeObjectURL(it.result.url);
    setItems([]);
  }, []);

  const downloadAll = useCallback(async () => {
    const done = itemsRef.current.filter((i) => i.result);
    if (done.length === 0) return;
    const zip = await createZipBlob(
      done.map((i) => ({ filename: i.result!.filename, blob: i.result!.blob })),
    );
    downloadBlob(zip, defaultZipName());
  }, []);

  const doneCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="space-y-4">
      {/* Target controls (only on the flexible page) */}
      {fixedTargetKB == null && (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm">
          <span className="font-medium text-ink-soft">Target size:</span>
          <div className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-800/60">
            {PRESET_KB.map((kb) => (
              <button
                key={kb}
                type="button"
                aria-pressed={targetKB === kb}
                onClick={() => {
                  setTargetKB(kb);
                }}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-semibold transition-colors',
                  targetKB === kb
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-ink-soft hover:text-ink',
                )}
              >
                {kb >= 1000 ? `${kb / 1000} MB` : `${kb} KB`}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-1.5 text-ink-soft">
            <span>Custom</span>
            <input
              type="number"
              min={5}
              max={20000}
              value={targetKB}
              onChange={(e) => setTargetKB(Math.max(5, Number(e.target.value) || 0))}
              className="w-24 rounded-md border border-slate-300 bg-white px-2 py-1 text-ink dark:border-slate-700 dark:bg-slate-900"
            />
            <span>KB</span>
          </label>
        </div>
      )}

      {/* Output format */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="font-medium text-ink-soft">Output:</span>
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-800/60">
          {(
            [
              ['image/jpeg', 'JPG'],
              ['image/webp', 'WEBP'],
            ] as [CompressMime, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mime === m}
              onClick={() => setMime(m)}
              className={cn(
                'rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors',
                mime === m ? 'bg-brand-600 text-white shadow-sm' : 'text-ink-soft hover:text-ink',
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={recompute}
            disabled={busy}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-ink-soft hover:text-ink disabled:opacity-50 dark:border-slate-700"
          >
            Re-compress
          </button>
        )}
      </div>

      <FileDropzone
        onFiles={addFiles}
        disabled={busy}
        compact={items.length > 0}
        label=""
        accept={accept}
        acceptText={acceptText}
      />

      <div className="flex items-center justify-center">
        <PrivacyNotice />
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            {doneCount} of {items.length} done
            {fixedTargetKB != null ? ` · target ${fixedTargetKB} KB` : ''}
          </p>
          <div className="flex gap-2">
            {doneCount > 1 && (
              <button
                type="button"
                onClick={downloadAll}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                <Package className="h-4 w-4" /> Download all (ZIP)
              </button>
            )}
            <button
              type="button"
              onClick={clearAll}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink dark:border-slate-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {items.map((it) => {
          const pct =
            it.result && it.origBytes > 0
              ? Math.round((1 - it.result.bytes / it.origBytes) * 100)
              : null;
          return (
            <li
              key={it.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{it.file.name}</p>
                {it.status === 'working' && (
                  <p className="mt-0.5 flex items-center gap-1.5 text-ink-muted">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Compressing…
                  </p>
                )}
                {it.status === 'error' && (
                  <p className="mt-0.5 flex items-center gap-1.5 text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-3.5 w-3.5" /> {it.error}
                  </p>
                )}
                {it.result && (
                  <p className="mt-0.5 text-ink-muted">
                    {fmtBytes(it.origBytes)} → <strong className="text-ink">{fmtBytes(it.result.bytes)}</strong>
                    {pct != null && pct > 0 ? ` · ${pct}% smaller` : ''} ·{' '}
                    {it.result.width}×{it.result.height}
                    {it.result.scaled ? ' · resized to fit' : ''}
                    {!it.result.reachedTarget
                      ? ' · smallest achievable without over-degrading'
                      : ''}
                  </p>
                )}
              </div>
              {it.result && (
                <button
                  type="button"
                  onClick={() => downloadUrl(it.result!.url, it.result!.filename)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              )}
              <button
                type="button"
                onClick={() => removeItem(it.id)}
                className="shrink-0 rounded p-1 text-ink-muted hover:text-ink"
                aria-label={`Remove ${it.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
