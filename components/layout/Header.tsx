'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { LogoMark } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { siteConfig } from '@/lib/config/site';
import { cn } from '@/lib/utils/cn';

const navLinks = [
  { label: 'Converters', href: '/#converters' },
  { label: 'Tools', href: '/tools' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg py-1 font-semibold text-ink"
          onClick={() => setOpen(false)}
        >
          <LogoMark />
          <span className="text-lg tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-slate-100 hover:text-ink dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            100% Browser-Based
          </span>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-ink-soft hover:bg-slate-100 hover:text-ink dark:hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            100% Browser-Based
          </span>
        </nav>
      </div>
    </header>
  );
}
