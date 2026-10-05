'use client';

import { useState } from 'react';
import { Converter } from './Converter';
import {
  formats,
  outputFormats,
  detectFormat,
  allInputExtensions,
  allInputMimes,
  type FormatMeta,
} from '@/lib/config/formats';
import type { Conversion } from '@/lib/config/conversions';
import { cn } from '@/lib/utils/cn';

const acceptAttr = [...allInputExtensions, ...allInputMimes].join(',');
const acceptText = 'HEIC, JPG, PNG, WEBP, AVIF, GIF, BMP, SVG, PDF';

function makeConversion(to: FormatMeta): Conversion {
  return {
    slug: `to-${to.id}`,
    from: formats.png, // placeholder — resolveFrom detects the real source per file
    to,
    name: `Image to ${to.label}`,
    title: `Convert to ${to.label}`,
    description: '',
    lead: '',
  };
}

/**
 * The homepage's do-it-all converter: drop any supported image, pick an output
 * format, and it detects each file's source type automatically.
 *
 * `defaultTarget` picks which output starts selected, so a guide can embed this
 * pre-set to the format that article recommends. It's a plain string rather than
 * a `FormatMeta` so a server component (an article page) can pass it across the
 * client boundary.
 */
export function UniversalConverter({
  defaultTarget = 'png',
}: {
  defaultTarget?: 'png' | 'jpg' | 'webp';
} = {}) {
  const [target, setTarget] = useState<FormatMeta>(
    formats[defaultTarget] ?? formats.png,
  );

  const toolbar = (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
      <span className="font-medium text-ink-soft">Convert to:</span>
      <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-800/60">
        {outputFormats.map((f) => {
          const active = f.id === target.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setTarget(f)}
              className={cn(
                'rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors',
                active
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink',
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Converter
      conversion={makeConversion(target)}
      resolveFrom={(file) => detectFormat(file.name)}
      inputLabel=""
      inputAccept={acceptAttr}
      inputAcceptText={acceptText}
      toolbar={toolbar}
    />
  );
}
