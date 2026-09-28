'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

/** Read the theme currently applied to <html> (set by the no-flash script). */
function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Light/dark toggle. The applied theme is decided before paint by an inline
 * script in <head> (defaulting to dark, or a remembered choice). This button
 * just flips and persists it. Renders a stable placeholder until mounted to
 * avoid a hydration mismatch on the icon.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(currentTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label={
        mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'
      }
      title={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : undefined}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )
      ) : (
        <span className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
