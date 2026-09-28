/**
 * Central site configuration.
 *
 * Change the values here (or via the NEXT_PUBLIC_SITE_URL env var) to rebrand
 * the site or point it at a different domain. Every page's <title>, meta tags,
 * canonical URLs, sitemap and structured data read from this file.
 */

// Flagship domain. heic-png.com now 301-redirects here.
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://conversion-wizard.net';

export const siteConfig = {
  /** Product / brand name shown in the header and titles. */
  name: 'Conversion Wizard',
  /** Short tagline used in a few places. */
  tagline: 'Free, private image conversion in your browser',
  /** Canonical origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  url: rawSiteUrl,
  /** Default meta description for the homepage. */
  description:
    'Convert images between HEIC, JPG, PNG, WEBP, AVIF and more — free and entirely in your browser. Your files never leave your device.',
  /** Used for Open Graph og:site_name and the copyright line. */
  organization: 'Conversion Wizard',
  /** Twitter/X handle (without @) — leave empty to omit the tag. */
  twitter: '',
  /** Locale for Open Graph. */
  locale: 'en_US',
  /**
   * Google AdSense publisher id (ca-pub-…). Loads the AdSense script and the
   * ownership meta tag. Must also match the `pub-…` line in `public/ads.txt`.
   * Leave empty to disable AdSense entirely.
   */
  adsensePublisherId: 'ca-pub-4741388559681403',
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Build an absolute URL from a site-relative path.
 *
 * The site is exported with `trailingSlash: true` and served by Apache, so page
 * URLs must end in a slash (e.g. `/heic-to-png/`) to match what the server
 * serves and avoid a 301. Asset URLs (anything whose last segment has a file
 * extension, like `/og.png`) are left untouched.
 */
export function absoluteUrl(path = ''): string {
  let clean = path.startsWith('/') ? path : `/${path}`;
  if (clean === '/' || clean === '') return `${siteConfig.url}/`;
  const lastSegment = clean.split('/').pop() ?? '';
  const isFile = lastSegment.includes('.');
  if (!isFile && !clean.endsWith('/')) clean = `${clean}/`;
  return `${siteConfig.url}${clean}`;
}
