import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { conversions, type Conversion } from '@/lib/config/conversions';
import { getFormatContent } from '@/lib/content/formatContent';
import { Converter } from '@/components/converter/Converter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/seo/structuredData';

const trustPoints = ['Free to use', 'No signup', 'In your browser', 'Batch convert'];

/** Lower-case the first character (for stitching a noun phrase into a sentence). */
function lc(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function faqForConversion(c: Conversion) {
  const qualityAnswer = c.to.lossy
    ? `${c.to.label} is a compressed format, so you can trade a little quality for a smaller file using the quality slider. At 90–95% the difference is invisible for most images. ` +
      (c.from.lossy
        ? `Since ${c.from.label} is already compressed, converting won’t restore lost detail, but it won’t noticeably degrade the image either.`
        : '')
    : `${c.to.label} is a lossless format, so every pixel from the decoded image is preserved exactly — there’s no visible quality loss.`;

  const transparencyAnswer = !c.to.transparency
    ? `${c.to.label} doesn’t support transparency, so any transparent areas in your ${c.from.label} files are filled with a solid white background during conversion. If you need to keep transparency, convert to PNG or WEBP instead.`
    : c.from.transparency
      ? `Yes. ${c.to.label} supports an alpha channel, so transparent areas in your ${c.from.label} files are preserved. If you’d rather flatten them onto a white background, you can turn transparency off in the settings.`
      : `${c.to.label} supports transparency, but ${c.from.label} images are fully opaque to begin with — so there’s nothing to lose, and your converted files stay opaque.`;

  return [
    {
      question: `Is this ${c.name} converter free?`,
      answer:
        'Yes. It’s completely free with no signup, no watermarks, and no per-file limits beyond sensible batch caps that keep your browser responsive.',
    },
    {
      question: `Are my ${c.from.label} files uploaded to a server?`,
      answer:
        'No. Conversion happens entirely in your browser using WebAssembly and your device’s own image tools, so your files are never intentionally sent to a server.',
    },
    {
      question: `Does converting ${c.from.label} to ${c.to.label} reduce quality?`,
      answer: qualityAnswer,
    },
    {
      question: `Will converting to ${c.to.label} keep transparency?`,
      answer: transparencyAnswer,
    },
    {
      question: `Can I convert multiple ${c.from.label} files at once?`,
      answer:
        'Yes. Add up to 50 files per batch, convert them together, and download them individually or as a single ZIP.',
    },
    {
      question: `Does the ${c.from.label} to ${c.to.label} converter work on a phone?`,
      answer:
        'Yes. It runs in any modern browser — Chrome, Edge, Firefox, and Safari — on Windows, macOS, Android, and iPhone or iPad. Because it works on-device, you can convert straight from your phone’s photo library.',
    },
    {
      question: `Is there a file size limit?`,
      answer:
        'You can convert files up to 100 MB each. Because everything runs in your browser, very large files depend on your device’s available memory.',
    },
  ];
}

export function ConverterLanding({ c }: { c: Conversion }) {
  const faq = faqForConversion(c);
  const fromC = getFormatContent(c.from.id);
  const toC = getFormatContent(c.to.id);

  const related = conversions
    .filter((x) => x.slug !== c.slug && (x.from.id === c.from.id || x.to.id === c.to.id))
    .slice(0, 6);

  const sizeNote =
    !c.from.lossy && c.to.lossy
      ? `Because ${c.to.label} uses compression, the converted files are usually smaller than the ${c.from.label} originals.`
      : c.from.lossy && !c.to.lossy
        ? `Because ${c.to.label} is lossless, the converted files are often larger than the ${c.from.label} originals — that’s the trade-off for perfect fidelity.`
        : `File sizes depend on the image and the settings you choose.`;

  const comparisonRows: { label: string; from: string; to: string }[] = [
    {
      label: 'Compression',
      from: c.from.lossy ? 'Lossy' : 'Lossless',
      to: c.to.lossy ? 'Lossy' : 'Lossless',
    },
    {
      label: 'Transparency',
      from: c.from.transparency ? 'Yes' : 'No',
      to: c.to.transparency ? 'Yes' : 'No',
    },
    { label: 'Animation', from: c.from.animation ? 'Yes' : 'No', to: c.to.animation ? 'Yes' : 'No' },
    { label: 'Best for', from: c.from.typicalUse, to: c.to.typicalUse },
  ];

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faq),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: c.name, path: `/${c.slug}` },
          ]),
        ]}
      />

      {/* Hero + converter */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container-page pb-12 pt-6 sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              crumbs={[
                { name: 'Home', path: '/' },
                { name: c.name, path: `/${c.slug}` },
              ]}
            />
          </div>
          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Convert {c.from.label} to {c.to.label}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {c.lead}
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft"
                >
                  <Check
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="converter"
            className="mx-auto mt-8 max-w-3xl scroll-mt-24 rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-card-hover dark:border-slate-800 dark:bg-slate-900/60 sm:p-6"
          >
            <Converter conversion={c} />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-page py-14">
        <article className="prose-page mx-auto max-w-3xl">
          <p>
            Need a {c.to.label} instead of a {c.from.label}? This free converter turns your{' '}
            {c.from.label} files into {c.to.label} right in your browser — no uploads, no
            account, and no software to install. Everything below explains how it works, what
            changes when you convert, and how to get the best result.
          </p>

          <h2>
            How to convert {c.from.label} to {c.to.label}
          </h2>
          <ol>
            <li>
              Add your {c.from.label} files above — drag and drop, click to browse, or paste.
              Nothing is uploaded.
            </li>
            <li>
              Each file is decoded and re-encoded to {c.to.label} on your device, right in the
              browser.
            </li>
            <li>
              Download each {c.to.label} individually, or grab the whole batch as a single ZIP.
            </li>
          </ol>

          <h2>
            Why convert {c.from.label} to {c.to.label}?
          </h2>
          <p>
            {c.from.label} is a good fit for {lc(c.from.typicalUse)}, but it isn’t always the
            right choice when you need to share, upload, edit, or archive an image. Converting to{' '}
            {c.to.label} gives you a file that’s better suited to those jobs.
          </p>
          <p>
            <strong>What you gain with {c.to.label}:</strong>
          </p>
          <ul>
            {c.to.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p>{sizeNote}</p>

          <h2>
            {c.from.label} vs {c.to.label} at a glance
          </h2>
          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/40">
                  <th className="px-4 py-2.5 font-semibold text-ink"> </th>
                  <th className="px-4 py-2.5 font-semibold text-ink">{c.from.label}</th>
                  <th className="px-4 py-2.5 font-semibold text-ink">{c.to.label}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                  >
                    <th scope="row" className="px-4 py-2.5 text-left font-medium text-ink-soft">
                      {row.label}
                    </th>
                    <td className="px-4 py-2.5 text-ink-soft">{row.from}</td>
                    <td className="px-4 py-2.5 text-ink-soft">{row.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {fromC && (
            <>
              <h2>
                What is {c.from.fullName} ({c.from.exts[0]})?
              </h2>
              <p>{fromC.whatIs}</p>
              <p>{fromC.technical}</p>
            </>
          )}

          {toC && (
            <>
              <h2>
                What is {c.to.fullName} ({c.to.exts[0]})?
              </h2>
              <p>{toC.whatIs}</p>
              <p>{toC.technical}</p>
            </>
          )}

          {toC && (
            <>
              <h2>When {c.to.label} is the right choice</h2>
              <p>{c.to.label} is a strong pick for:</p>
              <ul>
                {toC.useCases.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </>
          )}

          <h2>Quality and file size</h2>
          <p>
            {c.to.lossy
              ? `${c.to.label} is a lossy format, which keeps files small. Our converter defaults to high quality, and you can fine-tune it with the quality slider — 90–95% looks identical to most eyes while shrinking the file.`
              : `${c.to.label} is lossless, so it reproduces the decoded image pixel-for-pixel with no compression artifacts. That fidelity is ideal for graphics, text, and archiving.`}{' '}
            {sizeNote} Need a specific file size instead? Try our{' '}
            <Link href="/compress-image">compress-image tool</Link>.
          </p>

          <h2>Is it private?</h2>
          <p>
            Yes. Everything runs locally in your browser, so your {c.from.label} files are never
            intentionally sent to a server. Read more on our{' '}
            <Link href="/privacy">privacy page</Link>, or see whether{' '}
            <Link href="/guides/is-it-safe-to-convert-heic-online">
              converting images online is safe
            </Link>
            .
          </p>

          <h2>Frequently asked questions</h2>
          {faq.map((entry) => (
            <div key={entry.question}>
              <h3>{entry.question}</h3>
              <p>{entry.answer}</p>
            </div>
          ))}
        </article>

        {related.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl">
            <h2 className="text-xl font-bold tracking-tight">Related converters</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                  >
                    {r.name}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
