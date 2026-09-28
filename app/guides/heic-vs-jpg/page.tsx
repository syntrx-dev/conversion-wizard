import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'HEIC vs JPG: Which Image Format Should You Use?',
  description:
    'HEIC vs JPG compared in depth: compression, file size, image quality, color depth, transparency, Live Photos, and compatibility — plus when to keep or convert.',
  path: '/guides/heic-vs-jpg',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'HEIC vs JPG', path: '/guides/heic-vs-jpg' },
      ]}
      title="HEIC vs JPG: Which Image Format Should You Use?"
      lead="HEIC stores your photos in about half the space of JPG at similar quality, but JPG opens almost anywhere. Here is how the two formats actually differ and how to decide between them."
    >
      <p>
        Since iOS 11 in 2017, iPhones and iPads have saved photos as HEIC by default,
        while the rest of the world has spent three decades sharing JPGs. If you have ever
        emailed a photo from an iPhone only to have the recipient say it will not open,
        you have run straight into the gap between these two formats. Neither is simply
        better; they were designed for different jobs.
      </p>

      <h2>What HEIC and JPG actually are</h2>
      <p>
        JPG (also written JPEG) is a 1992 standard that stores a single photo using
        <strong> discrete cosine transform</strong> compression. It breaks the image into
        8×8 pixel blocks and throws away fine detail your eye is least likely to miss. It
        is lossy, it is old, and it is understood by essentially every device, browser,
        printer, and app ever made.
      </p>
      <p>
        HEIC is Apple&rsquo;s name for an image stored in a HEIF (High Efficiency Image
        File Format) container, compressed with <strong>HEVC</strong> — the same codec
        (H.265) used for high-efficiency video. Instead of only compressing within a
        block, HEVC uses smarter intra-frame prediction, larger and variable block sizes,
        and more efficient entropy coding. The practical result is dramatically better
        compression for the same visual quality.
      </p>

      <h2>File size and quality</h2>
      <p>
        The headline difference is size. At comparable perceived quality, a HEIC file is
        commonly around <strong>half the size</strong> of the equivalent JPG. Flip that
        around and it means that at the <em>same</em> file size, HEIC generally looks
        cleaner — fewer of the blocky artifacts and color banding you see when a JPG is
        pushed hard. For a phone holding thousands of photos, halving storage is a real
        benefit, which is exactly why Apple made the switch.
      </p>

      <h2>Features beyond the pixels</h2>
      <p>HEIC is not just smaller; the container can hold things JPG cannot:</p>
      <ul>
        <li>
          <strong>Higher color depth:</strong> HEIC supports 10-bit and higher color,
          which preserves smoother gradients in skies and shadows. Standard JPG is limited
          to 8 bits per channel.
        </li>
        <li>
          <strong>Transparency:</strong> HEIC can store an alpha channel. JPG has no
          transparency at all — every pixel is opaque.
        </li>
        <li>
          <strong>Image sequences:</strong> a single HEIC file can bundle multiple frames,
          which is how iPhone Live Photos and burst shots are stored.
        </li>
        <li>
          <strong>Depth and auxiliary maps:</strong> Portrait-mode depth data and edit
          instructions can ride along in the same file.
        </li>
        <li>
          <strong>Rich metadata:</strong> HEIF was designed from the start to carry
          extensive metadata cleanly.
        </li>
      </ul>
      <p>
        JPG has none of these. It is a flat, single, opaque, 8-bit image — and that
        simplicity is precisely why it is so universally supported.
      </p>

      <h2>Compatibility: the deciding factor for most people</h2>
      <p>
        This is where JPG wins decisively. A JPG opens on Windows 7, an Android phone from
        2014, a smart TV, a print kiosk, and every web browser without a second thought.
        HEIC support is far narrower. Windows needs an extra codec from the Microsoft
        Store, many web apps reject HEIC uploads outright, older Android versions cannot
        preview it, and plenty of photo-editing tools still do not read it.
      </p>
      <p>
        So the honest rule of thumb is: keep photos as HEIC while they live on your Apple
        devices, but convert to a widely supported format the moment you need to send,
        upload, edit elsewhere, or archive them for the long term.
      </p>

      <h2>Editing and archiving</h2>
      <p>
        For editing, format matters less than the software you use — modern versions of
        Photoshop, Affinity, and Lightroom handle HEIC, but many free and web-based
        editors do not. For long-term archiving, think about who will open the file in ten
        years. A format that every program can read is a safer bet than one that depends
        on a specific codec being installed.
      </p>

      <h2>Where PNG fits — and why our tool outputs it</h2>
      <p>
        You have a third option: PNG. Unlike both HEIC and JPG, PNG is
        <strong> lossless</strong> — it records every pixel exactly with no compression
        artifacts, and it supports clean transparency. That makes PNG ideal when you want
        a pristine copy for editing, screenshots, graphics, or archiving, and it opens
        everywhere JPG does.
      </p>
      <p>
        The trade-off is size: a lossless PNG is usually larger than a lossy JPG of the
        same photo. So a reasonable way to think about it is — JPG for small,
        share-anywhere photos; PNG when fidelity and universal support both matter. Our
        free, in-browser tool converts HEIC and HEIF to PNG so you get that lossless,
        universally readable copy without your images ever leaving your device. If you
        want to weigh the two directly, see our{' '}
        <Link href="/heic-vs-png">HEIC vs PNG comparison</Link>, and when you are ready
        you can <Link href="/heic-png">convert your files here</Link>.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Does converting HEIC to JPG lose quality?</h3>
      <p>
        Slightly, yes. JPG is lossy, so re-encoding a HEIC as JPG adds a second round of
        compression on top of the first. For most everyday photos the difference is
        invisible, but if you want a copy with zero added loss, convert to PNG instead —
        it preserves every pixel exactly.
      </p>

      <h3>Is HEIC better than JPG?</h3>
      <p>
        For storage efficiency and technical features, yes — HEIC packs more quality into
        fewer bytes and can hold color depth, transparency, and depth data JPG cannot. For
        raw compatibility, JPG still wins, because it opens on virtually anything. The
        &ldquo;better&rdquo; format depends entirely on what you are about to do with the
        file.
      </p>

      <h3>Why do some websites reject my HEIC uploads?</h3>
      <p>
        Many sites only accept the image types their software knows how to decode and
        display, and HEIC is often not on that list. Converting to JPG or PNG first solves
        it. See our guide on{' '}
        <Link href="/convert-iphone-photos-to-png">converting iPhone photos</Link> for a
        walkthrough.
      </p>
    </ArticleShell>
  );
}
