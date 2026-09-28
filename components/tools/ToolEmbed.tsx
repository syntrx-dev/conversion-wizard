import type { ReactNode } from 'react';

/**
 * A highlighted, self-contained block that drops a live tool (compressor,
 * converter, …) straight into the middle of a guide article — so a reader who
 * came for a problem can solve it right there. `not-prose` isolates the tool's
 * own styling from the surrounding article typography.
 */
export function ToolEmbed({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 shadow-card dark:border-brand-500/30 dark:bg-brand-500/5 sm:p-6">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
