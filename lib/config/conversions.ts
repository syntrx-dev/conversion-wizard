import { formats, type FormatMeta } from './formats';

/**
 * The converter registry. Each entry becomes a static page at /{slug}
 * (e.g. /heic-png) with its own configured converter and SEO copy. Adding a
 * new converter is a single line in `pairs` below.
 */
export interface Conversion {
  slug: string;
  from: FormatMeta;
  to: FormatMeta;
  /** "HEIC to PNG" */
  name: string;
  /** SEO <title> */
  title: string;
  /** Meta description */
  description: string;
  /** Intro paragraph shown under the H1. */
  lead: string;
}

// [fromId, toId] — order matters (direction). Targets must be encodable (png/jpg/webp).
const pairs: [string, string][] = [
  ['heic', 'png'],
  ['heic', 'jpg'],
  ['heic', 'webp'],
  ['heif', 'png'],
  ['heif', 'jpg'],
  ['jpg', 'png'],
  ['png', 'jpg'],
  ['jpg', 'webp'],
  ['png', 'webp'],
  ['webp', 'png'],
  ['webp', 'jpg'],
  ['avif', 'png'],
  ['avif', 'jpg'],
  ['gif', 'png'],
  ['bmp', 'png'],
  ['svg', 'png'],
  ['svg', 'jpg'],
  ['pdf', 'png'],
  ['pdf', 'jpg'],
];

function buildConversion(fromId: string, toId: string): Conversion {
  const from = formats[fromId];
  const to = formats[toId];
  const name = `${from.label} to ${to.label}`;
  const slug = `${from.id}-${to.id}`;

  const title = `Convert ${name} Online – Free & Private`;
  const description =
    `Convert ${from.label} to ${to.label} online for free. Fast, private, in-browser ` +
    `conversion — your files never leave your device. Batch convert and download as a ZIP.`;

  const lead =
    `Convert ${from.label} files to ${to.label} directly in your browser. ` +
    `Fast, private, and free — nothing is uploaded to a server.`;

  return { slug, from, to, name, title, description, lead };
}

export const conversions: Conversion[] = pairs.map(([f, t]) => buildConversion(f, t));

export function getConversion(slug: string): Conversion | undefined {
  return conversions.find((c) => c.slug === slug);
}

/** Group conversions by target format, for the homepage hub. */
export function conversionsByTarget(): { target: FormatMeta; items: Conversion[] }[] {
  const order = ['png', 'jpg', 'webp'];
  return order
    .map((tid) => ({
      target: formats[tid],
      items: conversions.filter((c) => c.to.id === tid),
    }))
    .filter((g) => g.items.length > 0);
}
