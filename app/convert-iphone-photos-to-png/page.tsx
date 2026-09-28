import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Convert iPhone Photos to PNG (HEIC) – Free & Private',
  description:
    'Convert iPhone HEIC photos to PNG for free. Works right in Safari on your iPhone or iPad, or on any desktop browser — no app, no signup, no uploads.',
  path: '/convert-iphone-photos-to-png',
});

export default function ConvertIphonePhotosPage() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Convert iPhone photos to PNG', path: '/convert-iphone-photos-to-png' },
      ]}
      title="Convert iPhone photos to PNG"
      lead="iPhones save photos as HEIC to conserve space. Here’s how to turn those HEIC photos into PNG images — directly on your device."
    >
      <p>
        Since iOS 11, iPhones and iPads capture photos in <strong>HEIC</strong> by
        default. It’s a genuinely clever format — it stores a high-quality photo in
        roughly half the space of a JPEG — but that efficiency comes at the cost of
        compatibility. Plenty of Windows programs, older apps, web uploaders, and photo
        kiosks still choke on a <code>.heic</code> file. Converting to{' '}
        <strong>PNG</strong> makes those photos open and upload anywhere, while keeping
        every pixel of the original.
      </p>
      <p>
        You don’t need an app from the App Store, an account, or a cable to do it. The
        converter on this site runs entirely inside your browser — including mobile Safari
        — so you can turn HEIC into PNG right on the phone that took the photo, and the
        images never leave your device.
      </p>

      <h2>Convert HEIC photos on your iPhone or iPad</h2>
      <ol>
        <li>
          Open the <Link href="/heic-png">converter</Link> in Safari, Chrome, or any
          modern mobile browser.
        </li>
        <li>
          Tap the upload area. iOS will offer <strong>Photo Library</strong>,{' '}
          <strong>Take Photo</strong>, and <strong>Choose Files</strong> — pick{' '}
          <strong>Photo Library</strong> to grab pictures from your camera roll.
        </li>
        <li>
          Select one or many HEIC photos and tap <strong>Add</strong>.
        </li>
        <li>
          Each photo is decoded and re-encoded to PNG on-device. When it’s done, tap{' '}
          <strong>Download</strong> on a single result, or{' '}
          <strong>Download all as ZIP</strong> for the whole batch.
        </li>
        <li>
          iOS saves the file through the share sheet — choose{' '}
          <strong>Save to Files</strong>, or <strong>Save Image</strong> to send the PNG
          back to your Photos app.
        </li>
      </ol>
      <p>
        Because everything runs locally, your photos never leave your phone — a real
        advantage when the pictures are personal. See our{' '}
        <Link href="/privacy">privacy page</Link> for exactly how that works, or the guide
        on{' '}
        <Link href="/guides/is-it-safe-to-convert-heic-online">
          whether it’s safe to convert HEIC online
        </Link>
        .
      </p>

      <h2>Convert iPhone HEIC photos on a Windows PC or Mac</h2>
      <p>Already moved the photos to a computer? Two common situations come up:</p>
      <ul>
        <li>
          <strong>Windows.</strong> If a program refuses to open your <code>.heic</code>{' '}
          files, drag them onto the <Link href="/heic-png">converter</Link> and download
          PNGs — no codec install required. (If you’d rather open HEIC natively in
          Windows, see{' '}
          <Link href="/guides/open-heic-on-windows">
            how to open HEIC files on Windows
          </Link>
          .)
        </li>
        <li>
          <strong>Mac.</strong> macOS opens HEIC natively, and Preview can export to PNG
          via File → Export. Our converter is handy when you have many files to do at
          once, or want to avoid exporting them one by one.
        </li>
      </ul>

      <h2>Why do iPhones use HEIC in the first place?</h2>
      <p>
        Apple switched the default to HEIC to save storage without sacrificing quality,
        and to support features the format enables — wider color, transparency, and image
        sequences like Live Photos. For an iPhone with thousands of photos, halving the
        file sizes adds up to gigabytes. The downside is only felt when you move those
        photos off the phone into a world that still expects JPEG or PNG.
      </p>

      <h2>Prefer to stop shooting in HEIC?</h2>
      <p>
        You can tell your iPhone to capture in the more compatible JPEG format instead.
        Open <strong>Settings → Camera → Formats</strong> and choose{' '}
        <strong>Most Compatible</strong>; new photos will be saved as JPEG. Note that this
        only affects pictures you take from then on — photos already in your library stay
        HEIC until you convert them. There’s also a separate setting under{' '}
        <strong>Settings → Photos → Transfer to Mac or PC</strong> that controls whether
        photos are auto-converted to JPEG when you move them over a cable. The full
        walkthrough is in our guide on{' '}
        <Link href="/guides/turn-off-heic-iphone">turning off HEIC on iPhone</Link>.
      </p>

      <h2>Tips for best results</h2>
      <ul>
        <li>
          Convert in reasonable batches (up to 50 files at a time) so mobile Safari stays
          smooth on large jobs.
        </li>
        <li>
          Expect the PNGs to be <strong>larger</strong> than the HEIC originals — that’s
          normal, because PNG is lossless. If size matters more than perfect fidelity, the
          converter’s “reduce file size” option produces a much smaller PNG.
        </li>
        <li>
          If a specific photo fails to convert, retry it, or open it in the Photos app and
          export a copy first — a re-exported still almost always converts cleanly.
        </li>
        <li>
          Keep your originals until you’ve confirmed the PNGs look right. Conversion
          happens on your device, so you’re in control of both copies.
        </li>
      </ul>

      <h2>Frequently asked questions</h2>

      <h3>Do I need an app to convert HEIC on my iPhone?</h3>
      <p>
        No. The converter runs in your mobile browser, so there’s nothing to install. Open
        the page, pick your photos, and download the PNGs.
      </p>

      <h3>Are my photos uploaded when I convert on my phone?</h3>
      <p>
        No. Conversion happens entirely on your device using WebAssembly, so your images
        are never sent to a server.
      </p>

      <h3>Should I convert to PNG or JPG?</h3>
      <p>
        PNG is lossless and preserves transparency, which makes it ideal for editing,
        archiving, and graphics. JPG produces smaller files and is fine for sharing
        photos. This tool outputs PNG; for a deeper comparison see{' '}
        <Link href="/guides/heic-vs-jpg">HEIC vs JPG</Link>.
      </p>
    </ArticleShell>
  );
}
