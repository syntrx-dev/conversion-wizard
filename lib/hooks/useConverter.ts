'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { QueueItem } from '@/lib/conversion/types';
import type { ConversionSettings } from '@/lib/config/settings';
import { defaultSettings } from '@/lib/config/settings';
import {
  createQueueItem,
  existingKeys,
  removeItem as removeItemPure,
  resetForRetry,
  setError,
  setResult,
  setStatus,
  completedItems,
} from '@/lib/conversion/queue';
import { convertImage, isConversionSupported } from '@/lib/conversion/convert';
import { toConversionError } from '@/lib/conversion/errors';
import { validateFile, wouldExceedBatchLimit, fileKey } from '@/lib/files/validate';
import { toOutputName, ensureUniqueName } from '@/lib/files/naming';
import { runWithConcurrency } from '@/lib/utils/concurrency';
import { createZipBlob, defaultZipName } from '@/lib/zip/createZip';
import { downloadBlob, downloadUrl } from '@/lib/utils/download';
import { recordConversions } from '@/lib/utils/counter';
import { limits } from '@/lib/config/limits';
import type { Conversion } from '@/lib/config/conversions';
import type { FormatMeta } from '@/lib/config/formats';

export interface AddSummary {
  added: number;
  rejected: number;
  message: string | null;
}

/**
 * Settings that change the output bytes/pixels. Changing any of these after
 * items have already converted re-runs them so the results reflect the new
 * choice (e.g. flipping to "Smaller" shrinks completed files live).
 */
const OUTPUT_KEYS: (keyof ConversionSettings)[] = [
  'compression',
  'colors',
  'quality',
  'preserveDimensions',
  'maxDimension',
  'preserveTransparency',
];

/** Revoke an object URL, ignoring errors. */
function safeRevoke(url: string | null | undefined) {
  if (url) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      /* no-op */
    }
  }
}

/**
 * `resolveFrom` lets a single converter accept many input formats: given a
 * file, it returns the detected source FormatMeta (or undefined if unsupported).
 * When omitted, the fixed `conversion.from` is used for every file.
 */
export function useConverter(
  conversion: Conversion,
  resolveFrom?: (file: File) => FormatMeta | undefined,
) {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>(defaultSettings);
  const [isConverting, setIsConverting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  // Mirror the active conversion so callbacks always use the latest from/to.
  const conversionRef = useRef(conversion);
  conversionRef.current = conversion;
  const resolveFromRef = useRef(resolveFrom);
  resolveFromRef.current = resolveFrom;

  // Mirror items in a ref so the unmount cleanup sees the latest list.
  const itemsRef = useRef<QueueItem[]>([]);
  itemsRef.current = items;

  // Mirror settings so updateSettings can compare without stale closures.
  const settingsRef = useRef<ConversionSettings>(settings);
  settingsRef.current = settings;

  // Guards against overlapping conversion runs (auto-convert + manual click).
  const isRunningRef = useRef(false);
  // When true, newly added files start converting automatically.
  const autoConvertRef = useRef(true);

  useEffect(() => {
    setSupported(isConversionSupported());
  }, []);

  // Revoke every object URL when the component using the hook unmounts.
  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        safeRevoke(item.previewUrl);
        safeRevoke(item.result?.url);
      }
    };
  }, []);

  const addFiles = useCallback((fileList: FileList | File[]): AddSummary => {
    const incoming = Array.from(fileList);
    if (incoming.length === 0) {
      return { added: 0, rejected: 0, message: null };
    }

    // Compute against the latest committed list synchronously so the returned
    // summary is accurate and never depends on React flushing the state update.
    const current = itemsRef.current;
    const keys = existingKeys(current);
    const toAdd: QueueItem[] = [];
    const reasons: string[] = [];
    let added = 0;
    let duplicates = 0;
    let invalid = 0;

    for (const file of incoming) {
      if (wouldExceedBatchLimit(current.length + toAdd.length, 1)) {
        reasons.push(`Only ${limits.maxFiles} files can be queued at once.`);
        break;
      }

      const key = fileKey(file);
      if (keys.has(key)) {
        duplicates += 1;
        continue;
      }

      const from = resolveFromRef.current
        ? resolveFromRef.current(file)
        : conversionRef.current.from;
      const validation: ReturnType<typeof validateFile> = from
        ? validateFile(file, from)
        : {
            ok: false,
            code: 'unsupported-type',
            message: 'This file type isn’t supported.',
          };
      if (!validation.ok) {
        // Surface invalid files as failed rows so the user sees why.
        invalid += 1;
        keys.add(key);
        toAdd.push(
          createQueueItem({
            file,
            status: 'failed',
            error: validation.message,
            validationCode: validation.code,
          }),
        );
        continue;
      }

      keys.add(key);
      toAdd.push(createQueueItem({ file }));
      added += 1;
    }

    if (duplicates > 0) reasons.push(`${duplicates} duplicate file(s) skipped.`);
    if (invalid > 0) reasons.push(`${invalid} unsupported file(s) skipped.`);

    if (toAdd.length > 0) {
      setItems((prev) => [...prev, ...toAdd]);
    }

    return {
      added,
      rejected: duplicates + invalid,
      message: reasons.length ? reasons.join(' ') : null,
    };
  }, []);

  const convertItem = useCallback(
    async (id: string, currentSettings: ConversionSettings) => {
      setItems((prev) => setStatus(prev, id, 'converting'));

      // Find the file from the latest ref.
      const target = itemsRef.current.find((i) => i.id === id);
      if (!target) return;

      try {
        const to = conversionRef.current.to;
        const from = resolveFromRef.current
          ? resolveFromRef.current(target.file)
          : conversionRef.current.from;
        if (!from) throw new Error('Unsupported file type');
        const output = await convertImage(target.file, from, to, currentSettings);

        // Build a de-duplicated output filename against all other results.
        const used = new Set<string>();
        for (const other of itemsRef.current) {
          if (other.id !== id && other.result) {
            used.add(other.result.filename.toLowerCase());
          }
        }
        const desired = toOutputName(
          target.name,
          to.exts[0],
          currentSettings.namingFormat,
          currentSettings.customName,
        );
        const filename = ensureUniqueName(desired, used);

        const url = URL.createObjectURL(output.blob);
        setItems((prev) =>
          setResult(prev, id, {
            blob: output.blob,
            url,
            filename,
            width: output.width,
            height: output.height,
            size: output.blob.size,
          }),
        );
        // Count this successful conversion toward the global tally (buffered,
        // best-effort — sends only a number, never any image data).
        recordConversions(1);
      } catch (err) {
        const conversionError = toConversionError(err);
        setItems((prev) => setError(prev, id, conversionError.message));
      }
    },
    [],
  );

  const convertAll = useCallback(async () => {
    if (isRunningRef.current) return;
    if (!isConversionSupported()) {
      setSupported(false);
      return;
    }
    const pending = itemsRef.current.filter((i) => i.status === 'waiting');
    if (pending.length === 0) return;

    isRunningRef.current = true;
    setIsConverting(true);
    const currentSettings = settings;
    try {
      await runWithConcurrency(
        pending,
        (item) => convertItem(item.id, currentSettings),
        limits.concurrency,
      );
    } finally {
      isRunningRef.current = false;
      setIsConverting(false);
    }
  }, [convertItem, settings]);

  // Auto-convert freshly added files (unless the user has paused auto-convert).
  useEffect(() => {
    if (!autoConvertRef.current) return;
    if (isRunningRef.current) return;
    if (items.some((i) => i.status === 'waiting')) {
      void convertAll();
    }
  }, [items, convertAll]);

  // When the output target changes (universal converter), re-run completed
  // items so their results reflect the newly-chosen format.
  const prevTargetRef = useRef(conversion.to.id);
  useEffect(() => {
    if (prevTargetRef.current === conversion.to.id) return;
    prevTargetRef.current = conversion.to.id;
    setItems((current) =>
      current.map((item) => {
        if (item.status !== 'complete') return item;
        safeRevoke(item.result?.url);
        return {
          ...item,
          status: 'waiting',
          progress: 0,
          result: undefined,
          error: undefined,
        };
      }),
    );
  }, [conversion.to.id]);

  const retryItem = useCallback(
    (id: string) => {
      // Reset to waiting; the auto-convert effect (or manual Convert) picks it up.
      setItems((prev) => resetForRetry(prev, id));
      if (!autoConvertRef.current) {
        void convertAll();
      }
    },
    [convertAll],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        safeRevoke(target.previewUrl);
        safeRevoke(target.result?.url);
      }
      return removeItemPure(prev, id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems((prev) => {
      for (const item of prev) {
        safeRevoke(item.previewUrl);
        safeRevoke(item.result?.url);
      }
      return [];
    });
    setNotice(null);
  }, []);

  const clearCompleted = useCallback(() => {
    setItems((prev) => {
      const remaining: QueueItem[] = [];
      for (const item of prev) {
        if (item.status === 'complete') {
          safeRevoke(item.previewUrl);
          safeRevoke(item.result?.url);
        } else {
          remaining.push(item);
        }
      }
      return remaining;
    });
  }, []);

  const downloadOne = useCallback((item: QueueItem) => {
    if (item.result) {
      downloadUrl(item.result.url, item.result.filename);
    }
  }, []);

  const downloadZip = useCallback(async () => {
    const done = completedItems(itemsRef.current);
    if (done.length === 0) return;
    try {
      const entries = done.map((item) => ({
        filename: item.result!.filename,
        blob: item.result!.blob,
      }));
      const zip = await createZipBlob(entries);
      downloadBlob(zip, defaultZipName());
    } catch (err) {
      const conversionError = toConversionError(err);
      setNotice(conversionError.message);
    }
  }, []);

  const updateSettings = useCallback((patch: Partial<ConversionSettings>) => {
    const prev = settingsRef.current;
    const next = { ...prev, ...patch };
    setSettings(next);

    const outputChanged = OUTPUT_KEYS.some((k) => prev[k] !== next[k]);
    if (outputChanged) {
      // Reset completed items to waiting (revoking stale result URLs) so the
      // auto-convert effect re-processes them with the new settings.
      setItems((current) =>
        current.map((item) => {
          if (item.status !== 'complete') return item;
          safeRevoke(item.result?.url);
          return {
            ...item,
            status: 'waiting',
            progress: 0,
            result: undefined,
            error: undefined,
          };
        }),
      );
      return;
    }

    // Naming-only change: re-derive output filenames of completed items in
    // place (no re-decode needed — the PNG bytes are unchanged).
    const namingChanged =
      prev.namingFormat !== next.namingFormat || prev.customName !== next.customName;
    if (namingChanged) {
      setItems((current) => {
        const used = new Set<string>();
        return current.map((item) => {
          if (item.status !== 'complete' || !item.result) return item;
          const desired = toOutputName(
            item.name,
            conversionRef.current.to.exts[0],
            next.namingFormat,
            next.customName,
          );
          const filename = ensureUniqueName(desired, used);
          if (filename === item.result.filename) return item;
          return { ...item, result: { ...item.result, filename } };
        });
      });
    }
  }, []);

  const dismissNotice = useCallback(() => setNotice(null), []);

  return {
    items,
    settings,
    isConverting,
    supported,
    notice,
    addFiles,
    convertAll,
    retryItem,
    removeItem,
    clearAll,
    clearCompleted,
    downloadOne,
    downloadZip,
    updateSettings,
    setNotice,
    dismissNotice,
  };
}

export type ConverterApi = ReturnType<typeof useConverter>;
