import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How to Open HEIC Files on Windows 10 and 11',
  description:
    'Open HEIC photos on Windows 10 or 11 with the free HEIF Image Extensions, the HEVC codec, Photos, Paint, or by converting to PNG in your browser.',
  path: '/guides/open-heic-on-windows',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'Open HEIC on Windows', path: '/guides/open-heic-on-windows' },
      ]}
      title="How to open HEIC files on Windows 10 and 11"
      lead="Windows didn't support Apple's HEIC photo format out of the box for years, which is why double-clicking a .heic file often shows an error or a blank icon. Here is exactly what to install, where to find it, and the fastest way around the problem entirely."
    >
      <h2>Why HEIC files don't open on a fresh Windows install</h2>
      <p>
        HEIC (High Efficiency Image Container) is the format iPhones and iPads have used
        by default since iOS 11. It stores photos with HEVC compression, which produces
        smaller files than JPEG at similar quality. The catch is that the HEVC decoder is
        patent-encumbered, so Microsoft ships Windows without it. On a clean Windows 10 or
        Windows 11 machine, the Photos app can recognise that a file is a HEIC image but
        has no codec to actually decode the pixels, so you get a message like{' '}
        <code>This file can't be opened</code> or a grey placeholder in File Explorer.
      </p>
      <p>
        The fix is to add two components from the Microsoft Store. One is free, and the
        one that does the real decoding work has a small charge unless your PC maker has
        already licensed it for you. Below are both routes.
      </p>

      <h2>Step 1: Install the HEIF Image Extensions (free)</h2>
      <p>
        This is the piece that teaches Windows how to read the HEIF/HEIC container itself.
        It costs nothing.
      </p>
      <ol>
        <li>
          Open the <strong>Microsoft Store</strong> from the Start menu.
        </li>
        <li>
          Search for <strong>HEIF Image Extensions</strong> (publisher: Microsoft
          Corporation).
        </li>
        <li>
          Click <strong>Get</strong>, then <strong>Install</strong>.
        </li>
      </ol>
      <p>
        On its own this extension is not always enough, because the container still relies
        on the HEVC video codec to unpack the actual image data. That is the second piece.
      </p>

      <h2>Step 2: Add HEVC video decoding</h2>
      <p>There are two ways to get the HEVC codec, depending on your hardware.</p>
      <h3>The free OEM route</h3>
      <p>
        Microsoft publishes a listing called{' '}
        <strong>HEVC Video Extensions from Device Manufacturer</strong>. When your PC's
        graphics hardware supports HEVC (most Intel, AMD, and NVIDIA GPUs from the last
        several years do), this version is free. It is not always easy to find by
        searching the Store app directly; the reliable way is to open the Store link that
        Microsoft surfaces from within the Photos app when you try to view a HEIC file. If
        Photos offers a prompt to download the codec, follow it, because that link points
        at the free device-manufacturer edition.
      </p>
      <h3>The paid route</h3>
      <p>
        If the free listing is unavailable for your machine, the general
        <strong> HEVC Video Extensions</strong> package sells for about $0.99 in the
        Microsoft Store. It is the same decoder and works regardless of GPU. For a one-off
        need it is often faster to skip the purchase and convert the file instead, which
        is covered further down.
      </p>

      <h2>Step 3: Open the file in Photos, Paint, or a browser</h2>
      <p>
        Once both extensions are installed, HEIC support becomes system-wide. You can:
      </p>
      <ul>
        <li>
          <strong>Double-click</strong> a .heic file to open it in the Photos app, which
          now renders it like any JPEG.
        </li>
        <li>
          Open it in <strong>Paint</strong> or <strong>Paint 3D</strong> and use{' '}
          <strong>File &rarr; Save as</strong> to export a PNG or JPEG copy.
        </li>
        <li>
          Drag the file into <strong>Microsoft Edge</strong> or another Chromium browser,
          which can display HEIC once the system codec is present.
        </li>
      </ul>
      <p>
        If a program you use still refuses the file, right-click it, choose{' '}
        <strong>Open with</strong>, and pick Photos explicitly. You can also tick{' '}
        <strong>Always use this app</strong> to change the default association.
      </p>

      <h2>File Explorer thumbnails and previews</h2>
      <p>
        After the extensions are in place, File Explorer will start generating thumbnail
        previews for HEIC files, and the Preview pane (toggle it from the{' '}
        <strong>View</strong> menu, or with <code>Alt + P</code>) will show the image. If
        thumbnails stay grey, they are often just cached. Open a Command Prompt and run{' '}
        <code>ie4uinit.exe -show</code>, or clear the thumbnail cache through Disk
        Cleanup, then reopen the folder.
      </p>

      <h2>The no-install shortcut: convert to PNG in your browser</h2>
      <p>
        If you only have a handful of HEIC photos, or you are on a locked-down work PC
        where you can't install Store apps, converting is the simplest path. Our{' '}
        <Link href="/heic-png">free HEIC to PNG converter</Link> runs entirely inside your
        browser. Your images are decoded on your own machine and never uploaded to a
        server, so it works without codecs, accounts, or admin rights. Drop the files in,
        and download standard PNGs that open in any Windows program. It also handles the
        related <Link href="/heif-png">HEIF to PNG</Link> case.
      </p>

      <h2>Troubleshooting when the extensions still don't work</h2>
      <ul>
        <li>
          <strong>Photos updated but HEIC still fails.</strong> Reboot. Codec registration
          sometimes only takes effect after a restart.
        </li>
        <li>
          <strong>The HEVC listing shows a price you didn't expect.</strong> Your GPU may
          not be recognised as HEVC-capable. Either buy the $0.99 package or convert the
          file instead.
        </li>
        <li>
          <strong>An enterprise-managed PC blocks the Store.</strong> Ask IT, or use the
          browser converter, which needs no installation.
        </li>
        <li>
          <strong>The file opens as a broken image.</strong> The download may be
          incomplete or the photo may use an unusual HEIC variant. Our companion guide on{' '}
          <Link href="/guides/heic-wont-open">HEIC files that won't open</Link> walks
          through those cases.
        </li>
      </ul>

      <h2>Frequently asked questions</h2>
      <h3>Is the HEIC codec really not free on Windows?</h3>
      <p>
        The HEIF Image Extensions are always free. The HEVC decoder is free when your PC
        maker has licensed it for your hardware (the "from Device Manufacturer" edition);
        otherwise Microsoft charges about $0.99 for the general version. Converting to PNG
        avoids the question altogether.
      </p>
      <h3>Will installing these extensions change my existing photos?</h3>
      <p>
        No. They only add the ability to read and display HEIC files. Your original photos
        are untouched, and nothing is re-saved unless you deliberately export a copy.
      </p>
      <h3>Can I make Windows stop creating HEIC files in the first place?</h3>
      <p>
        HEIC comes from the camera, not from Windows. If the photos originate on an
        iPhone, you can switch the camera to JPEG in the iOS Camera settings. That doesn't
        help with files you already have, but converting existing HEIC images to PNG
        solves it immediately.
      </p>
    </ArticleShell>
  );
}
