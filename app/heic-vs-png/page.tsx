import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { comparisonRows } from '@/lib/content/comparison';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'HEIC vs PNG: Differences, Quality, and When to Convert',
  description:
    'HEIC vs PNG compared: compression, file size, transparency, quality, and compatibility — plus when it makes sense to convert HEIC to PNG.',
  path: '/heic-vs-png',
});

export default function HeicVsPngPage() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'HEIC vs PNG', path: '/heic-vs-png' },
      ]}
      title="HEIC vs PNG"
      lead="How Apple’s HEIC format compares to PNG — and how to decide when converting is worth it."
    >
      <p>
        HEIC and PNG solve different problems. HEIC is built to store high-quality photos
        in as little space as possible, which is perfect for a phone’s camera roll. PNG is
        built for perfect, lossless fidelity and universal support, which is perfect for
        sharing, editing, and the web.
      </p>

      <h2>Side-by-side comparison</h2>
      <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/40">
              <th scope="col" className="px-4 py-3 font-semibold text-ink">
                Attribute
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-ink">
                HEIC / HEIF
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-ink">
                PNG
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr
                key={row.attribute}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                <th scope="row" className="px-4 py-3 text-left font-medium text-ink-soft">
                  {row.attribute}
                </th>
                <td className="px-4 py-3 text-ink-soft">{row.heic}</td>
                <td className="px-4 py-3 text-ink-soft">{row.png}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Why is a PNG bigger than the HEIC?</h2>
      <p>
        HEIC uses efficient lossy compression, discarding data your eye is unlikely to
        notice. PNG uses lossless compression — it records every pixel exactly. As a
        result, a converted PNG can be several times larger than the original HEIC. That’s
        the price of PNG’s perfect fidelity and its ability to open anywhere.
      </p>

      <h2>When should you convert HEIC to PNG?</h2>
      <ul>
        <li>You need to open or edit the image on software that doesn’t read HEIC.</li>
        <li>You’re uploading to a website or app that only accepts common formats.</li>
        <li>You want a lossless copy for archiving or further editing.</li>
        <li>You need transparency preserved in a widely supported format.</li>
      </ul>
      <p>
        If small file size matters more than universal support (for example, keeping
        photos on your phone), HEIC is the better choice. Otherwise, converting to PNG
        with our <Link href="/heic-png">free converter</Link> is quick and private.
      </p>

      <h2>What is HEIC?</h2>
      <p>
        HEIC (High Efficiency Image Container) is Apple’s implementation of the HEIF
        standard. Inside the container, the image is compressed with the HEVC (H.265)
        codec — the same efficient compression used for 4K video — which is why a HEIC
        photo is roughly half the size of an equivalent JPEG. Beyond raw efficiency, the
        format supports higher bit-depth color, transparency, and multi-image sequences
        such as Live Photos and bursts. Apple made it the default camera format in iOS 11,
        which is why almost every recent iPhone photo is a <code>.heic</code> file.
      </p>

      <h2>What is PNG?</h2>
      <p>
        PNG (Portable Network Graphics) is a decades-old, universally supported format
        built around <strong>lossless</strong> compression. Where HEIC and JPEG throw away
        data to shrink a file, PNG records every pixel exactly. It also has first-class
        support for transparency. That combination makes PNG the go-to format for
        screenshots, logos, graphics, editing, and anywhere an image needs to open
        reliably — every browser, editor, and operating system reads PNG without any
        add-on.
      </p>

      <h2>Does converting HEIC to PNG lose quality?</h2>
      <p>
        No visible quality is lost. When a HEIC file is decoded, you get the exact pixels
        the format stored; re-encoding those pixels as PNG is lossless, so nothing further
        is discarded. The one thing that changes dramatically is file size — the PNG will
        be noticeably larger, because it isn’t using HEIC’s space-saving compression. If
        you’d prefer a smaller result, the converter offers an optional “reduce file size”
        mode that produces a compact PNG with no visible difference for most photos.
      </p>

      <h2>HEIC to PNG or HEIC to JPG?</h2>
      <p>
        PNG and JPG solve different problems. PNG is lossless and keeps transparency,
        which makes it ideal for editing, archiving, graphics, and anything with sharp
        edges or text. JPG is lossy but produces much smaller files, which is often better
        for sharing ordinary photographs where a tiny quality loss doesn’t matter. This
        tool outputs PNG; for a full breakdown of the alternative, see{' '}
        <Link href="/guides/heic-vs-jpg">HEIC vs JPG</Link>.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Is PNG better than HEIC?</h3>
      <p>
        Neither is universally “better” — they’re optimized for different goals. HEIC wins
        on file size and is great for storing photos on a phone. PNG wins on compatibility
        and lossless fidelity, which is why converting is worth it when you need to open,
        edit, or upload the image somewhere HEIC isn’t supported.
      </p>

      <h3>Why is my converted PNG so much bigger?</h3>
      <p>
        Because PNG is lossless. HEIC uses efficient lossy compression to keep files tiny,
        while PNG stores every pixel exactly. A converted PNG being several times larger
        than the original HEIC is expected and normal.
      </p>

      <h3>How do I convert HEIC to PNG?</h3>
      <p>
        Open the <Link href="/heic-png">converter</Link>, add your HEIC files, and
        download the PNGs — it runs entirely in your browser with nothing uploaded.
        Step-by-step instructions are on our{' '}
        <Link href="/how-to-convert-heic-to-png">how to convert HEIC to PNG</Link> page.
      </p>
    </ArticleShell>
  );
}
