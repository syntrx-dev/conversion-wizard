import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

/** Reusable call-to-action that points back to the on-page converter. */
export function ConverterCta({
  heading = 'Ready to convert your HEIC photos?',
  body = 'Open the free converter and turn your HEIC or HEIF images into PNG files right in your browser.',
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center dark:border-brand-500/30 dark:bg-brand-500/10 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-ink">{heading}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">{body}</p>
      <Link
        href="/heic-png"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
      >
        Open the converter
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Your images never leave your device
      </p>
    </div>
  );
}
