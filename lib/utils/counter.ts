/**
 * Client helpers for the global conversion counter (backed by /counter.php).
 *
 * Increments are buffered and flushed together, so converting a batch of files
 * results in a single request rather than one per file. Everything is
 * best-effort and fails silently — the counter is a nice-to-have and must never
 * affect the conversion flow. Only a count is sent; never any image data.
 */

const ENDPOINT = '/counter.php';

let pending = 0;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  flushTimer = null;
  const n = pending;
  pending = 0;
  if (n <= 0) return;
  try {
    void fetch(`${ENDPOINT}?n=${n}`, { method: 'POST', keepalive: true }).catch(() => {});
  } catch {
    /* ignore */
  }
}

/** Record that `n` conversions succeeded. Buffered, best-effort. */
export function recordConversions(n = 1): void {
  if (typeof window === 'undefined' || n <= 0) return;
  pending += n;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, 1200);
}

/** Read the current global total. Returns null if unavailable. */
export async function getConversionTotal(): Promise<number | null> {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch(ENDPOINT, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = (await res.json()) as { total?: unknown };
    return typeof data.total === 'number' ? data.total : null;
  } catch {
    return null;
  }
}
