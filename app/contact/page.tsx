import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with the team behind HEIC to PNG. Questions, bug reports, feedback, and feature requests are welcome.',
  path: '/contact',
});

const email = 'syntraxstudios@proton.me';

export default function ContactPage() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]}
      title="Contact us"
      lead="Questions, bug reports, feedback, or feature ideas — we read every message and are happy to help."
    >
      <h2>Email</h2>
      <p>
        The best way to reach {siteConfig.name} (built by Syntrx Studios, LLC) is by
        email. We aim to reply within a couple of business days.
      </p>
      <p>
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2">
          <Mail className="h-4 w-4" aria-hidden="true" />
          {email}
        </a>
      </p>

      <h2>What to include</h2>
      <p>To help us respond quickly, it’s useful to mention:</p>
      <ul>
        <li>
          Your device and browser (for example, “iPhone 14, Safari” or “Windows 11,
          Chrome”).
        </li>
        <li>What you were trying to do and what happened instead.</li>
        <li>
          For a file that wouldn’t convert, how the photo was created (straight from an
          iPhone camera, exported from an app, downloaded, etc.). Please don’t send us the
          image itself unless we ask — we don’t need your personal photos to help.
        </li>
      </ul>

      <h2>Common questions</h2>
      <p>
        Many questions are already answered elsewhere on the site. Before writing in, you
        might find what you need in the <Link href="/#faq">FAQ</Link>, the{' '}
        <Link href="/guides">guides</Link>, or the{' '}
        <Link href="/privacy">privacy page</Link>. If a file fails to convert, our guide
        on <Link href="/guides/heic-wont-open">why HEIC files won’t open</Link> covers the
        usual causes and fixes.
      </p>

      <h2>Privacy</h2>
      <p>
        Anything you email us stays between us — we don’t sell or share it. And as a
        reminder, the converter itself never uploads your images; conversion happens
        entirely in your browser. Ready to convert? Head back to the{' '}
        <Link href="/heic-png">converter</Link>.
      </p>
    </ArticleShell>
  );
}
