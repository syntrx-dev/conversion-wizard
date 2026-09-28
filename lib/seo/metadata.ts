import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/config/site';

interface PageMetaInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/heic-vs-png". Used for the canonical URL. */
  path: string;
  /** Override the OG image path; defaults to the site OG image. */
  ogImage?: string;
}

/**
 * Build a consistent Next.js Metadata object for a page. Every page gets a
 * canonical URL, Open Graph and Twitter cards derived from the central site
 * config, so rebranding/redomaining only touches `lib/config/site.ts`.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = '/og.png',
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = path === '/' ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.organization,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(ogImage)],
      ...(siteConfig.twitter ? { creator: `@${siteConfig.twitter}` } : {}),
    },
  };
}
