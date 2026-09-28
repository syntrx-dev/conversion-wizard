import Link from 'next/link';
import { LogoMark } from './Logo';
import { siteConfig } from '@/lib/config/site';

const footerLinks = [
  { label: 'HEIC to PNG', href: '/heic-png' },
  { label: 'JPG to PNG', href: '/jpg-png' },
  { label: 'PNG to JPG', href: '/png-jpg' },
  { label: 'WEBP to PNG', href: '/webp-png' },
  { label: 'All converters', href: '/#converters' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="container-page py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-ink">
              <LogoMark className="h-7 w-auto" />
              <span className="text-base tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              A free, private HEIC and HEIF to PNG converter. All conversion happens
              locally in your browser — your images never leave your device.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-2"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-soft transition-colors hover:text-brand-700 dark:hover:text-brand-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-ink-muted dark:border-slate-800">
          <p>
            Not affiliated with Apple Inc. HEIC and HEIF are formats defined by
            MPEG/Apple.
          </p>
        </div>
      </div>
    </footer>
  );
}
