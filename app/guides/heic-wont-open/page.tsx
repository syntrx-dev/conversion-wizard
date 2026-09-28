import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: "HEIC Files Won't Open? Here's How to Fix It",
  description:
    "A HEIC file that won't open usually means a missing codec, an old app, or a broken download. Here are the causes and fixes for Windows, Mac, and Android.",
  path: '/guides/heic-wont-open',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: "HEIC won't open", path: '/guides/heic-wont-open' },
      ]}
      title="HEIC files won't open? Here's how to fix it"
      lead="A .heic file that refuses to open is almost always one of a handful of specific problems, not a damaged photo. This guide sorts the causes from most to least common and gives you the exact fix for each platform, plus a fallback that works everywhere."
    >
      <h2>First, figure out which problem you have</h2>
      <p>
        HEIC is the container format Apple devices use for photos. When it won't open, the
        cause is usually one of these:
      </p>
      <ul>
        <li>
          <strong>No HEVC codec installed</strong> (the most common cause on Windows).
        </li>
        <li>
          <strong>The app is too old</strong> to understand the format.
        </li>
        <li>
          <strong>The wrong app is set as the default</strong> for .heic files.
        </li>
        <li>
          <strong>The file is corrupted or incomplete</strong> from a failed download or
          transfer.
        </li>
        <li>
          <strong>It's an unusual HEIC variant</strong> such as a depth-map portrait, a
          Live Photo, or a burst container that some viewers can't parse.
        </li>
        <li>
          <strong>The file was renamed</strong> and isn't really a HEIC at all.
        </li>
      </ul>
      <p>
        Work through the section that matches your device below. If you just need the
        photo open right now, jump to the universal fallback at the end.
      </p>

      <h2>Fixing it on Windows</h2>
      <p>
        On Windows 10 and 11 the usual culprit is a missing codec. Install the free{' '}
        <strong>HEIF Image Extensions</strong> from the Microsoft Store, then add HEVC
        video decoding (free from your device manufacturer where supported, or about $0.99
        otherwise). Our step-by-step{' '}
        <Link href="/guides/open-heic-on-windows">guide to opening HEIC on Windows</Link>{' '}
        covers both routes in detail.
      </p>
      <p>If the codec is already installed but the file still won't open:</p>
      <ol>
        <li>
          Right-click the file, choose <strong>Open with</strong>, and pick{' '}
          <strong>Photos</strong> directly rather than trusting the default.
        </li>
        <li>Restart the PC so the codec registers properly.</li>
        <li>
          Check the file size. A HEIC that is only a few kilobytes almost certainly didn't
          finish downloading.
        </li>
      </ol>

      <h2>Fixing it on a Mac</h2>
      <p>
        macOS has read HEIC natively since High Sierra (10.13), so a Mac that won't open
        one is unusual. When it happens:
      </p>
      <ul>
        <li>
          <strong>Update macOS.</strong> Older releases struggle with newer HEIC variants
          created by recent iPhones.
        </li>
        <li>
          <strong>Open it in Preview explicitly.</strong> Select the file, press{' '}
          <code>Space</code> for Quick Look, or right-click and choose{' '}
          <strong>Open With &rarr; Preview</strong>.
        </li>
        <li>
          <strong>Re-copy from the source.</strong> If the file came off an iPhone over a
          cable, an interrupted transfer can leave a partial file. Re-import through
          Photos or Image Capture.
        </li>
      </ul>

      <h2>Fixing it in web apps and email</h2>
      <p>
        Many websites and email clients simply reject HEIC because the format isn't
        universally supported for uploads. If a form says the image type is invalid, the
        file isn't broken; the site just doesn't accept HEIC. There are two things worth
        checking:
      </p>
      <ul>
        <li>
          <strong>Watch for renamed files.</strong> Someone may have changed a{' '}
          <code>.heic</code> extension to <code>.jpg</code> by hand. That doesn't convert
          anything; it just mislabels the file, and strict apps will reject it. A real
          conversion, not a rename, is needed.
        </li>
        <li>
          <strong>Convert before uploading.</strong> Turning the photo into a PNG or JPEG
          first sidesteps every compatibility rule.
        </li>
      </ul>

      <h2>Fixing it on Android</h2>
      <p>
        Android 10 and later can generally decode HEIF, but gallery and third-party app
        support is inconsistent, and some apps refuse HEIC uploads entirely. Google Photos
        and the built-in Files app are your most reliable viewers. Our dedicated{' '}
        <Link href="/guides/heic-on-android">HEIC on Android guide</Link> explains why
        some apps reject these files and how to view or convert them on the phone.
      </p>

      <h2>Dealing with corrupted or unusual files</h2>
      <p>
        If the same file fails everywhere, the problem may be the file itself rather than
        your software. Two situations come up often:
      </p>
      <ul>
        <li>
          <strong>Incomplete transfer.</strong> Files sent through chat apps, cloud links,
          or email can arrive truncated. Ask the sender to re-share, ideally as the
          original rather than a re-compressed copy.
        </li>
        <li>
          <strong>Special HEIC variants.</strong> Portrait photos with depth data, Live
          Photos, and burst sequences pack extra layers into the container. A basic viewer
          may only see the parts it understands, or fail outright. Re-exporting the photo
          on the original iPhone (share it as a JPEG) flattens it into a simple image.
        </li>
      </ul>

      <h2>The fallback that works everywhere: convert to PNG</h2>
      <p>
        When you don't want to chase codecs and app settings, convert the file. Our{' '}
        <Link href="/heic-png">free in-browser converter</Link> decodes HEIC and HEIF
        right on your device and gives you a standard PNG that opens in any program on any
        platform. Because everything happens locally, your photos are never uploaded, and
        there is nothing to install. It runs on Windows, Mac, and phones alike, which
        makes it the quickest way to rescue a file that stubbornly won't open elsewhere.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Why does renaming a HEIC to .jpg not fix it?</h3>
      <p>
        Changing the extension only changes the label, not the data inside. The file is
        still HEVC-compressed, so any app that actually reads the pixels will still fail
        or reject it. You need a real conversion that re-encodes the image.
      </p>
      <h3>Can a HEIC file be truly corrupted beyond repair?</h3>
      <p>
        Yes, if the download or transfer was cut off partway, key data can be missing and
        no viewer will recover it. The reliable fix is to get a fresh copy from the source
        device or from wherever the original still exists.
      </p>
      <h3>Is it safe to convert a HEIC I can't open using an online tool?</h3>
      <p>
        It depends on the tool. Converters that upload your photo to a server carry the
        usual privacy trade-offs. A browser-based converter that processes the image
        locally never sends it anywhere, which is why our tool works entirely on your own
        device. See our note on <Link href="/privacy">how we handle your files</Link>.
      </p>
    </ArticleShell>
  );
}
