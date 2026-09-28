'use client';

import { useEffect, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { getConversionTotal } from '@/lib/utils/counter';

/**
 * Displays the global "total conversions" tally. Fetches once on mount from the
 * same-origin counter endpoint. Renders nothing if the total is unavailable
 * (e.g. during local dev where PHP isn't running), so it never shows a broken
 * or "0" state before data arrives.
 */
export function ConversionCounter({ className = '' }: { className?: string }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    getConversionTotal().then((n) => {
      if (active && typeof n === 'number' && n > 0) setTotal(n);
    });
    return () => {
      active = false;
    };
  }, []);

  if (total === null) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm shadow-card dark:border-slate-800 dark:bg-slate-900 ${className}`}
      aria-label={`${total.toLocaleString()} ${total === 1 ? 'image' : 'images'} converted so far`}
    >
      <ImageIcon
        className="h-4 w-4 text-brand-600 dark:text-brand-400"
        aria-hidden="true"
      />
      <span className="text-ink-soft">
        <span className="font-bold text-ink">{total.toLocaleString()}</span>{' '}
        {total === 1 ? 'image' : 'images'} converted
      </span>
    </div>
  );
}
