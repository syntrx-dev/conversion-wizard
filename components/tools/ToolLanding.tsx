import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import type { Tool } from '@/lib/config/tools';
import { tools } from '@/lib/config/tools';
import { CompressTool } from '@/components/tools/CompressTool';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/seo/structuredData';

const trustPoints = ['Free to use', 'No signup', 'In your browser', 'Batch process'];

function compressFaq(tool: Tool) {
  const target = tool.params.targetKB;
  const targetLabel = target ? `${target} KB` : 'your target size';
  return [
    {
      question: `Is this image compressor free?`,
      answer:
        'Yes — completely free, with no signup, no watermarks, and no per-file limits beyond a sensible batch cap that keeps your browser responsive.',
    },
    {
      question: `Are my images uploaded to a server?`,
      answer:
        'No. Compression runs entirely in your browser, so your images never leave your device. That makes it safe for photos, IDs, and anything private.',
    },
    {
      question: `How does it hit ${targetLabel} without wrecking the image?`,
      answer:
        `The tool searches for the highest encoder quality whose file size lands at or under ${targetLabel}. ` +
        'If a large image still overshoots at low quality, it gently reduces the dimensions until it fits, and tells you when it did.',
    },
    {
      question: `Will the file be exactly ${targetLabel}?`,
      answer:
        `It aims for the largest file that stays at or under ${targetLabel} — so you get the best quality that still meets the limit, not an exact byte count.`,
    },
    {
      question: `Which formats can I compress?`,
      answer:
        'JPG, PNG, WEBP, HEIC, AVIF, GIF, and BMP. The compressed result is saved as JPG (most compatible) or WEBP (smaller) — your choice.',
    },
    {
      question: `Should I choose JPG or WEBP?`,
      answer:
        'JPG opens everywhere and is the safe default for uploads and email. WEBP usually reaches the same size at higher quality, so pick it when the destination supports WEBP (all modern browsers do).',
    },
  ];
}

function CompressLanding({ tool }: { tool: Tool }) {
  const target = tool.params.targetKB;
  const targetLabel = target ? `${target} KB` : 'a target size';
  const faq = compressFaq(tool);

  const relatedTools = tools.filter((t) => t.slug !== tool.slug).slice(0, 5);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faq),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: tool.name, path: `/${tool.slug}` },
          ]),
        ]}
      />

      {/* Hero + tool */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container-page pb-12 pt-6 sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              crumbs={[
                { name: 'Home', path: '/' },
                { name: 'Tools', path: '/tools' },
                { name: tool.name, path: `/${tool.slug}` },
              ]}
            />
          </div>
          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{tool.h1}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {tool.lead}
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft"
                >
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="tool"
            className="mx-auto mt-8 max-w-3xl scroll-mt-24 rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-card-hover dark:border-slate-800 dark:bg-slate-900/60 sm:p-6"
          >
            <CompressTool fixedTargetKB={target} />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-page py-14">
        <article className="prose-page mx-auto max-w-3xl">
          <p>
            Need an image under {targetLabel}? This free tool compresses JPG, PNG, WEBP, HEIC and
            other images down to size right in your browser — no uploads, no account, and no
            software to install. Drop your files above and download the smaller versions.
          </p>

          <h2>How to compress an image to {targetLabel}</h2>
          <ol>
            <li>Add your images above — drag and drop, click to browse, or paste.</li>
            <li>
              The tool automatically finds the highest quality that fits{' '}
              {target ? `${target} KB` : 'your chosen size'}, resizing only if it has to.
            </li>
            <li>Download each result, or grab the whole batch as a single ZIP.</li>
          </ol>

          <h2>Why compress to {targetLabel}?</h2>
          <p>Size limits show up everywhere, and a too-big image is a constant small annoyance:</p>
          <ul>
            <li>
              <strong>Upload forms and portals</strong> — job applications, government sites, and
              school systems often cap uploads at a specific size.
            </li>
            <li>
              <strong>Email attachments</strong> — keeping a photo small avoids bouncing past
              inbox limits.
            </li>
            <li>
              <strong>Faster web pages</strong> — smaller images load quicker and improve your
              page-speed scores.
            </li>
            <li>
              <strong>Chat and forums</strong> — Discord, WhatsApp, and message boards all have
              their own attachment caps.
            </li>
          </ul>

          <h2>How the compressor works</h2>
          <p>
            Rather than guessing at a quality percentage, the tool binary-searches the encoder:
            it repeatedly re-encodes your image and homes in on the highest quality whose file
            size still lands at or under {targetLabel}. If an image is so large that even low
            quality overshoots, it reduces the dimensions step by step until it fits — and it
            tells you when that happened, so nothing is a surprise. This is the same approach a
            desktop &ldquo;save for web&rdquo; workflow uses, except it runs entirely on your
            device.
          </p>

          <h2>JPG or WEBP?</h2>
          <p>
            You can save the result as either. <strong>JPG</strong> is the most compatible choice
            — it opens on everything and is the safe pick for uploads and email.{' '}
            <strong>WEBP</strong> generally reaches the same target at noticeably higher quality,
            so choose it when you know the destination accepts WEBP (every modern browser does).
            Note that saving as JPG flattens transparency onto a white background; WEBP keeps it.
            If you only need a different <em>format</em> rather than a smaller size, use a{' '}
            <Link href="/">format converter</Link> instead.
          </p>

          <h2>Is it private?</h2>
          <p>
            Yes. Every image is processed locally in your browser and is never sent to a server —
            so it&rsquo;s safe for personal photos, scanned documents, and IDs. Learn more about{' '}
            <Link href="/guides/convert-images-without-uploading">
              converting and compressing images without uploading them
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

        {relatedTools.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl">
            <h2 className="text-xl font-bold tracking-tight">More image tools</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {relatedTools.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                  >
                    {t.name}
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

/** Renders the right tool landing for a given tool config. */
export function ToolLanding({ tool }: { tool: Tool }) {
  // Only 'compress' has a runner today; the registry never lists others yet.
  return <CompressLanding tool={tool} />;
}
