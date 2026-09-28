/**
 * Run async tasks over a list of items with a bounded number of workers, so a
 * large batch never launches hundreds of simultaneous conversions (which would
 * freeze the tab or exhaust memory). Tasks start in order; results are ignored
 * here because each task reports its own progress via side effects.
 */
export async function runWithConcurrency<T>(
  items: T[],
  worker: (item: T, index: number) => Promise<void>,
  limit: number,
): Promise<void> {
  const safeLimit = Math.max(1, Math.floor(limit));
  let cursor = 0;

  async function runNext(): Promise<void> {
    const index = cursor;
    cursor += 1;
    if (index >= items.length) return;
    try {
      await worker(items[index], index);
    } finally {
      // Yield to the event loop between items so the UI can paint/respond.
      await new Promise((resolve) => setTimeout(resolve, 0));
      await runNext();
    }
  }

  const runners = Array.from({ length: Math.min(safeLimit, items.length) }, () =>
    runNext(),
  );
  await Promise.all(runners);
}
