import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { UniversalConverter } from '@/components/converter/UniversalConverter';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: `"It Looks Like We Don't Support This File Format" — How to Fix It`,
  description:
    'The Windows Photos error almost always means a missing HEIC/HEVC codec, not a broken photo. Here is how to tell, and how to open the file right now without installing anything.',
  path: '/guides/photos-doesnt-support-this-file-format',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        {
          name: 'Photos Doesn’t Support This File Format',
          path: '/guides/photos-doesnt-support-this-file-format',
        },
      ]}
      title={`"It Looks Like We Don't Support This File Format" — How to Fix It`}
      lead="Windows Photos throws this error when it can’t decode a file, not when the file is broken. Nine times out of ten it’s an iPhone HEIC photo and a missing codec — and you can open it in about ten seconds without installing anything."
    >
      <p>
        You double-click a photo, Windows Photos opens, and instead of your picture you get a
        grey panel reading <strong>&ldquo;It looks like we don&rsquo;t support this file
        format.&rdquo;</strong> The natural assumption is that the file is corrupt. It almost
        never is. That message is Photos admitting it lacks the <em>decoder</em> for the
        format, which is a completely different problem — and a much easier one, because the
        photo itself is perfectly intact.
      </p>

      <h2>What the error actually means</h2>
      <p>
        Windows Photos can only display formats it has a codec for. A codec is the piece of
        software that turns compressed image data back into pixels. When Photos meets a file
        whose codec isn&rsquo;t installed, it has no way to tell the difference between
        &ldquo;format I don&rsquo;t know&rdquo; and &ldquo;file I can&rsquo;t read,&rdquo; so
        it shows one generic message for both.
      </p>
      <p>
        This is why the error is so often misdiagnosed. People re-download the photo, ask the
        sender to resend it, or run file-repair tools — none of which help, because nothing is
        wrong with the file. The gap is on the Windows side.
      </p>

      <h2>Why it&rsquo;s almost always a HEIC file</h2>
      <p>
        Check the file extension. If it ends in <strong>.heic</strong> or{' '}
        <strong>.heif</strong>, you&rsquo;ve found your answer. Since iOS 11, iPhones have
        shot photos in HEIC by default rather than JPG, and HEIC is the single most common
        trigger for this error on Windows.
      </p>
      <p>
        The reason HEIC is awkward comes down to a distinction that matters here: HEIC is a{' '}
        <em>container</em>, and the image inside it is compressed with{' '}
        <strong>HEVC</strong> (also known as H.265). HEVC is patent-encumbered video
        technology, which is why Microsoft doesn&rsquo;t ship support for it in every Windows
        installation the way it does for JPG and PNG. Windows can see the container but
        can&rsquo;t decode what&rsquo;s inside it.
      </p>
      <p>
        If the extension is something else, these also commonly produce the same message:
      </p>
      <ul>
        <li>
          <strong>.avif</strong> — a newer, very efficient format. Support arrived in recent
          Windows builds, so older or un-updated systems reject it.
        </li>
        <li>
          <strong>.webp</strong> — generally fine on Windows 11, but inconsistent on older
          Windows 10 installs.
        </li>
        <li>
          <strong>Camera RAW files</strong> (.cr2, .cr3, .nef, .arw, .dng) — these need the
          Raw Image Extension, and support varies by camera model.
        </li>
        <li>
          <strong>Unusual TIFF variants</strong> — the .tif extension covers a surprisingly
          wide range of encodings, and Photos handles only some of them.
        </li>
      </ul>

      <h2>Fix it now: convert the file</h2>
      <p>
        The fastest fix is to turn the photo into a format Windows has always understood. No
        installation, no Microsoft Store account, no administrator rights — which matters if
        this is a work computer where you can&rsquo;t install software. Drop the file below
        and you&rsquo;ll get a JPG you can open, edit, and send anywhere.
      </p>

      <ToolEmbed
        title="Convert it to a format Windows can open"
        subtitle="HEIC, HEIF, AVIF, WEBP and more. Everything happens on your device — nothing is uploaded."
      >
        <UniversalConverter defaultTarget="jpg" />
      </ToolEmbed>

      <p>
        You can drop a whole folder of photos in at once and download them as a ZIP. If you
        want a lossless copy for editing or archiving rather than a compressed JPG, the{' '}
        <Link href="/heic-png">HEIC to PNG converter</Link> does the same job in PNG instead.
      </p>

      <h2>Fix it permanently: install the codecs</h2>
      <p>
        If you&rsquo;d rather make Windows handle these files natively, you need two separate
        items from the Microsoft Store:
      </p>
      <ol>
        <li>
          <strong>HEIF Image Extensions</strong> — free. This handles the container.
        </li>
        <li>
          <strong>HEVC Video Extensions</strong> — this handles the actual image data, and
          it&rsquo;s the one that trips people up. Microsoft lists a paid version (it has
          typically been around $0.99) alongside a free{' '}
          <em>HEVC Video Extensions from Device Manufacturer</em> edition that only installs
          on hardware whose maker licensed the codec. Which one you can install depends on
          your PC, so check the Store listing on your own machine rather than assuming.
        </li>
      </ol>
      <p>
        Install both, then restart Photos. Be aware of a genuine, well-documented catch:
        plenty of people install both extensions and{' '}
        <strong>still get the same error</strong>. It&rsquo;s a recurring complaint on
        Microsoft&rsquo;s own support forums, usually tied to a specific HEVC extension
        version or to 10-bit HEIC files from newer iPhones. If that happens to you, you
        haven&rsquo;t done anything wrong — the codec route simply doesn&rsquo;t always work,
        which is the honest case for converting instead.
      </p>

      <h2>Stop it happening to future photos</h2>
      <p>
        If the files are coming from your own iPhone, change what it shoots. Open{' '}
        <strong>Settings → Camera → Formats</strong> and choose{' '}
        <strong>Most Compatible</strong>. From then on your iPhone records JPG instead of
        HEIC, and these errors stop at the source. You lose a little storage efficiency —
        HEIC genuinely is smaller at the same quality — but you gain photos that open
        everywhere without a thought.
      </p>
      <p>
        Worth knowing: this setting only affects <em>new</em> photos. Everything already in
        your library stays HEIC, so you&rsquo;ll still want to convert the existing ones.
        There&rsquo;s more detail in our guide on{' '}
        <Link href="/guides/turn-off-heic-iphone">turning off HEIC on iPhone</Link>.
      </p>

      <h2>When the file really is damaged</h2>
      <p>
        Occasionally the pessimistic reading is the right one. Suspect genuine corruption if:
      </p>
      <ul>
        <li>
          The file is a <strong>.jpg or .png</strong> — formats Windows has supported for
          decades. A codec gap is not a plausible explanation there.
        </li>
        <li>
          The file size is <strong>0 KB</strong>, or implausibly small for a photo.
        </li>
        <li>
          It fails in <strong>every</strong> application, including a web browser. Drag it
          into a Chrome or Edge tab — browsers carry their own decoders and will often open a
          file Photos won&rsquo;t.
        </li>
        <li>
          It was interrupted mid-transfer, recovered from a failing drive, or pulled out of a
          damaged archive.
        </li>
      </ul>
      <p>
        That browser test is the quickest way to separate the two cases. If the photo displays
        in a browser tab, the data is fine and you have a codec problem. If it fails
        everywhere, the file itself is the issue, and no converter can rebuild data that
        isn&rsquo;t there.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Does converting lose quality?</h3>
      <p>
        Converting to JPG re-compresses the image, so there is some loss, though at normal
        quality settings it&rsquo;s not visible on a photo. If you want to avoid it
        entirely, convert to <Link href="/heic-png">PNG</Link>, which is lossless. PNG files
        of photographs are considerably larger, which is the trade-off.
      </p>

      <h3>Will I lose my photo&rsquo;s date or location?</h3>
      <p>
        Our converter strips metadata by default, including EXIF date and GPS coordinates.
        That&rsquo;s deliberate — it&rsquo;s the safer default when you&rsquo;re about to
        share a file. The original file on your disk is never modified, so if you need the
        metadata, keep the original alongside the converted copy.
      </p>

      <h3>Is it safe to upload my photos to a converter?</h3>
      <p>
        It&rsquo;s a fair question, and the answer for most online converters is that your
        photos really are uploaded to someone else&rsquo;s server. This one doesn&rsquo;t
        work that way: conversion runs in your browser, and no image data is sent anywhere.
        You can verify that yourself — open your browser&rsquo;s developer tools, watch the
        Network tab, and convert a file. We explain what to look for in{' '}
        <Link href="/guides/is-it-safe-to-convert-heic-online">
          is it safe to convert HEIC online
        </Link>
        .
      </p>

      <h3>Why does the error mention a format when my file has no extension?</h3>
      <p>
        Windows leans heavily on the extension to pick a codec. A file that lost its
        extension in transit gives Photos nothing to work with. Try renaming it to add{' '}
        <code>.heic</code> or <code>.jpg</code> based on where it came from — if you guess
        right, it opens.
      </p>

      <h3>Can I open HEIC in Windows Photo Viewer instead?</h3>
      <p>
        No. The older Photo Viewer predates HEIC entirely and has no path to supporting it.
        Converting, or using a browser, is the way forward.
      </p>
    </ArticleShell>
  );
}
