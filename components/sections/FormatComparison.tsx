import { comparisonRows } from '@/lib/content/comparison';

export function FormatComparison() {
  return (
    <section id="heic-vs-png" className="scroll-mt-20 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">HEIC vs PNG</h2>
          <p className="mt-3 text-ink-soft">
            Both are capable image formats with different strengths. HEIC saves space; PNG
            is lossless and works everywhere.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <caption className="sr-only">
              Comparison of HEIC and PNG image formats
            </caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/40">
                <th scope="col" className="px-4 py-3 font-semibold text-ink">
                  Attribute
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">
                  HEIC / HEIF
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">
                  PNG
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.attribute}
                  className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 text-left font-medium text-ink-soft"
                  >
                    {row.attribute}
                  </th>
                  <td className="px-4 py-3 text-ink-soft">{row.heic}</td>
                  <td className="px-4 py-3 text-ink-soft">{row.png}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-ink-muted">
          Note: PNG files are often several times larger than the original HEIC because
          PNG uses lossless compression — it stores every pixel exactly instead of
          discarding data the way HEIC’s efficient compression does.
        </p>
      </div>
    </section>
  );
}
