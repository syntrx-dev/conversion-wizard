import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy',
  description:
    'How the HEIC to PNG converter handles your images: all conversion happens locally in your browser and your photos are never intentionally uploaded or stored.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Privacy', path: '/privacy' },
      ]}
      title="Privacy"
      lead="This tool is built to be private by design. Here’s exactly what happens to your images and data."
      ctaHeading="Convert with confidence"
      ctaBody="Your photos are processed on your device and never intentionally leave it."
    >
      <h2>Conversion happens in your browser</h2>
      <p>
        Every HEIC and HEIF image you add is decoded and re-encoded entirely on your own
        device using WebAssembly running in your browser. The conversion does not require
        a server round-trip, and your images are{' '}
        <strong>not intentionally transmitted to or stored on any server</strong>.
      </p>

      <h2>What we don’t do</h2>
      <ul>
        <li>We don’t upload your images to a backend for processing.</li>
        <li>We don’t require an account, email address, or any sign-up.</li>
        <li>
          We don’t store your files — they live only in your browser’s memory while you
          use the tool, and are released when you remove them or close the tab.
        </li>
        <li>We don’t log your filenames or image contents.</li>
      </ul>

      <h2>Analytics</h2>
      <p>
        {siteConfig.name} uses <strong>no tracking analytics</strong> and sets no tracking
        cookies. If a privacy-friendly, cookieless analytics tool is ever added, this page
        will be updated to say so clearly. We will never claim that zero data is collected
        if analytics have been enabled.
      </p>

      <h2>Conversion counter</h2>
      <p>
        We keep a single anonymous tally of the total number of conversions performed
        across all visitors — the “images converted” figure shown on the site. When a
        conversion finishes, your browser sends a request that increases that number by
        one; it contains <strong>only the count</strong>. No image data, filenames,
        dimensions, or personal information is included, and the tally is a single global
        number that can’t be tied back to you. You can see this yourself in your browser’s
        network tools.
      </p>

      <h2>Hosting and network requests</h2>
      <p>
        The site is served as static assets. Loading the page and the conversion library
        involves standard web requests to the host, which may process basic technical
        information (such as your IP address and user agent) as part of normal web
        serving. This is inherent to how the web works and is separate from your image
        data, which stays on your device.
      </p>

      <h2>A note on shared devices</h2>
      <p>
        Although your images are not uploaded, converted files remain accessible in the
        current browser session until you remove them or close the tab. On a shared or
        public device, clear the queue and avoid processing sensitive images to be safe.
      </p>

      <h2>Questions</h2>
      <p>
        This page describes the default behavior of the open, browser-based converter. If
        you host your own copy, review your hosting provider’s policies as well. Return to
        the <Link href="/">converter</Link> whenever you’re ready.
      </p>
    </ArticleShell>
  );
}
