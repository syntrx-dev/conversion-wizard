import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: "Discord: \"Your Files Are Too Powerful\" — How to Fix an Image That's Too Large",
  description:
    "Discord caps free uploads at 10 MB per file (Nitro raises it). Here's why an image trips the \"too powerful\" error and how to compress it under the limit.",
  path: '/guides/discord-image-too-large',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'Discord Image Too Large', path: '/guides/discord-image-too-large' },
      ]}
      title='Discord: "Your Files Are Too Powerful" — How to Fix an Image That&apos;s Too Large'
      lead='You dropped an image into a channel and Discord bounced it back with a cheeky "Your files are too powerful" message. It is a size limit, not a compliment — and for a still image the fix is almost always to compress the file down under Discord&apos;s cap before you send it.'
    >
      <p>
        Discord&apos;s upload error is one of the friendlier ones on the internet: instead of a
        cold "file too large," you get "Your files are too powerful." Cute, but unhelpful when
        you just want to share a screenshot. The message means exactly one thing — the file you
        tried to attach is bigger than the upload limit for your account tier. Once you know
        what that limit actually is, getting an image through takes about thirty seconds.
      </p>

      <h2>What Discord&apos;s upload limit actually is</h2>
      <p>
        The number that trips most people is the <strong>free-tier limit of 10 MB per file</strong>.
        This was raised from the old 8 MB cap, so if you have read an older guide quoting 8 MB,
        that figure is out of date — free accounts now get 10 MB. If you pay for Nitro, the
        ceiling goes up sharply:
      </p>
      <ul>
        <li>
          <strong>Free:</strong> 10 MB per file (previously 8 MB).
        </li>
        <li>
          <strong>Nitro Basic:</strong> 50 MB per file.
        </li>
        <li>
          <strong>Nitro:</strong> 500 MB per file.
        </li>
      </ul>
      <p>
        The limit is applied <em>per file</em>, so attaching several images at once will trip
        the error as soon as any single one goes over your tier&apos;s cap. Some servers with a
        high boost level raise the ceiling for everyone in that server, but you cannot count on
        that — the safe assumption on a free account is 10 MB.
      </p>

      <h2>Why an image would ever hit 10 MB</h2>
      <p>
        Here is the honest part: most ordinary images never come close to 10 MB. A phone photo
        is usually 2–5 MB, and a normal screenshot is often well under 1 MB. If you are seeing
        "too powerful" on a still image, it is almost always one of a few specific culprits:
      </p>
      <ul>
        <li>
          <strong>Huge, high-resolution screenshots.</strong> A full-screen grab from a 4K or
          multi-monitor setup — especially saved as PNG — can balloon past 10 MB, since PNG
          stores detailed screens without much compression.
        </li>
        <li>
          <strong>RAW or high-bit-depth exports.</strong> A photo exported straight from a
          camera or an editor at full resolution and quality can easily clear the cap.
        </li>
        <li>
          <strong>Long or high-DPI PNGs.</strong> Tall scrolling-page captures and Retina
          screenshots pack in a lot of pixels, and pixels are what drive file size.
        </li>
      </ul>
      <p>
        It is worth being clear about one thing, because it is the most common reason people
        see this error at all: <strong>video is the usual offender, not images</strong>. A
        short screen recording or phone clip blows past 10 MB almost instantly. This guide, and
        the tool below, are about <strong>compressing images</strong> — they will not shrink a
        video file. If your "too powerful" file is an MP4 or MOV, you need a video compressor or
        a shorter clip; for a PNG or JPG, keep reading.
      </p>

      <h2>The fix: compress the image under 10 MB</h2>
      <p>
        For a still image, you do not need Nitro and you do not need to lose noticeable quality.
        The trick is that oversized screenshots and exports are almost always carrying far more
        data than the picture actually needs. Re-encoding a bloated PNG as a well-compressed
        JPG, or trimming an over-large export toward a sensible resolution, routinely drops a
        12–15 MB file to a crisp 1–2 MB — comfortably under the cap and visually identical in a
        Discord message.
      </p>
      <p>
        You can do exactly that right here. Drop your image into the compressor below, pick a
        target size under 10 MB, and download the smaller version to send. It runs entirely in
        your browser — nothing is uploaded to a server, so your image never leaves your device.
      </p>

      <ToolEmbed
        title="Compress your image for Discord"
        subtitle="Get it under 10 MB — runs in your browser, nothing is uploaded."
      >
        <CompressTool />
      </ToolEmbed>

      <p>
        Once you have the smaller file, drag <em>that</em> version into your Discord channel
        instead of the original and it will send cleanly. If you would rather work on a
        dedicated page, or want to do this again later, our standalone{' '}
        <Link href="/compress-image">compress-image tool</Link> does the same job on its own. And
        if you need to hit a specific small target — for an avatar, an emoji, or a size-limited
        bot — see our guide on how to{' '}
        <Link href="/guides/compress-photo-to-under-1mb">compress a photo to under 1MB</Link>.
      </p>

      <h2>Tips for keeping Discord images crisp</h2>
      <ul>
        <li>
          <strong>Prefer JPG for photos and screenshots of real scenes.</strong> JPG compresses
          photographic content far more efficiently than PNG, so switching format alone can put
          you under the limit with no visible loss.
        </li>
        <li>
          <strong>Keep PNG for sharp graphics and text.</strong> If your image is a UI mockup,
          diagram, or screenshot full of crisp text, PNG keeps the edges clean — just resize it
          toward a reasonable width rather than sending the full 4K capture.
        </li>
        <li>
          <strong>Resize before you compress.</strong> A screenshot does not need to be 6000 px
          wide to read well in a chat. Bringing the long edge down toward 1920–2560 px cuts the
          file size dramatically while still looking sharp on any screen.
        </li>
        <li>
          <strong>Convert phone formats first.</strong> If your image is a HEIC file from an
          iPhone, Discord may not preview it well anyway. Convert it with our{' '}
          <Link href="/">HEIC to PNG converter on the home page</Link>, then compress the result
          if it is still large.
        </li>
      </ul>

      <p>
        This is the same size problem people run into on other platforms, just with a different
        error message and a different cap. If you also post photos elsewhere, our guide on why{' '}
        <Link href="/guides/facebook-image-too-large">
          Facebook says your photo is too large
        </Link>{' '}
        covers the same compress-before-you-upload approach for a service that re-compresses
        everything you send it.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>What is the file size limit for images on Discord?</h3>
      <p>
        On a free account it is 10 MB per file — raised from the old 8 MB limit. Nitro Basic
        lifts it to 50 MB and full Nitro to 500 MB. The cap applies to each file individually,
        so any single attachment over your tier&apos;s limit triggers the "too powerful" error.
      </p>

      <h3>What does "Your files are too powerful" mean?</h3>
      <p>
        It is simply Discord&apos;s playful way of saying the file exceeds your upload size
        limit. There is nothing wrong with the image itself — it is just larger than the 10 MB
        free cap (or your Nitro cap). Compress or resize it under the limit and it will send.
      </p>

      <h3>Can this tool compress a video for Discord?</h3>
      <p>
        No. The compressor above works on images — PNG, JPG, and similar still formats. Video is
        the most common reason people hit Discord&apos;s limit, but shrinking an MP4 or MOV needs
        a dedicated video tool or a shorter/lower-resolution clip. For a still image, this is all
        you need.
      </p>

      <h3>Will compressing my image make it look bad in Discord?</h3>
      <p>
        Not if you do it sensibly. Oversized screenshots and exports carry far more data than the
        picture needs, so moderate compression is usually invisible in a chat message. The{' '}
        <Link href="/compress-image">compress-image tool</Link> lets you preview the result and
        choose the target, so you control the trade-off. And you can always start over from the{' '}
        <Link href="/">home page</Link> if you want to convert a format first.
      </p>
    </ArticleShell>
  );
}
