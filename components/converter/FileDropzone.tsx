'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { UploadCloud, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { limits, maxFileSizeLabel } from '@/lib/config/limits';

interface FileDropzoneProps {
  onFiles: (files: FileList | File[]) => void;
  /** Short format label, e.g. "HEIC" or "JPG". */
  label: string;
  /** `accept` attribute value for the file input. */
  accept: string;
  /** Human list of accepted extensions, e.g. ".jpg, .jpeg". */
  acceptText: string;
  disabled?: boolean;
  compact?: boolean;
}

export function FileDropzone({
  onFiles,
  label,
  accept,
  acceptText,
  disabled = false,
  compact = false,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const descriptionId = useId();

  const openPicker = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPicker();
      }
    },
    [openPicker],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      if (e.dataTransfer?.files?.length) {
        onFiles(e.dataTransfer.files);
      }
    },
    [disabled, onFiles],
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-describedby={descriptionId}
      aria-label={`Upload ${label || 'image'} files. Drag and drop, or activate to browse.`}
      onClick={openPicker}
      onKeyDown={handleKeyDown}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={handleDrop}
      className={cn(
        'group relative flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center transition-all',
        compact ? 'gap-3 p-6' : 'gap-4 p-10 sm:p-14',
        disabled
          ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-70 dark:border-slate-800 dark:bg-slate-800/40'
          : 'cursor-pointer border-slate-300 bg-white hover:border-brand-400 hover:bg-brand-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500 dark:hover:bg-brand-500/10',
        dragging &&
          !disabled &&
          'border-brand-500 bg-brand-50 ring-4 ring-brand-100 dark:bg-brand-500/10 dark:ring-brand-500/30',
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files);
          // Reset so selecting the same file again re-triggers change.
          e.target.value = '';
        }}
        tabIndex={-1}
        aria-hidden="true"
      />

      <span
        className={cn(
          'flex items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-transform group-hover:scale-105 dark:bg-brand-500/20 dark:text-brand-400',
          compact ? 'h-12 w-12' : 'h-16 w-16',
        )}
        aria-hidden="true"
      >
        {dragging ? (
          <ImagePlus className={compact ? 'h-6 w-6' : 'h-8 w-8'} />
        ) : (
          <UploadCloud className={compact ? 'h-6 w-6' : 'h-8 w-8'} />
        )}
      </span>

      <div>
        <p className={cn('font-semibold text-ink', compact ? 'text-base' : 'text-lg')}>
          {dragging
            ? 'Drop to add your images'
            : label
              ? `Drop ${label} files here`
              : 'Drop your images here'}
        </p>
        <p className="mt-1 text-sm text-ink-muted">or click to browse your device</p>
      </div>

      <span
        className={cn(
          'pointer-events-none inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors group-hover:bg-brand-700',
          disabled && 'bg-slate-400 group-hover:bg-slate-400 dark:bg-slate-600',
        )}
      >
        <UploadCloud className="h-4 w-4" aria-hidden="true" />
        {label ? `Choose ${label} Files` : 'Choose Files'}
      </span>

      <p id={descriptionId} className="text-xs text-ink-muted">
        Supports {acceptText} · up to {limits.maxFiles} files · max {maxFileSizeLabel}{' '}
        each
      </p>
    </div>
  );
}
