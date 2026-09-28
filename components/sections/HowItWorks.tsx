import { Upload, Cpu, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload your HEIC images',
    body: 'Drag and drop or browse to add one or many .heic or .heif files. Nothing is sent anywhere — the files stay on your device.',
  },
  {
    icon: Cpu,
    title: 'Convert securely in your browser',
    body: 'Your device decodes each image with WebAssembly and re-encodes it as a PNG. No servers, no accounts, no waiting in a queue.',
  },
  {
    icon: Download,
    title: 'Download high-quality PNG files',
    body: 'Preview the results and download each PNG, or grab everything at once as a single ZIP archive.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-ink-soft">
            HEIC is the space-saving photo format used by Apple devices. PNG is supported
            everywhere — by browsers, editors, and websites. Converting takes three steps.
          </p>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                <step.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="absolute right-5 top-5 text-2xl font-bold text-slate-100 dark:text-slate-800">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
