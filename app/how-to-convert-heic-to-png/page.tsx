import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'How to Convert HEIC to PNG (Step-by-Step Guide)',
  description:
    'A simple step-by-step guide to converting HEIC and HEIF photos to PNG for free in your browser — on Windows, Mac, iPhone, and Android.',
  path: '/how-to-convert-heic-to-png',
});

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to convert HEIC to PNG',
  description:
    'Convert HEIC or HEIF images to PNG for free using a browser-based converter.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'A modern web browser' }],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Open the converter',
      text: 'Open the free HEIC to PNG converter in your browser.',
      url: absoluteUrl('/heic-png'),
    },
    {
      '@type': 'HowToStep',
      name: 'Add your HEIC files',
      text: 'Drag and drop your .heic or .heif files, or click to browse and select them.',
    },
    {
      '@type': 'HowToStep',
      name: 'Convert in the browser',
      text: 'Conversion starts automatically and runs locally on your device.',
    },
    {
      '@type': 'HowToStep',
      name: 'Download the PNGs',
      text: 'Download each PNG individually, or download all of them as a ZIP archive.',
    },
  ],
};

export default function HowToPage() {
  return (
    <>
      <JsonLd data={howToSchema} />
      <ArticleShell
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'How to convert HEIC to PNG', path: '/how-to-convert-heic-to-png' },
        ]}
        title="How to convert HEIC to PNG"
        lead="A quick, no-signup guide to turning HEIC and HEIF photos into PNG images — the same steps work on Windows, macOS, iPhone, iPad, and Android."
      >
        <h2>Step 1: Open the converter</h2>
        <p>
          Head to the <Link href="/heic-png">converter</Link>. There’s nothing to install
          and no account to create — it runs entirely in your browser.
        </p>

        <h2>Step 2: Add your HEIC or HEIF files</h2>
        <p>
          Drag files onto the upload area, click <strong>Choose HEIC Files</strong> to
          browse, or paste a copied image. You can add up to 50 images at a time. On a
          phone, tap the upload area to pick photos from your library.
        </p>

        <h2>Step 3: Let it convert</h2>
        <p>
          Conversion begins automatically. Your device decodes each HEIC image with
          WebAssembly and re-encodes it as a lossless PNG. A few files convert at once so
          your browser stays responsive — large batches simply take a little longer.
        </p>

        <h2>Step 4: Download your PNG files</h2>
        <p>
          Each converted image shows its new dimensions and file size. Click{' '}
          <strong>Download</strong> to save a single PNG, or{' '}
          <strong>Download all as ZIP</strong> to grab the whole batch at once.
        </p>

        <h2>Troubleshooting</h2>
        <ul>
          <li>
            <strong>A file failed to convert.</strong> It may be corrupted or use a HEIC
            variant your browser can’t decode. Use the retry button, or re-export the
            photo on the original device.
          </li>
          <li>
            <strong>The PNG is much larger than the HEIC.</strong> That’s expected — PNG
            is lossless. See <Link href="/heic-vs-png">HEIC vs PNG</Link> for details.
          </li>
          <li>
            <strong>Nothing happens.</strong> Make sure you’re on an up-to-date browser
            that supports WebAssembly.
          </li>
        </ul>

        <h2>Convert HEIC to PNG on any device</h2>
        <p>
          The steps above are the same everywhere, but here’s what to expect on each
          platform:
        </p>
        <h3>Windows 10 &amp; 11</h3>
        <p>
          You don’t need Microsoft’s HEIF/HEVC codecs to convert — the browser tool
          handles decoding itself, so it works even on a fresh Windows install. Just drag
          your <code>.heic</code> files onto the converter. If you also want Windows to
          open HEIC natively in the Photos app, see{' '}
          <Link href="/guides/open-heic-on-windows">
            how to open HEIC files on Windows
          </Link>
          .
        </p>
        <h3>macOS</h3>
        <p>
          Macs open HEIC natively, and Preview can export a single image to PNG via File →
          Export. The converter is the faster route when you have a whole folder to do at
          once and don’t want to export them one by one.
        </p>
        <h3>iPhone &amp; iPad</h3>
        <p>
          Open the converter in Safari, tap the upload area, and pick photos from your
          library. Everything converts on the device, and you can save the PNGs straight
          back to Files or Photos. There’s a dedicated walkthrough at{' '}
          <Link href="/convert-iphone-photos-to-png">convert iPhone photos to PNG</Link>.
        </p>
        <h3>Android</h3>
        <p>
          Chrome on Android runs the converter just like a desktop browser. This is handy
          when an app rejects a HEIC upload. More detail is in our guide on{' '}
          <Link href="/guides/heic-on-android">HEIC on Android</Link>.
        </p>

        <h2>Optional settings</h2>
        <p>
          By default the converter produces a lossless PNG at the original resolution. If
          you open <strong>Conversion settings</strong>, you can switch on a “reduce file
          size” mode for a much smaller PNG, cap the maximum dimensions of very large
          photos, keep or flatten transparency, and choose how the output files are named.
          None of this is required — the defaults produce a high-quality result with a
          single click.
        </p>

        <h2>Frequently asked questions</h2>
        <h3>Is it really free?</h3>
        <p>
          Yes — the converter is completely free, with no signup, watermarks, or per-file
          limits beyond sensible batch caps that keep your browser responsive.
        </p>
        <h3>Do my photos get uploaded?</h3>
        <p>
          No. Conversion happens entirely in your browser, so your images are never
          intentionally sent to a server. See the{' '}
          <Link href="/privacy">privacy page</Link> for the details, or the guide on{' '}
          <Link href="/guides/is-it-safe-to-convert-heic-online">
            whether converting HEIC online is safe
          </Link>
          .
        </p>
        <h3>Can I convert many files at once?</h3>
        <p>
          Yes. Add up to 50 images per batch, convert them together, and download them
          individually or as a single ZIP.
        </p>
      </ArticleShell>
    </>
  );
}
