import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: "WhatsApp Won't Send Your Photo? Here's How to Fix It",
  description:
    'WhatsApp compresses normal photos automatically, so "too large" is rarely the issue. Here is what actually causes stuck sends and how to fix them fast.',
  path: '/guides/whatsapp-photo-wont-send',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: "WhatsApp Photo Won't Send", path: '/guides/whatsapp-photo-wont-send' },
      ]}
      title="WhatsApp Won't Send Your Photo? Here's How to Fix It"
      lead="A photo stuck on the spinning clock, an endless upload, or a picture your friend just can't open — WhatsApp photo problems rarely come from a file being 'too large' in the way people assume. Here is what actually goes wrong, and the quickest way to get your photo moving."
    >
      <p>
        You tap send, and nothing happens. The little clock icon spins, the image sits at a
        fraction uploaded, or the recipient tells you the photo won't open on their phone. It
        is easy to assume your picture is simply too big — but with WhatsApp, that is usually
        the wrong diagnosis. WhatsApp treats a normal photo very differently from a file you
        attach as a document, and knowing which path your image took explains almost every
        stuck or failed send.
      </p>

      <h2>Normal photos are compressed automatically</h2>
      <p>
        Here is the part that surprises most people: when you send a picture the ordinary way
        — pick it from your gallery, or snap it in the chat — WhatsApp <strong>compresses and
        resizes it for you</strong> before it ever leaves your phone. It shrinks the
        resolution and re-encodes the image so it transfers quickly over mobile data. That is
        why a photo that started as a huge multi-megapixel file arrives as a much smaller,
        softer version on the other end.
      </p>
      <p>
        Because of that automatic step, a regular photo is almost never rejected for being
        &ldquo;too large.&rdquo; WhatsApp has already made it small on its own. So if a normal
        send is stuck, the file size of your original is rarely the real culprit — something
        else is going on, usually with the connection or the format.
      </p>

      <h2>Sending as a Document is where size actually bites</h2>
      <p>
        Many people who care about quality learn a trick: instead of sending a photo the
        normal way, they attach it as a <strong>Document</strong>. Doing that tells WhatsApp
        to skip its compression and send the file exactly as it is — full resolution, full
        quality. It is genuinely useful when you need the original to survive intact.
      </p>
      <p>
        But that is also exactly where size becomes a real problem. Documents are subject to
        WhatsApp's file-size ceiling, which is around <strong>100 MB</strong> per file. A
        full-quality photo usually sits well under that, but a burst of RAW images, a stitched
        panorama, or a long-exposure export can approach or exceed it and simply refuse to
        send. And even when a big document is under the cap, it has to upload at full size —
        which brings us to the most common real cause of a stuck send.
      </p>

      <h2>Slow connections are the quiet killer</h2>
      <p>
        A full-size document photo transferred over weak Wi-Fi or patchy mobile data can crawl
        for ages and then time out, surfacing as an upload that never finishes or an error you
        can't quite explain. The file was technically fine; the connection just couldn't push
        that many megabytes through before something gave up. This is where the difference
        between a normal (auto-compressed) send and a full-size document really shows: the
        compressed version flies, the raw one stalls.
      </p>
      <ul>
        <li>
          <strong>Normal send stuck?</strong> Suspect the connection or the format, not the
          file size — WhatsApp already shrank it.
        </li>
        <li>
          <strong>Document send stuck or rejected?</strong> Now size matters. A large file on
          a slow link is the classic recipe for a timeout, and anything near ~100 MB can be
          refused outright.
        </li>
        <li>
          <strong>Recipient can't open it?</strong> The format is the likely suspect —
          especially with iPhone photos, covered next.
        </li>
      </ul>

      <h2>HEIC photos from iPhones can trip up Android</h2>
      <p>
        Modern iPhones save photos in <strong>HEIC</strong>, a format that stores high quality
        in a small file. When you send such a photo the normal way, WhatsApp usually converts
        it during its own compression step, so it arrives fine. But if you send a HEIC image
        as a <strong>document</strong> to preserve quality, it travels as-is — and some Android
        phones can't preview or open a HEIC file, leaving your recipient staring at something
        they can't view. Converting the picture to a universally supported format like JPG
        first sidesteps the whole issue.
      </p>

      <h2>The fix: compress first, or convert HEIC</h2>
      <p>
        Whichever version of the problem you're hitting, the same practical move solves it:
        get the file to a sensible size and a widely supported format <em>before</em> you
        send. Compress the photo so it uploads fast at good quality, and convert it out of
        HEIC if the recipient is on Android. You don't need an app, an account, or to upload
        your photo anywhere — use the compressor below to set a target size right in your
        browser.
      </p>

      <ToolEmbed
        title="Compress your photo before sending"
        subtitle="Pick a target size — it runs in your browser, nothing is uploaded."
      >
        <CompressTool />
      </ToolEmbed>

      <p>
        Once you have a smaller file, send that version. It will transfer quickly even on a
        weak connection, and it stays comfortably under WhatsApp's document limit if you're
        sending it that way to keep quality high. If you'd rather do this on its own page or
        need to do it again later, our standalone{' '}
        <Link href="/compress-image">compress-image tool</Link> does exactly the same job. And
        if the photo is a HEIC file from an iPhone and your recipient is on Android, it's worth
        taking a moment to{' '}
        <Link href="/heic-jpg">convert HEIC to JPG</Link> so it previews everywhere.
      </p>

      <h2>Extra tips for photos that send cleanly</h2>
      <ul>
        <li>
          <strong>Send normally unless you truly need the original.</strong> The regular photo
          path is compressed and fast. Reach for Document only when full quality genuinely
          matters — and expect a bigger, slower file when you do.
        </li>
        <li>
          <strong>Get on solid Wi-Fi for big files.</strong> A full-size document photo needs
          real bandwidth. If a send keeps stalling on mobile data, switch to Wi-Fi and try
          again.
        </li>
        <li>
          <strong>Convert phone-specific formats.</strong> HEIC and other iPhone formats can
          confuse some recipients. Converting to JPG or PNG first keeps things universal — our{' '}
          <Link href="/">HEIC converter on the home page</Link> handles that in your browser.
        </li>
        <li>
          <strong>Don't fight for a specific KB number.</strong> There is no magic small size
          for a normal WhatsApp photo; just keep documents well under the ~100 MB cap and
          compress anything that's slow to send.
        </li>
      </ul>
      <p>
        Facing a similar &ldquo;too large&rdquo; message somewhere else? The same
        compress-first approach works on other platforms too — see our guide on what to do when{' '}
        <Link href="/guides/facebook-image-too-large">Facebook says your photo is too large</Link>.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Does WhatsApp have a size limit for photos?</h3>
      <p>
        For normal photo sends, size is rarely the issue because WhatsApp automatically
        compresses and resizes the image before sending. Where a limit does apply is when you
        attach a photo as a <strong>document</strong> to preserve full quality — documents are
        capped at around 100 MB per file. Most single photos are well under that, but large
        RAW or panorama exports can hit it.
      </p>

      <h3>Why is my photo stuck uploading on WhatsApp?</h3>
      <p>
        The most common cause is the connection, not the file. A full-size photo — especially
        one sent as a document — can time out on slow or shaky Wi-Fi or mobile data. Switch to
        a stronger connection, or compress the photo to a smaller size so it transfers quickly.
        The <Link href="/compress-image">compress-image tool</Link> can shrink it in seconds.
      </p>

      <h3>Why can't my friend open the photo I sent?</h3>
      <p>
        If you sent an iPhone photo as a document, it may have traveled as a HEIC file, and
        some Android phones can't preview or open HEIC. Either send it the normal way (which
        converts it), or{' '}
        <Link href="/heic-jpg">convert HEIC to JPG</Link> yourself before sending so it opens
        on any device.
      </p>

      <h3>Will sending as a document really keep my photo's quality?</h3>
      <p>
        Yes — attaching a photo as a document tells WhatsApp to skip its usual compression, so
        the recipient gets the original file. The trade-off is a larger file that uploads more
        slowly and must stay under the ~100 MB limit. If you want good quality without the
        slow, failure-prone transfer, a lightly compressed image is usually the better balance.
      </p>
    </ArticleShell>
  );
}
