import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ConverterCta } from '@/components/sections/ConverterCta';
import { guides } from '@/lib/content/guides';

export const metadata: Metadata = buildMetadata({
  title: 'HEIC Guides & How-Tos',
  description:
    'Practical guides for working with HEIC photos: how to open them on Windows, fix files that won’t open, turn off HEIC on iPhone, view HEIC on Android, and more.',
  path: '/guides',
});

const converterPages = [
  { href: '/heic-to-png', label: 'HEIC to PNG converter' },
  { href: '/heif-to-png', label: 'HEIF to PNG converter' },
  { href: '/how-to-convert-heic-to-png', label: 'How to convert HEIC to PNG' },
  { href: '/heic-vs-png', label: 'HEIC vs PNG' },
  { href: '/convert-iphone-photos-to-png', label: 'Convert iPhone photos to PNG' },
];

export default function GuidesPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          crumbs={[
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
          ]}
        />
        <header className="mt-6 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            HEIC guides &amp; how-tos
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Clear, practical answers to the most common HEIC and HEIF questions — from
            opening the files on Windows to turning off HEIC capture on your iPhone. Every
            guide also links to our free, private in-browser converter.
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
              >
                <h2 className="text-base font-semibold text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
                  {guide.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {guide.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                  Read the guide
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">
            Converter &amp; format pages
          </h2>
          <p className="mt-2 text-ink-soft">
            Ready to convert, or want the format details? These pages cover the tool
            itself.
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {converterPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                >
                  {page.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <ConverterCta />
        </div>
      </div>
    </div>
  );
}
