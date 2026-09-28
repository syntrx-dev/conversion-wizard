import { Lock } from 'lucide-react';

/** Compact reassurance shown next to the uploader. */
export function PrivacyNotice() {
  return (
    <p className="inline-flex items-center justify-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
      <Lock className="h-4 w-4" aria-hidden="true" />
      Your images never leave your device.
    </p>
  );
}
