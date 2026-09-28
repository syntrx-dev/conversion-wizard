import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/config/site';
import { guides } from '@/lib/content/guides';
import { conversions } from '@/lib/config/conversions';
import { tools } from '@/lib/config/tools';

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = 'force-static';

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  // Converter pages
  ...conversions.map((c) => ({
    path: `/${c.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  })),
  // Task-specific tools (compress, resize, …)
  { path: '/tools', priority: 0.8, changeFrequency: 'monthly' as const },
  ...tools.map((t) => ({
    path: `/${t.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  })),
  // Informational pages
  {
    path: '/how-to-convert-heic-to-png',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  { path: '/heic-vs-png', priority: 0.7, changeFrequency: 'monthly' as const },
  {
    path: '/convert-iphone-photos-to-png',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  { path: '/guides', priority: 0.7, changeFrequency: 'monthly' as const },
  ...guides.map((guide) => ({
    path: `/guides/${guide.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  })),
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
