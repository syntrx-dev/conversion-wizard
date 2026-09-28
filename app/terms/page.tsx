import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description:
    'The terms of use for HEIC to PNG — a free, in-browser image converter provided as-is by Syntrx Studios, LLC.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Terms of Use', path: '/terms' },
      ]}
      title="Terms of Use"
      lead="The simple terms under which HEIC to PNG is provided. By using the site you agree to what’s below."
    >
      <h2>Acceptance</h2>
      <p>
        {siteConfig.name} (“the Service”) is operated by Syntrx Studios, LLC. By accessing
        or using the Service you agree to these Terms of Use. If you don’t agree, please
        don’t use the Service.
      </p>

      <h2>What the Service does</h2>
      <p>
        The Service converts HEIC and HEIF images to PNG entirely within your web browser.
        Files are processed on your own device and are not uploaded to our servers. See
        the <Link href="/privacy">privacy page</Link> for details on how data is (and
        isn’t) handled.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Only convert images you own or have the right to convert.</li>
        <li>
          Don’t use the Service for anything unlawful, or attempt to disrupt, overload, or
          reverse-engineer it in a way that harms other users or the site.
        </li>
        <li>
          The Service is intended for ordinary personal and professional image conversion.
        </li>
      </ul>

      <h2>“As is” — no warranty</h2>
      <p>
        The Service is provided free of charge, “as is” and “as available,” without
        warranties of any kind, express or implied, including fitness for a particular
        purpose. Image conversion depends on your browser and device, and some unusual
        HEIC variants may not convert successfully. We don’t guarantee the Service will be
        uninterrupted, error-free, or that a given file will convert.
      </p>

      <h2>Your files are your responsibility</h2>
      <p>
        Because conversion happens on your device, you are responsible for keeping copies
        of your original images. Always retain your originals until you’ve confirmed the
        converted files meet your needs.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Syntrx Studios, LLC is not liable for any
        indirect, incidental, or consequential damages, or for any loss of data or images,
        arising from your use of the Service.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Service’s design, code, and branding belong to Syntrx Studios, LLC. Trademarks
        such as “HEIC,” “HEIF,” and “Apple” belong to their respective owners; this
        Service is not affiliated with or endorsed by Apple Inc.
      </p>

      <h2>Advertising</h2>
      <p>
        The Service may display third-party advertisements (for example, via Google
        AdSense) to keep it free. Those ads are served by third parties who may use
        cookies or similar technologies; their use of information is governed by their own
        policies.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Service after an
        update means you accept the revised Terms. Questions? Reach us via the{' '}
        <Link href="/contact">contact page</Link>.
      </p>
    </ArticleShell>
  );
}
