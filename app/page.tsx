import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  UploadCloud,
  Wand2,
  Download,
  Lock,
  Infinity as InfinityIcon,
  UserX,
  Ban,
  Zap,
  Minimize2,
} from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { webApplicationSchema, faqSchema } from '@/lib/seo/structuredData';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  conversions,
  conversionsByTarget,
  getConversion,
} from '@/lib/config/conversions';
import { comparableFormats } from '@/lib/config/formats';
import { guides } from '@/lib/content/guides';
import { UniversalConverter } from '@/components/converter/UniversalConverter';
import { AnimatedStats } from '@/components/home/AnimatedStats';

export const metadata: Metadata = buildMetadata({
  title: 'Free Image Converter – HEIC, JPG, PNG, WEBP, AVIF & More',
  description:
    'Free online image converter. Convert HEIC, JPG, PNG, WEBP, AVIF, GIF and BMP instantly in your browser — no uploads, no signup, unlimited batch conversion.',
  path: '/',
});

const benefits = ['No uploads', 'Private', 'Unlimited', 'Batch conversion'];

const floatingBadges = [
  { label: 'HEIC', className: 'left-[6%] top-[18%] rotate-[-8deg]', delay: '0s' },
  { label: 'JPG', className: 'right-[8%] top-[12%] rotate-[6deg]', delay: '1.2s' },
  { label: 'PNG', className: 'left-[12%] bottom-[16%] rotate-[5deg]', delay: '2.1s' },
  { label: 'WEBP', className: 'right-[6%] bottom-[20%] rotate-[-6deg]', delay: '0.6s' },
  { label: 'AVIF', className: 'left-[2%] top-[52%] rotate-[3deg]', delay: '1.7s' },
];

const popular = [
  { slug: 'heic-png', gradient: 'from-indigo-500 to-violet-600' },
  { slug: 'heic-jpg', gradient: 'from-sky-500 to-blue-600' },
  { slug: 'png-jpg', gradient: 'from-emerald-500 to-teal-600' },
  { slug: 'jpg-webp', gradient: 'from-amber-500 to-orange-600' },
  { slug: 'webp-png', gradient: 'from-rose-500 to-pink-600' },
  { slug: 'heic-webp', gradient: 'from-fuchsia-500 to-purple-600' },
];

const steps = [
  {
    icon: UploadCloud,
    title: 'Add your images',
    body: 'Drag & drop, browse, or paste. Mix any supported formats — nothing is uploaded to a server.',
  },
  {
    icon: Wand2,
    title: 'Convert instantly',
    body: 'Your device converts each file right in the browser. Batches process automatically.',
  },
  {
    icon: Download,
    title: 'Download',
    body: 'Save each image, or grab the whole batch as a single ZIP. That’s it.',
  },
];

const trustPoints = [
  { icon: ShieldCheck, text: 'Browser-based — your files never leave your device' },
  { icon: Ban, text: 'No servers process or store your images' },
  { icon: InfinityIcon, text: 'Unlimited conversions, always free' },
  { icon: UserX, text: 'No account or email required' },
  { icon: Lock, text: 'No watermarks on your output' },
  { icon: Zap, text: 'Opens instantly — no software to install' },
];

const homeFaqs = [
  {
    question: 'Does Conversion Wizard upload my photos?',
    answer:
      'No. Every conversion runs entirely in your browser using WebAssembly and your device’s own image tools. Your files are never intentionally sent to or stored on a server.',
  },
  {
    question: 'Is it really free and unlimited?',
    answer:
      'Yes. There’s no signup, no watermark, and no cap on how many images you convert. Sensible per-batch limits (up to 50 files at once) simply keep your browser responsive.',
  },
  {
    question: 'Can I convert files on my iPhone or Android?',
    answer:
      'Yes. The converter works in mobile Safari and Chrome. Pick images from your library, convert them on-device, and save the results back to your phone.',
  },
  {
    question: 'Does converting reduce image quality?',
    answer:
      'Converting to PNG is lossless — no visible quality is lost. For JPG and WEBP you can choose a quality level; 90–95% looks identical to most eyes while keeping files small.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Once the page has loaded, conversion happens locally, so it keeps working even with a flaky connection. Nothing needs to reach a server to convert your files.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'You can convert files up to 100 MB each. Because everything runs in your browser, very large images depend on your device’s available memory.',
  },
];

export default function HomePage() {
  const groups = conversionsByTarget();

  return (
    <>
      <JsonLd data={[webApplicationSchema(), faqSchema(homeFaqs)]} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        {/* Floating decorative format badges */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden="true"
        >
          {floatingBadges.map((b) => (
            <span
              key={b.label}
              style={{ animationDelay: b.delay }}
              className={`animate-float absolute rounded-xl border border-brand-200/60 bg-white/70 px-3 py-1.5 text-sm font-bold text-brand-600 shadow-card backdrop-blur dark:border-brand-500/30 dark:bg-slate-900/70 dark:text-brand-300 ${b.className}`}
            >
              {b.label}
            </span>
          ))}
        </div>

        <div className="container-page relative pb-12 pt-10 sm:pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Free Image Converter
            </h1>
            <p className="mt-3 text-lg font-medium text-ink-soft sm:text-xl">
              Convert HEIC, JPG, PNG, WEBP, AVIF &amp; more — instantly.
            </p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft"
                >
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* The converter — front and center */}
          <div
            id="converter"
            className="mx-auto mt-8 max-w-3xl scroll-mt-24 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-hover backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-6"
          >
            <UniversalConverter />
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
              <Lock className="h-3.5 w-3.5" /> Supports HEIC · JPG · PNG · WEBP · AVIF ·
              GIF · BMP · SVG · PDF
            </p>
          </div>

          <div className="mt-10">
            <AnimatedStats />
          </div>
        </div>
      </section>

      {/* POPULAR CONVERSIONS */}
      <section id="converters" className="scroll-mt-20 py-14">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Popular conversions</h2>
            <p className="mt-3 text-ink-soft">
              Jump straight to the converter you need — each one runs in your browser.
            </p>
          </div>

          <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map(({ slug, gradient }) => {
              const c = getConversion(slug);
              if (!c) return null;
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className={`group flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-card-hover`}
                  >
                    <span className="text-lg font-bold">
                      {c.from.label} <span className="opacity-70">→</span> {c.to.label}
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-center">
            <a
              href="#all-converters"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
            >
              See all {conversions.length} converters
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* IMAGE TOOLS */}
      <section className="border-t border-slate-200 py-14 dark:border-slate-800">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Image tools</h2>
            <p className="mt-3 text-ink-soft">
              More than a converter — shrink an image to an exact file size, right in your browser.
            </p>
          </div>
          <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: 'compress-image-to-100kb', label: 'Compress to 100 KB' },
              { slug: 'compress-image-to-200kb', label: 'Compress to 200 KB' },
              { slug: 'compress-image-to-500kb', label: 'Compress to 500 KB' },
              { slug: 'compress-image', label: 'Compress to any size' },
            ].map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="group flex h-full items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="flex items-center gap-2 font-semibold text-ink">
                    <Minimize2 className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                    {t.label}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-1 dark:text-brand-400" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
            >
              See all image tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-ink-soft">
              Three steps, no signup, nothing uploaded.
            </p>
          </div>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                  <s.icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="absolute right-5 top-4 text-3xl font-black text-slate-100 dark:text-slate-800">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-14">
        <div className="container-page">
          <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[auto,1fr]">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card-hover">
              <ShieldCheck className="h-12 w-12" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Private by design — nothing leaves your device
              </h2>
              <p className="mt-2 text-ink-soft">
                Unlike most online converters, we never upload your images. Here’s what
                that means for you:
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {trustPoints.map((t) => (
                  <li
                    key={t.text}
                    className="flex items-start gap-2.5 text-sm text-ink-soft"
                  >
                    <t.icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT COMPARISON */}
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Image formats compared</h2>
            <p className="mt-3 text-ink-soft">
              A quick guide to the formats this tool converts, and what each is best for.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/40">
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">
                    Format
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">
                    Compression
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">
                    Transparency
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">
                    Animation
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">
                    Best for
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparableFormats.map((f) => (
                  <tr
                    key={f.id}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-left font-semibold text-ink"
                    >
                      {f.label}
                    </th>
                    <td className="px-4 py-3 text-ink-soft">
                      {f.lossy ? 'Lossy' : 'Lossless'}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">
                      {f.transparency ? 'Yes' : 'No'}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">
                      {f.animation ? 'Yes' : 'No'}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{f.typicalUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LONG-FORM CONTENT */}
      <section className="py-14">
        <div className="container-page">
          <div className="prose-page mx-auto max-w-3xl">
            <h2>Which image format should you use?</h2>
            <p>
              There’s no single “best” image format — the right choice depends on what
              you’re doing. <strong>PNG</strong> is lossless and supports transparency,
              making it ideal for screenshots, logos, graphics, and any image you’ll edit.{' '}
              <strong>JPG</strong> uses efficient lossy compression and is the universal
              choice for sharing photographs. <strong>WEBP</strong> and{' '}
              <strong>AVIF</strong> are modern web formats that produce smaller files than
              JPG or PNG at similar quality, which is why they’re increasingly used on
              fast websites. <strong>HEIC</strong> is Apple’s space-saving photo format —
              great on an iPhone, but awkward to open elsewhere, which is the most common
              reason people convert.
            </p>

            <h2>What is HEIC, and why convert it?</h2>
            <p>
              HEIC (High Efficiency Image Container) is the format iPhones and iPads have
              used by default since iOS 11. It stores a high-quality photo in roughly half
              the space of a JPEG by using HEVC compression. The trade-off is
              compatibility: many Windows programs, older apps, and web uploaders still
              can’t open a <code>.heic</code> file. Converting to PNG or JPG makes those
              photos work everywhere without any visible loss of quality. If you’d rather
              stop the format entirely, see{' '}
              <Link href="/guides/turn-off-heic-iphone">
                how to turn off HEIC on iPhone
              </Link>
              .
            </p>

            <h2>HEIC vs JPG</h2>
            <p>
              HEIC files are about half the size of an equivalent JPG and support extras
              like transparency and image sequences. JPG, on the other hand, opens in
              literally every app and device. If storage matters and you stay in Apple’s
              ecosystem, HEIC wins; if you need to share, edit, or upload a photo anywhere
              else, JPG (or PNG) is the safer choice. Our{' '}
              <Link href="/guides/heic-vs-jpg">HEIC vs JPG guide</Link> breaks it down in
              detail.
            </p>

            <h2>PNG vs JPG</h2>
            <p>
              PNG is lossless and keeps transparency, so it’s perfect for graphics, logos,
              text, and anything with sharp edges — but the files are larger. JPG discards
              a little data to produce much smaller files, which is fine for photographs
              where a tiny quality loss is invisible. A good rule of thumb: use PNG for
              graphics and JPG for photos.
            </p>

            <h2>WEBP vs PNG, and when to use AVIF</h2>
            <p>
              WEBP was designed for the web and typically produces smaller files than PNG
              while still supporting transparency, which makes it excellent for website
              images. AVIF goes a step further with even better compression and quality,
              and is now supported by every major browser. Both are great when page speed
              matters. For maximum compatibility — email attachments, older software,
              print — stick with PNG or JPG.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {homeFaqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white px-5 shadow-card dark:border-slate-800 dark:bg-slate-900 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-base font-semibold text-ink">
                  {f.question}
                  <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-ink-muted transition-transform group-open:rotate-[270deg]" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-ink-soft">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ALL CONVERTERS */}
      <section id="all-converters" className="scroll-mt-20 py-14">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">All converters</h2>
            <p className="mt-3 text-ink-soft">
              Every conversion, grouped by output format.
            </p>
          </div>
          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <div key={group.target.id}>
                <h3 className="text-lg font-semibold">Convert to {group.target.label}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card transition-shadow hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
                      >
                        <span className="font-medium text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
                          {c.from.label} to {c.to.label}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-0.5 dark:text-brand-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section className="border-t border-slate-200 py-14 dark:border-slate-800">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight">Guides &amp; how-tos</h2>
            <p className="mt-2 text-ink-soft">
              Practical help for working with image formats.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                  >
                    {guide.title}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
