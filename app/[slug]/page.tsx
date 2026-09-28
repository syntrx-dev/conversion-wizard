import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { conversions, getConversion } from '@/lib/config/conversions';
import { tools, getTool } from '@/lib/config/tools';
import { ConverterLanding } from '@/components/converter/ConverterLanding';
import { ToolLanding } from '@/components/tools/ToolLanding';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Single root route that serves BOTH format-conversion pages (e.g. /heic-png)
 * and task-specific tool pages (e.g. /compress-image-to-100kb). Both are keyed
 * by a unique top-level slug, so one dynamic segment handles the whole network.
 */
export function generateStaticParams() {
  return [
    ...conversions.map((c) => ({ slug: c.slug })),
    ...tools.map((t) => ({ slug: t.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getConversion(slug);
  if (c) return buildMetadata({ title: c.title, description: c.description, path: `/${c.slug}` });
  const t = getTool(slug);
  if (t) return buildMetadata({ title: t.title, description: t.description, path: `/${t.slug}` });
  return {};
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const c = getConversion(slug);
  if (c) return <ConverterLanding c={c} />;

  const t = getTool(slug);
  if (t) return <ToolLanding tool={t} />;

  notFound();
}
