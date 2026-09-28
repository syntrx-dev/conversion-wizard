import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: 'How to Reduce Photo File Size for Email',
  description:
    'Email photos bouncing back as "too large"? Here are the real size limits (Gmail 25 MB, Outlook ~20 MB) and how to compress a batch of photos to a few hundred KB each.',
  path: '/guides/reduce-photo-size-for-email',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'Reduce Photo Size for Email', path: '/guides/reduce-photo-size-for-email' },
      ]}
      title="How to Reduce Photo File Size for Email"
      lead="A handful of modern phone photos can easily blow past your email provider's size limit. Here is why that happens, what the real limits are, and the simplest way to shrink a whole batch so it sends the first time."
    >
      <p>
        You attach a few photos, hit send, and the message bounces back: "attachment
        too large." It is one of the most common email frustrations, and it is getting
        worse — as phone cameras climb past 12, 24, and 48 megapixels, a single photo can
        weigh several megabytes. Attach five or six of them and you have quietly built a
        message far bigger than your provider will carry. The good news is that this is
        easy to fix, and you almost never need to sacrifice quality that actually matters
        for on-screen viewing.
      </p>

      <h2>Why email has size limits in the first place</h2>
      <p>
        Email was never designed to move large files. Every attachment gets encoded into
        text (which inflates it by roughly a third), copied into your outbox, pushed to
        your provider's servers, relayed to the recipient's servers, and stored in their
        mailbox. To keep that pipeline fast and affordable, every provider caps how big a
        single message can be — and the cap applies to the <em>whole</em> message, subject
        and text and all attachments combined, after that encoding overhead is added.
      </p>

      <h2>What the actual limits are</h2>
      <p>
        The numbers vary by provider, but the widely published, commonly cited limits are:
      </p>
      <ul>
        <li>
          <strong>Gmail:</strong> 25 MB total per message for attachments. Try to exceed
          it and Gmail offers to upload the file to Google Drive and send a link instead.
        </li>
        <li>
          <strong>Outlook.com / Hotmail:</strong> around 20 MB per message for standard
          attachments (larger files are routed through OneDrive links).
        </li>
        <li>
          <strong>Yahoo Mail:</strong> commonly cited at around 25 MB per message.
        </li>
        <li>
          <strong>Corporate and business mail servers:</strong> frequently much lower —
          10 MB is a common ceiling, and some are stricter still.
        </li>
      </ul>
      <p>
        There is one more catch that trips people up: <strong>the recipient's server has
        its own limit, and it can reject a message even when yours accepts it.</strong> If
        you send a 22 MB email from Gmail to someone whose company caps incoming mail at
        10 MB, Gmail sends it happily and their server bounces it. That is why the safe
        move is not "stay under 25 MB" — it is "stay comfortably small," because you rarely
        know the limit on the other end.
      </p>

      <h2>Why a few phone photos add up so fast</h2>
      <p>
        Modern phones save richly detailed images. A single photo from a recent iPhone or
        Android flagship can easily land in the 3-8 MB range, and a high-resolution shot
        or a screenshot-heavy image can be larger. Do the arithmetic: four photos at 5 MB
        each is 20 MB before you have typed a word — already past Outlook's ceiling, at the
        edge of Gmail's, and double what a typical corporate server will take. It does not
        take a "big" batch to overflow; it takes an ordinary one.
      </p>

      <h2>Your three options</h2>
      <p>There are really only three ways to get photos to someone by email:</p>
      <ul>
        <li>
          <strong>Send fewer at a time.</strong> Split the batch across multiple messages.
          It works, but it is tedious and the recipient gets a cluttered inbox.
        </li>
        <li>
          <strong>Use a link or cloud storage.</strong> Upload to Google Drive, OneDrive,
          Dropbox, or a similar service and paste a share link. This is the right call for
          truly large files (video, dozens of full-resolution photos), but it adds steps
          for both you and the recipient, and it assumes they can access the service.
        </li>
        <li>
          <strong>Compress the images first.</strong> For the everyday case — a few photos
          you just want someone to see — this is the simplest path. Shrink each image to a
          few hundred kilobytes and the entire batch drops well under every limit above,
          with no cloud accounts and no links to manage.
        </li>
      </ul>

      <h2>The target: a few hundred KB per photo</h2>
      <p>
        Here is the key insight that makes compression painless. When someone opens your
        photo on a phone or laptop screen, they are looking at an image maybe 1500-2500
        pixels wide, displayed at screen resolution. All the extra data in a multi-megabyte
        original — detail you would only notice when printing poster-size or cropping in
        hard — is invisible in that context. So you can throw a lot of it away and the
        photo still looks identical on screen.
      </p>
      <p>
        A practical target is <strong>200-500 KB per photo</strong>. At that size a photo
        still looks crisp on any screen, yet ten of them together come to only 2-5 MB —
        a message that sails under Gmail's 25 MB, Outlook's 20 MB, and even a strict 10 MB
        corporate limit with room to spare. If you want to be extra safe for an unknown
        recipient, aim nearer the 200 KB end; if the photos are detailed and you want a
        little more headroom on quality, 500 KB is still tiny by email standards.
      </p>
      <p>
        The tool below does exactly this, right in your browser. Pick a target size, drop
        your photos in, and it compresses them locally — nothing is uploaded to any server,
        so your images never leave your device.
      </p>

      <ToolEmbed
        title="Shrink your photos for email"
        subtitle="Pick a target size — it runs in your browser, nothing is uploaded."
      >
        <CompressTool />
      </ToolEmbed>

      <p>
        Once your photos are down to a few hundred KB each, attaching them to an email is
        the same as always — they just send the first time. If you would rather lock in a
        specific size, we have dedicated one-click tools for{' '}
        <Link href="/compress-image-to-500kb">compressing an image to 500 KB</Link> and{' '}
        <Link href="/compress-image-to-200kb">compressing to 200 KB</Link>, or you can use
        the flexible <Link href="/compress-image">image compressor</Link> to dial in any
        target you like.
      </p>

      <h2>A quick step-by-step</h2>
      <p>To get a batch of photos email-ready:</p>
      <ul>
        <li>
          <strong>Decide your target.</strong> For most emails, 200-500 KB per photo is
          the sweet spot between looking sharp and staying small.
        </li>
        <li>
          <strong>Compress each photo.</strong> Use the tool above, or one of our{' '}
          <Link href="/compress-image">compression tools</Link>. Everything happens on your
          device, so even personal photos stay private.
        </li>
        <li>
          <strong>Add up the total.</strong> Multiply your per-photo size by the number of
          images and keep the sum well under the smallest limit you might hit — under 10 MB
          is a safe universal target.
        </li>
        <li>
          <strong>Attach and send.</strong> If you are still over, either drop a couple of
          photos into a second message or switch to a cloud link for that batch.
        </li>
      </ul>

      <h2>What about quality?</h2>
      <p>
        The honest answer: for viewing on a screen, well-chosen compression is visually
        lossless — you will not see the difference at 300 KB versus 5 MB on a phone or
        laptop. Where you <em>would</em> notice is if the recipient needs to print the
        photo large, edit it professionally, or crop in tightly. In those cases, send the
        full-resolution original by cloud link. For the everyday "here are the vacation
        pictures" email, compressing to a few hundred KB is the right, simple choice.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>What is the maximum photo size I can email?</h3>
      <p>
        It depends on the provider: Gmail allows up to 25 MB total per message, Outlook.com
        around 20 MB, and many corporate servers cap it at 10 MB or less. Because the
        limit applies to the whole message and the recipient's server has its own cap, the
        practical advice is to keep your total attachments well under 10 MB whenever you
        can. Compressing each photo to 200-500 KB makes that easy.
      </p>

      <h3>Will compressing my photos make them look bad?</h3>
      <p>
        Not for on-screen viewing. Screens display images at far lower detail than a
        full-resolution photo contains, so shrinking a photo to a few hundred KB removes
        data your eye cannot see at that size. You would only notice a difference if you
        printed the image large or cropped in heavily. For emailing photos someone will
        view on a phone or computer, the quality loss is effectively invisible.
      </p>

      <h3>How many photos can I fit in one email?</h3>
      <p>
        That depends entirely on their size, which is exactly why compression helps. At
        full resolution — say 5 MB each — you can only fit three or four before hitting a
        limit. Compress them to 300 KB each and you can comfortably attach 20 or more and
        still stay under 10 MB. The number of photos is not the constraint; their combined
        file size is.
      </p>

      <h3>Should I compress or use a cloud link?</h3>
      <p>
        Compress when you have a handful of photos you just want someone to see — it keeps
        everything in one email with no extra steps. Use a cloud link (Google Drive,
        OneDrive, Dropbox) when the files are genuinely large, such as video or dozens of
        images the recipient needs at full resolution. For most everyday photo emails,{' '}
        <Link href="/">compressing first</Link> is the faster, simpler option.
      </p>
    </ArticleShell>
  );
}
