/** Rows for the HEIC vs PNG comparison table. Kept as data for reuse and SEO. */
export interface ComparisonRow {
  attribute: string;
  heic: string;
  png: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    attribute: 'Compression',
    heic: 'Lossy (HEVC), very efficient',
    png: 'Lossless, preserves every pixel',
  },
  {
    attribute: 'Typical file size',
    heic: 'Small (~1–3 MB per photo)',
    png: 'Larger (often 2–5× the HEIC)',
  },
  {
    attribute: 'Transparency (alpha)',
    heic: 'Supported',
    png: 'Supported',
  },
  {
    attribute: 'Browser compatibility',
    heic: 'Limited (mainly Safari/Apple)',
    png: 'Universal (every browser)',
  },
  {
    attribute: 'Editing & software support',
    heic: 'Growing, but still spotty',
    png: 'Supported almost everywhere',
  },
  {
    attribute: 'Best for',
    heic: 'Saving space on Apple devices',
    png: 'Sharing, web, editing, archiving',
  },
  {
    attribute: 'Animation / sequences',
    heic: 'Supported (Live Photos, bursts)',
    png: 'Single still image only',
  },
];
