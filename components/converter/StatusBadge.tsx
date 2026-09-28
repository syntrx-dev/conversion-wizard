import { Clock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ConversionStatus } from '@/lib/conversion/types';
import { cn } from '@/lib/utils/cn';

const config: Record<
  ConversionStatus,
  { label: string; className: string; icon: typeof Clock; spin?: boolean }
> = {
  waiting: {
    label: 'Waiting',
    className: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
    icon: Clock,
  },
  converting: {
    label: 'Converting',
    className: 'bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300',
    icon: Loader2,
    spin: true,
  },
  complete: {
    label: 'Complete',
    className:
      'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
    icon: CheckCircle2,
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400',
    icon: AlertCircle,
  },
};

export function StatusBadge({ status }: { status: ConversionStatus }) {
  const { label, className, icon: Icon, spin } = config[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        className,
      )}
    >
      <Icon className={cn('h-3.5 w-3.5', spin && 'animate-spin')} aria-hidden="true" />
      {label}
    </span>
  );
}
