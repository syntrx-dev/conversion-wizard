# Conversion Wizard

**[conversion-wizard.net](https://conversion-wizard.net)** — a free image converter and
compressor that runs entirely in your browser. No uploads, no account, no queue.

Convert HEIC, HEIF, JPG, PNG, WEBP, AVIF, GIF, BMP, SVG and PDF into PNG, JPG or
WEBP. Compress any image down to a target file size. Everything happens on your
own machine.

---

## The privacy claim, and how to verify it

Most online image converters upload your photos to a server. This one doesn't —
there is no server to upload to. The site is a static export with no backend, no
database, and no file storage. Your images are decoded, re-encoded and downloaded
without ever leaving your device.

That's an easy thing to claim and a hard thing to trust, so here's how to check it
yourself rather than taking our word for it:

1. **Watch the network.** Open DevTools → Network, convert a file, and filter by
   `Fetch/XHR`. You'll see no request carrying your image. The app makes exactly
   two same-origin calls, both to the conversion counter: a `GET /counter.php` to
   read the running total shown on the homepage, and a `POST /counter.php?n=<count>`
   that sends a single integer after a batch finishes. No filenames, no pixels.
   That's the whole of it — see [`lib/utils/counter.ts`](lib/utils/counter.ts) and
   [`public/counter.php`](public/counter.php), which is 40 lines.
2. **Cut the connection.** Load the page once, then go offline (DevTools → Network
   → Offline, or unplug) and convert a file. It still works: a service worker
   cache-firsts the app's static chunks, including the WebAssembly HEIC decoder,
   and conversion never needed the network to begin with.
3. **Read the Content-Security-Policy.** [`deploy/htaccess`](deploy/htaccess) sets
   `connect-src` to `'self' blob: data:` plus Google's ad hosts. The browser itself
   will block an attempt to POST your image anywhere else.
4. **Read the conversion code.** It's all in
   [`lib/conversion/convert.ts`](lib/conversion/convert.ts) and
   [`lib/tools/compress.ts`](lib/tools/compress.ts). Nothing there touches
   `fetch` or `XMLHttpRequest`.

The site does serve Google AdSense, which is third-party JavaScript and sets its
own cookies. That's disclosed here for the same reason as everything else above:
the privacy claim is specifically about your *images*, and it should be checkable
rather than assumed.

## What it converts

Ten input formats, nineteen converter pages. Targets are limited to the three
formats a browser canvas can actually encode (`PNG`, `JPG`, `WEBP`) — we don't
ship a page for a conversion that can't genuinely run client-side.

| Input | How it's decoded | To PNG | To JPG | To WEBP |
|---|---|:-:|:-:|:-:|
| HEIC | `heic2any` (libheif via WebAssembly) | ✓ | ✓ | ✓ |
| HEIF | `heic2any` (libheif via WebAssembly) | ✓ | ✓ | |
| JPG | native `createImageBitmap` | ✓ | | ✓ |
| PNG | native `createImageBitmap` | | ✓ | ✓ |
| WEBP | native `createImageBitmap` | ✓ | ✓ | |
| AVIF | native `createImageBitmap` | ✓ | ✓ | |
| GIF | native `createImageBitmap` (first frame) | ✓ | | |
| BMP | native `createImageBitmap` | ✓ | | |
| SVG | `DOMParser` → `<img>` rasterization | ✓ | ✓ | |
| PDF | `pdfjs-dist` (first page) | ✓ | ✓ | |

Vector and document inputs are rasterized at up to 4096px on the long edge.
Converting *to* a vector format isn't offered, because turning pixels back into
paths isn't something a converter can honestly do.

## Compression

Alongside the converters there's a compress-to-target-size tool
(`/compress-image`, plus fixed-target pages for 50, 100, 200 and 500 KB). It
binary-searches encoder quality to find the highest setting that still lands under
your target, then reports what it actually achieved. If a target isn't reachable
without destroying the image, it says so instead of silently returning something
unusable.

## How it's built

Next.js 15 (App Router) exported as a fully static site — `output: 'export'`, no
Node runtime in production. TypeScript, Tailwind, and a handful of focused
dependencies.

```
app/
  [pair]/            19 converter pages, generated from the registry
  [slug]/            tool pages (compress-image, compress-image-to-100kb, ...)
  guides/            21 long-form problem guides
components/
  converter/         dropzone, queue, per-file status, settings
  tools/             compress UI + the embeddable wrapper used inside guides
lib/
  config/            the registries that drive every page (see below)
  conversion/        decode -> encode pipeline, bounded-concurrency queue
  tools/             compress-to-target-size engine
  content/           per-format editorial copy, guide index
```

The site is registry-driven, so pages aren't hand-maintained. Adding a converter
is one line in [`lib/config/conversions.ts`](lib/config/conversions.ts):

```ts
const pairs: [string, string][] = [
  ['heic', 'png'],
  ['svg', 'jpg'],
  ['pdf', 'png'],
  // add a pair -> a new static page, sitemap entry, and homepage card appear
];
```

`generateStaticParams` reads that registry at build time to emit the routes, and
the sitemap and internal-link blocks read the same source, so they can't drift
apart.

## Running it

```bash
npm install
npm run dev        # http://localhost:5213
```

| Script | |
|---|---|
| `npm run dev` | dev server on port 5213 |
| `npm run build` | static export to `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | unit tests (Vitest) |
| `npm run test:e2e` | end-to-end tests (Playwright) |
| `npm run lint` | ESLint |

`output: 'export'` means `next start` won't work. To test a production build,
serve `out/` as static files.

### Tests

69 unit tests across the naming, validation, queue, error-mapping, ZIP and
converter-hook layers, plus Playwright end-to-end coverage of a real conversion.

```bash
npm test
```

End-to-end HEIC tests need a real HEIC file, which isn't committed — see
[`tests/fixtures/README.md`](tests/fixtures/README.md).

## Deployment

`npm run build` produces a static `out/` directory that's uploaded to Apache
shared hosting over FTPS, with [`deploy/htaccess`](deploy/htaccess) installed as
`.htaccess` at the site root. That file carries the CSP, security headers, HSTS,
cache policy, canonical host redirects, and the `.mjs` MIME mapping that the
pdf.js worker needs.

The upload script and its credentials live outside this repository. Nothing here
can deploy anything, and no credentials are committed.

## License

Copyright © Syntrx Technologies, LLC. All rights reserved.

The source is published here so the privacy claims above can be independently
verified. It is not currently offered under an open-source license, so it isn't
licensed for redistribution or for running your own copy. If you want to use part
of it, ask.
