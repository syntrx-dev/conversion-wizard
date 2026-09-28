import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'About HEIC to PNG',
  description:
    'About HEIC to PNG — a free, privacy-first image converter that turns HEIC and HEIF photos into PNG entirely in your browser. Learn who makes it and how it works.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]}
      title="About HEIC to PNG"
      lead="A free, privacy-first tool that converts Apple’s HEIC and HEIF photos into universally supported PNG images — without ever uploading your files."
    >
      <h2>What this site is</h2>
      <p>
        {siteConfig.name} is a free online converter for HEIC and HEIF images. Apple
        devices save photos in HEIC by default because it stores high-quality images in
        about half the space of a JPEG. The trade-off is compatibility: plenty of apps,
        websites, and Windows programs still can’t open a <code>.heic</code> file. This
        tool bridges that gap by turning those photos into PNG, a format that opens
        everywhere and preserves every pixel.
      </p>

      <h2>Why we built it</h2>
      <p>
        Most “convert HEIC online” tools work by uploading your photos to a server,
        running the conversion there, and sending the result back. That’s fine for a meme,
        but it’s the wrong model for personal photos — the images leave your device and
        you have to trust a stranger’s server with them. We wanted a converter that does
        the job without that trade-off, so we built one that runs entirely inside your
        browser.
      </p>

      <h2>How it works</h2>
      <p>
        When you add a file, your browser decodes the HEIC image using a WebAssembly build
        of libheif — the same open-source library behind many native HEIC viewers — and
        re-encodes it as a PNG using the browser’s own canvas. All of that happens locally
        on your device. Your images are never intentionally transmitted to or stored on a
        server. You can read the specifics on our{' '}
        <Link href="/privacy">privacy page</Link>.
      </p>
      <p>
        Because the work is local, the tool is fast (no upload wait), works offline once
        loaded, and handles batches — convert many photos at once and download them
        individually or as a single ZIP.
      </p>

      <h2>What it does well — and its limits</h2>
      <ul>
        <li>
          Converts <code>.heic</code> and <code>.heif</code> images to lossless PNG.
        </li>
        <li>Runs on Windows, macOS, Android, iPhone, and iPad in a modern browser.</li>
        <li>Keeps transparency and lets you optionally reduce the output file size.</li>
        <li>
          Some unusual HEIC variants (certain depth maps or image sequences) may not be
          decodable in the browser; when that happens you’ll see a clear error, not a
          silent failure.
        </li>
      </ul>

      <h2>Who makes it</h2>
      <p>
        {siteConfig.name} is built and maintained by Syntrx Studios, LLC. We build small,
        focused web tools that respect the people who use them. If you have a question, a
        bug report, or a feature request, we’d genuinely like to hear it — reach us on the{' '}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2>Learn more</h2>
      <p>
        New to the format? Start with <Link href="/heic-vs-png">HEIC vs PNG</Link> or our{' '}
        <Link href="/guides">guides</Link>, which cover opening HEIC on Windows, fixing
        files that won’t open, and turning off HEIC capture on an iPhone. Or just head to
        the <Link href="/heic-png">converter</Link> and try it.
      </p>
    </ArticleShell>
  );
}
