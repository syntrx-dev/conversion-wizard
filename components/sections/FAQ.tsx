import { ChevronDown } from 'lucide-react';
import { faqEntries } from '@/lib/content/faq';

/**
 * Accessible FAQ accordion built on native <details>/<summary>. This gives us
 * keyboard support, screen-reader semantics, and works without JavaScript.
 */
export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-slate-50 py-16 dark:bg-slate-800/40">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-ink-soft">
            Everything you might want to know about converting HEIC and HEIF images to
            PNG.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {faqEntries.map((entry) => (
            <details
              key={entry.question}
              className="group rounded-xl border border-slate-200 bg-white px-5 shadow-card dark:border-slate-800 dark:bg-slate-900 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-semibold text-ink">
                {entry.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-ink-soft">{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
