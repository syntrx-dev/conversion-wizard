/**
 * Task-specific image tools ("Compress to 100 KB", "Resize for Instagram", …).
 * Each entry becomes a static landing page at /{slug}, served by the shared
 * `app/[slug]` route alongside the format-conversion pages.
 *
 * This registry is intentionally broader than what's implemented today: the
 * `kind` drives which client tool renders. Only kinds with a built runner are
 * listed in `tools` below — we never ship a landing page for a tool that can't
 * actually do the job in the browser.
 */
export type ToolKind = 'compress' | 'resize' | 'strip-metadata' | 'dpi';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface Tool {
  slug: string;
  kind: ToolKind;
  /** Grouping for the tools hub and homepage. */
  category: 'Compress' | 'Resize' | 'Optimize';
  /** Short name for cards and nav, e.g. "Compress to 100 KB". */
  name: string;
  /** Page H1. */
  h1: string;
  /** SEO <title>. */
  title: string;
  /** Meta description. */
  description: string;
  /** Intro sentence under the H1. */
  lead: string;
  /** Tool parameters (meaning depends on `kind`). */
  params: {
    /** compress: target size in kilobytes. Omit for a user-chosen target. */
    targetKB?: number;
    /** resize: target dimensions. */
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain';
    /** dpi: density to stamp. */
    dpi?: number;
  };
}

const compress = (targetKB: number): Tool => ({
  slug: `compress-image-to-${targetKB}kb`,
  kind: 'compress',
  category: 'Compress',
  name: `Compress to ${targetKB} KB`,
  h1: `Compress Image to ${targetKB} KB`,
  title: `Compress Image to ${targetKB}KB Online — Free & Private`,
  description:
    `Compress JPG, PNG, WEBP, HEIC and more to ${targetKB} KB or less, free and right in your ` +
    `browser. No uploads, no signup — your images never leave your device.`,
  lead:
    `Shrink any image to ${targetKB} KB or under, directly in your browser. Pick your files ` +
    `and the tool finds the highest quality that fits the size — nothing is uploaded.`,
  params: { targetKB },
});

export const tools: Tool[] = [
  compress(50),
  compress(100),
  compress(200),
  compress(500),
  {
    slug: 'compress-image',
    kind: 'compress',
    category: 'Compress',
    name: 'Compress Image',
    h1: 'Compress Image to a Target Size',
    title: 'Compress Image to a Target File Size — Free & Private',
    description:
      'Compress JPG, PNG, WEBP, HEIC and more to any target file size — 100 KB, 500 KB, 1 MB, ' +
      'or your own number — free and entirely in your browser. Nothing is uploaded.',
    lead:
      'Choose a target file size and shrink any image to fit, right in your browser. The tool ' +
      'finds the highest quality that lands under your target — no uploads, no signup.',
    params: {},
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

/** Tools grouped by category, for the hub and homepage. */
export function toolsByCategory(): { category: Tool['category']; items: Tool[] }[] {
  const order: Tool['category'][] = ['Compress', 'Resize', 'Optimize'];
  return order
    .map((category) => ({ category, items: tools.filter((t) => t.category === category) }))
    .filter((g) => g.items.length > 0);
}
