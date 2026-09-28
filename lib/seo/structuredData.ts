import { siteConfig, absoluteUrl } from '@/lib/config/site';

/**
 * JSON-LD structured data builders. These help search engines render rich
 * results (FAQ accordions, app cards, breadcrumbs). All URLs derive from the
 * central site config.
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export function webApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires a modern browser with WebAssembly support.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Convert between HEIC, JPG, PNG, WEBP, AVIF, GIF and BMP',
      'Runs entirely in the browser — no uploads',
      'Batch conversion of multiple images',
      'Download all images as a ZIP',
      'Free with no signup',
    ],
  };
}

export function faqSchema(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization,
    url: siteConfig.url,
  };
}
