import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Minimize2 } from 'lucide-react';
import { toolsByCategory } from '@/lib/config/tools';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Free Image Tools — Compress, Resize & Optimize',
  description:
    'Free browser-based image tools: compress an image to a target file size (100 KB, 200 KB, 500 KB and more), and more utilities — all private, with no uploads.',
  path: '/tools',
});

const categoryIntro: Record<string, string> = {
  Compress: 'Shrink any image to a target file size — the highest quality that fits the limit.',
  Resize: 'Set exact pixel dimensions for a platform or purpose.',
  Optimize: 'Clean up and prepare images for sharing or the web.',
};

export default function ToolsHubPage() {
  const groups = toolsByCategory();

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          crumbs={[
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
          ]}
        />
        <header className="mt-6 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Free image tools</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Task-specific utilities that run entirely in your browser — no uploads, no signup.
            Your images never leave your device.
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section key={group.category}>
              <div className="flex items-center gap-2">
                <Minimize2 className="h-5 w-5 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                <h2 className="text-xl font-bold tracking-tight">{group.category}</h2>
              </div>
              {categoryIntro[group.category] && (
                <p className="mt-1 text-sm text-ink-soft">{categoryIntro[group.category]}</p>
              )}
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/${t.slug}`}
                      className="group flex h-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card transition-shadow hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
                    >
                      <span className="font-medium text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
                        {t.name}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-0.5 dark:text-brand-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-ink-soft">
            Looking to change a file&rsquo;s format instead of its size?
          </p>
          <Link
            href="/#converters"
            className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300"
          >
            Browse the image converters
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
