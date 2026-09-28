/**
 * Canonical list of long-form guide articles under /guides. Used by the guides
 * hub page, the sitemap, and internal-link sections so they never drift.
 */
export interface GuideEntry {
  slug: string;
  title: string;
  description: string;
}

/**
 * Guides that are close to page 1 and worth funnelling internal links toward
 * (data-driven — these rank best / have the most demand). They're prioritised
 * in every article's "Related guides" block so they accrue internal anchors.
 */
const PRIORITY_SLUGS = [
  'facebook-image-too-large',
  'best-image-format-for-web',
  'reduce-image-size-for-online-forms',
  'reduce-photo-size-for-email',
];

const THEME_KEYWORDS: Record<string, string[]> = {
  size: [
    'compress', 'reduce', 'smaller', 'size', 'too-large', 'too large', 'email',
    'forms', 'whatsapp', 'discord', 'wordpress', '1mb', 'facebook', 'shrink',
  ],
  heic: ['heic', 'heif', 'iphone', 'android', 'safe', 'uploading', 'windows'],
  format: ['format', 'svg', 'pdf', 'shopify', 'web', 'webp', 'avif'],
};

function themeOf(g: GuideEntry): string {
  const s = `${g.slug} ${g.title}`.toLowerCase();
  let best = 'size';
  let bestN = -1;
  for (const [theme, kw] of Object.entries(THEME_KEYWORDS)) {
    const n = kw.filter((k) => s.includes(k)).length;
    if (n > bestN) {
      bestN = n;
      best = theme;
    }
  }
  return best;
}

/**
 * Pick `n` guides related to `currentSlug`: same-theme siblings first (so the
 * link is genuinely relevant), then the priority near-winners, then the rest.
 * Passing an unknown/empty slug (e.g. a non-guide page) surfaces the priority
 * set. Drives the "Related guides" block that spreads internal links.
 */
export function relatedGuides(currentSlug: string, n = 4): GuideEntry[] {
  const current = guides.find((g) => g.slug === currentSlug);
  const theme = current ? themeOf(current) : null;
  const pool = guides.filter((g) => g.slug !== currentSlug);
  const same = theme ? pool.filter((g) => themeOf(g) === theme) : [];
  const priority = PRIORITY_SLUGS.map((s) => pool.find((g) => g.slug === s)).filter(
    (g): g is GuideEntry => !!g && !same.includes(g),
  );
  const rest = pool.filter((g) => !same.includes(g) && !priority.includes(g));
  const ordered = [...same, ...priority, ...rest];
  const seen = new Set<string>();
  const out: GuideEntry[] = [];
  for (const g of ordered) {
    if (!seen.has(g.slug)) {
      seen.add(g.slug);
      out.push(g);
    }
  }
  return out.slice(0, n);
}

export const guides: GuideEntry[] = [
  {
    slug: 'open-heic-on-windows',
    title: 'How to Open HEIC Files on Windows 10 & 11',
    description:
      'Install the right codecs, view HEIC in the Photos app, and the fastest no-install way to open them.',
  },
  {
    slug: 'heic-wont-open',
    title: 'HEIC Files Won’t Open? How to Fix It',
    description:
      'The common reasons a HEIC file won’t open on any device — and a reliable fix for each one.',
  },
  {
    slug: 'heic-vs-jpg',
    title: 'HEIC vs JPG: Which Should You Use?',
    description:
      'Compression, quality, file size, and compatibility compared — and when it’s worth converting.',
  },
  {
    slug: 'turn-off-heic-iphone',
    title: 'How to Turn Off HEIC on iPhone',
    description:
      'Make your iPhone shoot JPG instead of HEIC, and control how photos transfer to a computer.',
  },
  {
    slug: 'heic-on-android',
    title: 'HEIC on Android: View & Convert',
    description:
      'Why HEIC support varies on Android, how to view the files, and how to convert them on your phone.',
  },
  {
    slug: 'is-it-safe-to-convert-heic-online',
    title: 'Is It Safe to Convert HEIC Online?',
    description:
      'The privacy risks of online converters and how to tell whether your photos stay on your device.',
  },
  {
    slug: 'convert-pdf-to-image',
    title: 'How to Convert a PDF to an Image (PNG or JPG)',
    description:
      'Turn a PDF page into a PNG, JPG, or WEBP image right in your browser — how it works, when to pick PNG over JPG, resolution tips, and why nothing is uploaded.',
  },
  {
    slug: 'convert-svg-to-png',
    title: 'SVG to PNG: How to Rasterize Vector Graphics the Right Way',
    description:
      'Convert SVG to PNG the right way: understand vector vs raster, why output resolution matters, how to keep transparency, file-size trade-offs, and when to keep the SVG.',
  },
  {
    slug: 'best-image-format-for-web',
    title: 'Best Image Format for the Web: WEBP vs AVIF vs PNG vs JPG',
    description:
      'A practical guide to choosing image formats for websites — WEBP, AVIF, PNG, and JPG compared on file size, quality, and browser support, with clear per-use picks.',
  },
  {
    slug: 'convert-images-without-uploading',
    title: 'How to Convert Images Without Uploading Them',
    description:
      'How client-side, in-browser conversion works, why it protects your privacy, and how to verify a tool runs locally instead of uploading your files.',
  },
  {
    slug: 'facebook-image-too-large',
    title: 'Facebook Says Your Photo Is Too Large? How to Fix It',
    description:
      'Facebook accepts photos up to about 30 MB but re-compresses everything. Here is why huge files fail or look worse, and how to compress before uploading.',
  },
  {
    slug: 'upload-iphone-photos-to-windows',
    title: 'How to Upload iPhone Photos to Windows (and Fix the HEIC Problem)',
    description:
      'Get iPhone photos onto a Windows PC by USB, iCloud, or Google Photos, then fix the HEIC snag by switching to Most Compatible and converting existing files to JPG.',
  },
  {
    slug: 'best-image-format-for-shopify',
    title: 'Best Image Format for Shopify Product Photos',
    description:
      'What format to use for Shopify product photos: how Shopify auto-serves WebP, its real size limits, and whether to upload JPG, PNG, or WebP.',
  },
  {
    slug: 'reduce-photo-size-for-email',
    title: 'How to Reduce Photo File Size for Email',
    description:
      'Email photos bouncing back as too large? Here are the real limits (Gmail 25 MB, Outlook ~20 MB) and how to compress a batch to a few hundred KB each.',
  },
  {
    slug: 'reduce-image-size-for-online-forms',
    title: 'How to Reduce an Image’s File Size for Online Forms & Job Applications',
    description:
      'Upload forms that reject your photo for being too big? Compress it to the exact limit the form states — 1 MB, 500 KB, or 200 KB — right in your browser.',
  },
  {
    slug: 'make-image-smaller-without-losing-quality',
    title: 'How to Make an Image Smaller Without Losing Quality',
    description:
      'Shrink image file size the honest way: smarter compression and right-sizing dimensions can cut size in half with no visible loss. Learn the limits, then do it here.',
  },
  {
    slug: 'whatsapp-photo-wont-send',
    title: "WhatsApp Won't Send Your Photo? Here's How to Fix It",
    description:
      'WhatsApp compresses normal photos automatically, so "too large" is rarely the issue. Here is what actually causes stuck sends and how to fix them fast.',
  },
  {
    slug: 'compress-images-for-wordpress',
    title: "How to Compress Images for WordPress (Fix 'Exceeds Maximum Upload Size')",
    description:
      "WordPress rejects uploads over your host's max upload size. Here is why it happens, how to check your own limit, and how to compress images before uploading.",
  },
  {
    slug: 'compress-photo-to-under-1mb',
    title: 'How to Compress a Photo to Under 1MB',
    description:
      'A 1 MB limit shows up on upload forms, email, and marketplace listings. Here is why phone photos are so big and how to compress one under 1 MB while it still looks great.',
  },
  {
    slug: 'discord-image-too-large',
    title: `Discord: "Your Files Are Too Powerful" — How to Fix an Image That's Too Large`,
    description:
      "Discord caps free uploads at 10 MB per file (Nitro raises it). Here's why an image trips the too-powerful error and how to compress it under the limit.",
  },
  {
    slug: 'reduce-photo-file-size-on-iphone',
    title: "How to Reduce a Photo's File Size on iPhone",
    description:
      'iPhone photos are big and hard to shrink. Here is why, what iOS can and cannot do, and how to compress a photo to a target size right in Safari.',
  },
];
