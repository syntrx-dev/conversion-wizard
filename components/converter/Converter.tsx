'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';
import { useConverter } from '@/lib/hooks/useConverter';
import { FileDropzone } from './FileDropzone';
import { ConversionQueue } from './ConversionQueue';
import { ConversionSettingsPanel } from './ConversionSettings';
import { DownloadResults } from './DownloadResults';
import { PrivacyNotice } from './PrivacyNotice';
import { hasExtension, acceptAttr } from '@/lib/files/validate';
import { limits } from '@/lib/config/limits';
import { countByStatus } from '@/lib/conversion/queue';
import type { Conversion } from '@/lib/config/conversions';
import type { FormatMeta } from '@/lib/config/formats';

interface ConverterProps {
  conversion: Conversion;
  /** Universal mode: detect each file's source format instead of a fixed one. */
  resolveFrom?: (file: File) => FormatMeta | undefined;
  /** Dropzone label ('' → generic "files"), accept string, and human accept text. */
  inputLabel?: string;
  inputAccept?: string;
  inputAcceptText?: string;
  /** Optional node (e.g. a target-format selector) rendered above the dropzone. */
  toolbar?: React.ReactNode;
}

export function Converter({
  conversion,
  resolveFrom,
  inputLabel,
  inputAccept,
  inputAcceptText,
  toolbar,
}: ConverterProps) {
  const {
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
    downloadOne,
    downloadZip,
    updateSettings,
    setNotice,
    dismissNotice,
  } = useConverter(conversion, resolveFrom);

  const label = inputLabel ?? conversion.from.label;
  const accept = inputAccept ?? acceptAttr(conversion.from);
  const acceptText = inputAcceptText ?? conversion.from.exts.join(', ');
  const isAccepted = (file: File) =>
    resolveFrom ? !!resolveFrom(file) : hasExtension(file.name, conversion.from.exts);

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [highlightSmaller, setHighlightSmaller] = useState(false);
  const hasItems = items.length > 0;
  const counts = countByStatus(items);

  useEffect(() => {
    return () => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
    };
  }, []);

  // "Want to reduce file size?" — open settings, scroll to them, and pulse the
  // "Smaller" option so the user can switch (which re-converts smaller).
  const handleReduceSize = useCallback(() => {
    setSettingsOpen(true);
    setHighlightSmaller(true);
    requestAnimationFrame(() => {
      settingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setHighlightSmaller(false), 2800);
  }, []);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const summary = addFiles(files);
      const arr = Array.from(files);
      if (arr.length > limits.largeBatchThreshold) {
        setNotice(
          `You added ${arr.length} files. Large batches may take a little longer — conversions run a few at a time to keep your browser responsive.`,
        );
      } else if (summary.message) {
        setNotice(summary.message);
      }
    },
    [addFiles, setNotice],
  );

  // Clipboard paste support (e.g. paste a copied HEIC file).
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = e.clipboardData?.files;
      if (!files || files.length === 0) return;
      const matching = Array.from(files).filter((f) => isAccepted(f));
      if (matching.length > 0) {
        e.preventDefault();
        handleFiles(matching);
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [handleFiles, conversion]);

  const openPicker = useCallback(() => hiddenInputRef.current?.click(), []);

  // Screen-reader status summary.
  const liveMessage = isConverting
    ? `Converting images. ${counts.complete} of ${items.length} complete.`
    : counts.complete > 0
      ? `${counts.complete} image${counts.complete === 1 ? '' : 's'} converted and ready to download.`
      : '';

  return (
    <div className="space-y-4">
      {/* Hidden input for the "Add more" action. */}
      <input
        ref={hiddenInputRef}
        type="file"
        accept={accept}
        multiple
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {!supported && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            Your browser can’t run the in-browser converter. Please update to the latest
            version of Chrome, Edge, Firefox, or Safari and try again.
          </p>
        </div>
      )}

      {toolbar}

      {!hasItems ? (
        <FileDropzone
          onFiles={handleFiles}
          disabled={!supported}
          label={label}
          accept={accept}
          acceptText={acceptText}
        />
      ) : (
        <FileDropzone
          onFiles={handleFiles}
          disabled={!supported}
          compact
          label={label}
          accept={accept}
          acceptText={acceptText}
        />
      )}

      {!resolveFrom && conversion.from.inputNote && (
        <p className="flex items-start justify-center gap-1.5 text-center text-xs text-ink-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{conversion.from.inputNote}</span>
        </p>
      )}

      <div className="flex items-center justify-center">
        <PrivacyNotice />
      </div>

      {notice && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-3 text-sm text-brand-800 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="flex-1">{notice}</p>
          <button
            type="button"
            onClick={dismissNotice}
            className="rounded p-0.5 text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            aria-label="Dismiss message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div ref={settingsRef} className="scroll-mt-20">
        <ConversionSettingsPanel
          settings={settings}
          onChange={updateSettings}
          target={conversion.to}
          disabled={isConverting}
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          highlightSmaller={highlightSmaller}
        />
      </div>

      {hasItems && (
        <DownloadResults
          items={items}
          isConverting={isConverting}
          onConvertAll={convertAll}
          onDownloadZip={downloadZip}
          onClearAll={clearAll}
          onAddMore={openPicker}
        />
      )}

      <ConversionQueue
        items={items}
        onRemove={removeItem}
        onRetry={retryItem}
        onDownload={downloadOne}
        canReduce={conversion.to.id === 'png' && settings.compression === 'lossless'}
        onReduceSize={handleReduceSize}
      />

      {/* Polite live region for assistive tech. */}
      <div aria-live="polite" className="sr-only">
        {liveMessage}
      </div>
    </div>
  );
}
