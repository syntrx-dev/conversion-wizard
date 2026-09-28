/** Format a byte count as a human-readable string, e.g. 1536 -> "1.5 KB". */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = bytes / Math.pow(k, i);
  // Whole bytes never need decimals.
  const dm = i === 0 ? 0 : decimals;
  return `${parseFloat(value.toFixed(dm))} ${units[i]}`;
}

/** Format pixel dimensions, e.g. "4032 × 3024". */
export function formatDimensions(width: number, height: number): string {
  return `${width} × ${height}`;
}

/** Percentage difference in size, positive means larger. */
export function sizeDeltaLabel(originalBytes: number, outputBytes: number): string {
  if (originalBytes <= 0) return '';
  const delta = ((outputBytes - originalBytes) / originalBytes) * 100;
  const rounded = Math.round(delta);
  if (rounded === 0) return 'same size';
  return rounded > 0 ? `+${rounded}% larger` : `${rounded}% smaller`;
}
