import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ConverterCta } from '@/components/sections/ConverterCta';
import { relatedGuides } from '@/lib/content/guides';
import type { Crumb } from '@/lib/seo/structuredData';

interface ArticleShellProps {
  crumbs: Crumb[];
  title: string;
  lead: string;
  children: ReactNode;
  ctaHeading?: string;
  ctaBody?: string;
}

/** Consistent shell for the informational / SEO landing pages. */
export function ArticleShell({
  crumbs,
  title,
  lead,
  children,
  ctaHeading,
  ctaBody,
}: ArticleShellProps) {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs crumbs={crumbs} />
        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p>
        </header>

        <article className="prose-page mt-8">{children}</article>

        {(() => {
          // Derive the current guide slug from the last breadcrumb so every
          // article surfaces a "Related guides" block (spreads internal links).
          const lastPath = crumbs[crumbs.length - 1]?.path ?? '';
          const m = lastPath.match(/^\/guides\/([^/]+)\/?$/);
          const related = relatedGuides(m ? m[1] : '', 4);
          if (related.length === 0) return null;
          return (
            <nav aria-label="Related guides" className="mt-14 border-t border-slate-200 pt-8 dark:border-slate-800">
              <h2 className="text-lg font-bold tracking-tight text-ink">Related guides</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/guides/${g.slug}`}
                      className="group flex items-start justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-ink-soft shadow-card transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                    >
                      <span>{g.title}</span>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-0.5 dark:text-brand-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          );
        })()}

        <div className="mt-12">
          <ConverterCta heading={ctaHeading} body={ctaBody} />
        </div>
      </div>
    </div>
  );
}
