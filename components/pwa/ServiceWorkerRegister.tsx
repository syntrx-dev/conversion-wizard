'use client';

import { useEffect } from 'react';

/**
 * Registers the offline service worker in production only. Kept out of dev to
 * avoid caching getting in the way of hot reloads.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* Registration failure is non-fatal — the app still works online. */
      });
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return null;
}
