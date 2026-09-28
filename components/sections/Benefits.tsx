import { ShieldCheck, Zap, Layers, Image, Smartphone, UserX } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'No image uploads',
    body: 'Files are processed locally in your browser and are never intentionally sent to a server.',
  },
  {
    icon: Zap,
    title: 'Fast local processing',
    body: 'Conversion runs on your device with WebAssembly — no upload wait, no server queue.',
  },
  {
    icon: Layers,
    title: 'Batch conversion',
    body: 'Add up to 50 images at once and download them individually or as a single ZIP.',
  },
  {
    icon: Image,
    title: 'High-quality PNG output',
    body: 'PNG is lossless, so your converted images keep every detail of the original photo.',
  },
  {
    icon: Smartphone,
    title: 'Works across devices',
    body: 'Use it on Windows, macOS, Android, iPhone, and iPad — any modern browser works.',
  },
  {
    icon: UserX,
    title: 'No signup required',
    body: 'No account, no email, no watermark. Open the page and start converting immediately.',
  },
];

export function Benefits() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-800/40">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why use this converter</h2>
          <p className="mt-3 text-ink-soft">
            A privacy-first tool that does one job well: turning HEIC and HEIF photos into
            widely-supported PNG images.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <benefit.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
