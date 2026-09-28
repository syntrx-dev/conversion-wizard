import { siteConfig } from '@/lib/config/site';
import { cn } from '@/lib/utils/cn';

/**
 * Brand logo mark — the Conversion Wizard character. It's full-colour art on a
 * transparent background that reads on both light and dark themes, so a single
 * image serves both. Aspect ratio is preserved, so size is set by the height in
 * the className (e.g. `h-8`) with `w-auto`.
 */
export function LogoMark({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-mark.png"
      alt={`${siteConfig.name} logo`}
      width={333}
      height={256}
      decoding="async"
      className={cn(className, 'block')}
    />
  );
}
