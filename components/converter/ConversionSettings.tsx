'use client';

import { useId } from 'react';
import { Settings2, ChevronDown } from 'lucide-react';
import type { ConversionSettings, NamingFormat } from '@/lib/config/settings';
import type { FormatMeta } from '@/lib/config/formats';
import { cn } from '@/lib/utils/cn';

interface ConversionSettingsProps {
  settings: ConversionSettings;
  onChange: (patch: Partial<ConversionSettings>) => void;
  /** The output format — controls which options are shown. */
  target: FormatMeta;
  disabled?: boolean;
  /** Controlled open state of the panel. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When true, draw attention to the "Smaller" output-size option. */
  highlightSmaller?: boolean;
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-800',
        disabled
          ? 'opacity-60'
          : 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700',
      )}
    >
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="mt-0.5 block text-xs text-ink-muted">{hint}</span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2 dark:bg-slate-700" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5 dark:bg-slate-900" />
      </span>
    </label>
  );
}

export function ConversionSettingsPanel({
  settings,
  onChange,
  target,
  disabled = false,
  open,
  onOpenChange,
  highlightSmaller = false,
}: ConversionSettingsProps) {
  const panelId = useId();
  const namingId = useId();
  const ext = target.exts[0].replace('.', '');
  const isPng = target.id === 'png';

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Settings2 className="h-4 w-4 text-ink-muted" aria-hidden="true" />
          Conversion settings
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-ink-muted transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="space-y-3 border-t border-slate-100 p-4 dark:border-slate-800"
        >
          {!isPng && target.lossy && (
            <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <label
                htmlFor={`${panelId}-quality`}
                className="block text-sm font-medium text-ink"
              >
                Quality: {Math.round(settings.quality * 100)}%
              </label>
              <input
                id={`${panelId}-quality`}
                type="range"
                min={0.4}
                max={1}
                step={0.02}
                value={settings.quality}
                disabled={disabled}
                onChange={(e) => onChange({ quality: Number(e.target.value) })}
                className="mt-2 w-full accent-brand-600"
              />
              <p className="mt-1 text-xs text-ink-muted">
                Higher quality means a larger {target.label} file. 90–95% is a great
                balance for most images.
              </p>
            </div>
          )}

          {isPng && (
            <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <span className="block text-sm font-medium text-ink">Output file size</span>
              <div
                role="group"
                aria-label="PNG output size"
                className="mt-2 grid grid-cols-2 gap-2"
              >
                {[
                  {
                    value: 'optimized' as const,
                    title: 'Smaller',
                    sub: 'Recommended',
                  },
                  {
                    value: 'lossless' as const,
                    title: 'Lossless',
                    sub: 'Exact, largest',
                  },
                ].map((opt) => {
                  const active = settings.compression === opt.value;
                  const highlighted = highlightSmaller && opt.value === 'optimized';
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={disabled}
                      aria-pressed={active}
                      onClick={() => onChange({ compression: opt.value })}
                      className={cn(
                        'rounded-lg border px-3 py-2 text-left transition-colors',
                        active
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                          : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600',
                        highlighted &&
                          'animate-pulse border-brand-500 ring-2 ring-brand-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900',
                        disabled && 'cursor-not-allowed opacity-60',
                      )}
                    >
                      <span
                        className={cn(
                          'block text-sm font-semibold',
                          active ? 'text-brand-700 dark:text-brand-300' : 'text-ink',
                        )}
                      >
                        {opt.title}
                      </span>
                      <span className="block text-xs text-ink-muted">{opt.sub}</span>
                    </button>
                  );
                })}
              </div>

              {settings.compression === 'optimized' && (
                <div className="mt-3">
                  <label
                    htmlFor={`${panelId}-colors`}
                    className="block text-xs font-medium text-ink-soft"
                  >
                    Max colors: {settings.colors}{' '}
                    <span className="text-ink-muted">(fewer = smaller)</span>
                  </label>
                  <input
                    id={`${panelId}-colors`}
                    type="range"
                    min={16}
                    max={256}
                    step={16}
                    value={settings.colors}
                    disabled={disabled}
                    onChange={(e) => onChange({ colors: Number(e.target.value) })}
                    className="mt-1 w-full accent-brand-600"
                  />
                  <p className="mt-1 text-xs text-ink-muted">
                    Reduces the PNG to a smart colour palette — usually a fraction of the
                    lossless size with no visible difference.
                  </p>
                </div>
              )}
            </div>
          )}

          <Toggle
            label="Preserve original dimensions"
            hint="Keep the photo at its full resolution."
            checked={settings.preserveDimensions}
            disabled={disabled}
            onChange={(v) => onChange({ preserveDimensions: v })}
          />

          {!settings.preserveDimensions && (
            <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <label
                htmlFor={`${panelId}-max`}
                className="block text-sm font-medium text-ink"
              >
                Max longest edge: {settings.maxDimension}px
              </label>
              <input
                id={`${panelId}-max`}
                type="range"
                min={512}
                max={8192}
                step={256}
                value={settings.maxDimension}
                disabled={disabled}
                onChange={(e) => onChange({ maxDimension: Number(e.target.value) })}
                className="mt-2 w-full accent-brand-600"
              />
              <p className="mt-1 text-xs text-ink-muted">
                Larger images are scaled down proportionally.
              </p>
            </div>
          )}

          {target.transparency && (
            <Toggle
              label="Preserve transparency"
              hint="Keep the alpha channel when the source has one."
              checked={settings.preserveTransparency}
              disabled={disabled}
              onChange={(v) => onChange({ preserveTransparency: v })}
            />
          )}

          <Toggle
            label="Remove metadata"
            hint="Strip EXIF and location data from the output (recommended)."
            checked={settings.removeMetadata}
            disabled={disabled}
            onChange={(v) => onChange({ removeMetadata: v })}
          />

          <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
            <label htmlFor={namingId} className="block text-sm font-medium text-ink">
              File naming
            </label>
            <select
              id={namingId}
              value={settings.namingFormat}
              disabled={disabled}
              onChange={(e) => onChange({ namingFormat: e.target.value as NamingFormat })}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="original">Keep original name (IMG_1234.{ext})</option>
              <option value="lowercase">Lowercase name (img_1234.{ext})</option>
              <option value="clean">Remove dashes/underscores (IMG 1234.{ext})</option>
              <option value="custom">Custom name…</option>
            </select>

            {settings.namingFormat === 'custom' && (
              <div className="mt-2">
                <label htmlFor={`${namingId}-custom`} className="sr-only">
                  Custom file name
                </label>
                <input
                  id={`${namingId}-custom`}
                  type="text"
                  value={settings.customName}
                  disabled={disabled}
                  placeholder="e.g. vacation-photo"
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(e) => onChange({ customName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
                />
                <p className="mt-1 text-xs text-ink-muted">
                  Used for every file. Multiple images are numbered automatically
                  (name.png, name-2.png…). The “.png” extension is added for you.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
