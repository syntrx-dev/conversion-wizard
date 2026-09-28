'use client';

import { useEffect, useRef, useState } from 'react';
import { getConversionTotal } from '@/lib/utils/counter';

interface Stat {
  value: number;
  display: (n: number) => string;
  label: string;
}

const STATIC_STATS: Stat[] = [
  { value: 15, display: (n) => `${n}`, label: 'Converters' },
  { value: 8, display: (n) => `${n}`, label: 'Image formats' },
  { value: 100, display: (n) => `${n}%`, label: 'Browser-based' },
  { value: 0, display: () => '0', label: 'Uploads' },
];

/** Count-up that animates when scrolled into view. */
function CountUp({
  target,
  display,
}: {
  target: number;
  display: (n: number) => string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === 0) {
      setN(target);
      return;
    }
    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 1100;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{display(n)}</span>;
}

export function AnimatedStats() {
  const [converted, setConverted] = useState<number | null>(null);

  useEffect(() => {
    getConversionTotal().then((t) => {
      if (typeof t === 'number' && t > 0) setConverted(t);
    });
  }, []);

  // Swap the "Uploads: 0" tile for the live conversion total once it's meaningful.
  const stats: Stat[] =
    converted !== null
      ? [
          {
            value: converted,
            display: (n) => n.toLocaleString(),
            label: 'Images converted',
          },
          ...STATIC_STATS.slice(0, 3),
        ]
      : STATIC_STATS;

  return (
    <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-slate-200 bg-white/70 px-3 py-4 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
        >
          <dd className="text-2xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400 sm:text-3xl">
            <CountUp target={s.value} display={s.display} />
          </dd>
          <dt className="mt-1 text-xs font-medium text-ink-muted">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
