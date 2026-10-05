import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { UniversalConverter } from '@/components/converter/UniversalConverter';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: `"Damaged or Use a File Format That Preview Doesn't Recognize" — Mac Fix`,
  description:
    'This macOS error rarely means a damaged file. Here is what actually causes it — including 10-bit HEIC from newer iPhones — and how to open the image right now.',
  path: '/guides/preview-doesnt-recognize-file-format',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        {
          name: 'Preview Doesn’t Recognize This File Format',
          path: '/guides/preview-doesnt-recognize-file-format',
        },
      ]}
      title={`"It May Be Damaged or Use a File Format That Preview Doesn't Recognize"`}
      lead="macOS shows this when Preview gives up on a file — but it bundles two very different problems into one sentence, and the common one isn’t damage. Here’s how to tell which you have, and how to open the image either way."
    >
      <p>
        You open an image on your Mac and get:{' '}
        <strong>
          &ldquo;The file could not be opened. It may be damaged or use a file format that
          Preview doesn&rsquo;t recognize.&rdquo;
        </strong>{' '}
        That wording is unhelpfully broad. It covers a genuinely corrupt file and a perfectly
        good file in a format this version of macOS can&rsquo;t decode, and it gives you no
        way to tell them apart. In practice the second case is far more common, and it has a
        quick fix.
      </p>

      <h2>The thirty-second test</h2>
      <p>
        Before changing anything, work out which problem you actually have. Drag the file into
        a <strong>Safari or Chrome window</strong>.
      </p>
      <ul>
        <li>
          <strong>It displays in the browser.</strong> The file is fine. Browsers ship their
          own image decoders, independent of Preview&rsquo;s, and they&rsquo;re often newer.
          You have a format-support problem, and converting solves it.
        </li>
        <li>
          <strong>It fails in the browser too.</strong> Now damage is likely, and the section
          at the end of this guide applies.
        </li>
      </ul>
      <p>
        This one test saves most people from pointlessly reinstalling macOS over a file that
        was never broken.
      </p>

      <h2>What actually triggers it</h2>

      <h3>HEIC from a recent iPhone on an older macOS</h3>
      <p>
        This is the big one, and it&rsquo;s more specific than &ldquo;old Mac can&rsquo;t do
        HEIC.&rdquo; macOS High Sierra introduced HEIC support back in 2017, so Preview will
        happily open plenty of HEIC files. The failures cluster around{' '}
        <strong>newer variants of the format</strong>.
      </p>
      <p>
        Recent iPhones increasingly record <strong>10-bit</strong> HEIC rather than 8-bit,
        and they embed colour-profile data that older decoders mishandle. The result is
        maddening: some HEIC photos open and others don&rsquo;t, on the same Mac, from the
        same phone. People reasonably conclude the failing files are corrupt. They
        aren&rsquo;t — they&rsquo;re just a flavour of HEIC that this macOS version
        doesn&rsquo;t fully implement. It&rsquo;s a documented problem on Apple&rsquo;s own
        discussion forums.
      </p>

      <h3>AVIF, and other formats newer than your macOS</h3>
      <p>
        AVIF support came to macOS relatively recently (Ventura onward in practice). On
        Monterey or earlier, an AVIF file produces exactly this error. The same logic applies
        to any format that postdates your OS: Preview can only decode what shipped with it,
        and Preview doesn&rsquo;t gain new format support through app updates the way a
        browser does.
      </p>

      <h3>Camera RAW from a camera newer than your macOS</h3>
      <p>
        RAW is not one format but hundreds of camera-specific ones. Apple adds support for
        new camera models through macOS updates, so a RAW file from a body released after
        your OS will fail even though RAW &ldquo;works&rdquo; on your Mac. Updating macOS
        often fixes this specific case outright.
      </p>

      <h3>A file whose extension lies</h3>
      <p>
        Sometimes the extension doesn&rsquo;t match the contents — a HEIC renamed to .jpg, or
        a WebP a website served as .png. Preview trusts the data over the name, finds
        something unexpected, and reports a format it doesn&rsquo;t recognise. You can check
        with Terminal:
      </p>
      <pre>
        <code>file ~/Desktop/your-photo.jpg</code>
      </pre>
      <p>
        That prints what the file genuinely is. If it says HEIF or WebP while the extension
        claims JPEG, you&rsquo;ve found your mismatch.
      </p>

      <h2>Open it now</h2>
      <p>
        Whatever the specific cause, converting to JPG or PNG sidesteps it, because those are
        formats every version of macOS has decoded for decades. This runs in your browser —
        nothing is uploaded, and it works on any Mac regardless of how old the OS is.
      </p>

      <ToolEmbed
        title="Convert it to something Preview can open"
        subtitle="HEIC, HEIF, AVIF, WEBP and more. Your photos never leave your Mac."
      >
        <UniversalConverter defaultTarget="jpg" />
      </ToolEmbed>

      <p>
        Note what this does and doesn&rsquo;t mean: the converter reads the file with your{' '}
        <em>browser&rsquo;s</em> decoders, which are newer and more complete than
        Preview&rsquo;s. That&rsquo;s exactly why it can open a file Preview refuses. If you
        want a lossless result instead of JPG, use the{' '}
        <Link href="/heic-png">HEIC to PNG converter</Link>.
      </p>

      <h2>Other things worth trying first</h2>
      <p>
        If you&rsquo;d rather keep the original format, these sometimes work:
      </p>
      <ul>
        <li>
          <strong>Open it in Photos instead of Preview.</strong> The two apps don&rsquo;t
          share the same code path, and Photos occasionally succeeds where Preview fails.
        </li>
        <li>
          <strong>Update macOS.</strong> Most of the causes above are &ldquo;this OS
          predates this format.&rdquo; An update is the direct fix — assuming your hardware
          still receives them.
        </li>
        <li>
          <strong>Quick Look it.</strong> Select the file and press space. Quick Look
          sometimes renders a thumbnail from an embedded preview even when full decoding
          fails, which at least confirms there&rsquo;s a real image in there.
        </li>
        <li>
          <strong>Re-download it.</strong> If it arrived over the web or a messaging app, an
          interrupted transfer produces a truncated file that genuinely is damaged.
        </li>
      </ul>
      <p>
        One thing we&rsquo;d steer you away from: the advice circulating about reinstalling
        macOS or creating a new administrator account to fix this. That&rsquo;s a reasonable
        step for a Preview that crashes on <em>every</em> file, which is a different symptom.
        For a single file that other apps can open, it&rsquo;s a lot of upheaval for nothing.
      </p>

      <h2>If the file genuinely is damaged</h2>
      <p>
        When the browser test also fails, the data itself is incomplete, and it&rsquo;s worth
        being straight about the limits here: no converter and no repair tool can reconstruct
        image data that was never written. What you can do is go back to the source — ask the
        sender to resend it, re-export it from the original app, or pull it from a backup or
        from iCloud, where a complete copy may still exist. If it was recovered from a failing
        drive, a partial file is often the best that exists.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Why do some HEIC photos open and others don&rsquo;t?</h3>
      <p>
        Because HEIC isn&rsquo;t a single thing. Bit depth (8-bit versus 10-bit), the
        colour profile, and which iPhone and iOS version produced it all vary, and older
        decoders handle some combinations and not others. Inconsistency is the signature of a
        codec gap, not of damage.
      </p>

      <h3>Does converting change the original file?</h3>
      <p>
        No. You get a new file; the original stays exactly as it was on disk. Nothing is
        overwritten.
      </p>

      <h3>Will the converted photo keep its date and location?</h3>
      <p>
        Metadata is stripped by default, which includes the capture date and any GPS
        coordinates. That&rsquo;s the safer default for a file you might share. Keep the
        original if you need that information preserved.
      </p>

      <h3>Can I convert a whole folder at once?</h3>
      <p>
        Yes — drop in as many files as you like and download the results as a single ZIP.
        Because the work happens on your own machine, large batches are limited by your Mac,
        not by an upload queue.
      </p>

      <h3>Is Preview&rsquo;s own Export option a fix?</h3>
      <p>
        Only if Preview can open the file in the first place, which by definition it
        can&rsquo;t here. <strong>File → Export</strong> is genuinely useful for converting
        formats Preview <em>does</em> read, so it&rsquo;s worth remembering for other
        situations.
      </p>
    </ArticleShell>
  );
}
