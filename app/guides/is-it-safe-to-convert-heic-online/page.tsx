import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Is It Safe to Convert HEIC Online? What to Check',
  description:
    'Most online HEIC converters upload your photos to a server. Here’s how to tell whether a tool keeps your images private — and what to look for before you use one.',
  path: '/guides/is-it-safe-to-convert-heic-online',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        {
          name: 'Is it safe to convert HEIC online?',
          path: '/guides/is-it-safe-to-convert-heic-online',
        },
      ]}
      title="Is it safe to convert HEIC online?"
      lead="It depends entirely on how the tool works. The key question is simple: does your photo leave your device? Here’s how to find out before you upload anything."
    >
      <p>
        Converting a HEIC photo to a more common format is a small, everyday task — but
        the photos themselves often aren’t small or everyday. A camera roll can hold
        pictures of your family, your home, documents, receipts, or a whiteboard from
        work. That’s worth keeping in mind, because the most popular way to convert HEIC
        online is also the least private: you upload the file to someone else’s server,
        they convert it there, and they send the result back.
      </p>

      <h2>How most online converters actually work</h2>
      <p>
        The typical “convert HEIC online” website is a thin front-end over a server-side
        pipeline. When you drop in a file, it is transmitted over the internet to that
        company’s servers, decoded and re-encoded there, and the output is offered back
        for download. That means a full copy of your original image sits on a machine you
        don’t control, at least briefly.
      </p>
      <p>
        Reputable services delete those files after a set period and use encrypted
        connections. But you’re still trusting three things you can’t easily verify: that
        the upload is encrypted, that the file is actually deleted when they say it is,
        and that no third party (an analytics vendor, an ad network, a sub-processor) sees
        it along the way. For a meme, that’s fine. For personal or sensitive photos, it’s
        a lot of trust to extend to a free website.
      </p>

      <h2>The safer model: conversion in your browser</h2>
      <p>
        There’s a fundamentally different approach that avoids the upload entirely. Modern
        browsers can run the same image-decoding code that native apps use, compiled to
        WebAssembly. With that, the conversion happens <strong>on your device</strong> —
        the file is read into your browser’s memory, decoded, re-encoded, and handed back
        to you as a download, without ever being sent to a server.
      </p>
      <p>
        That’s exactly how <Link href="/heic-png">this converter</Link> works. Your images
        aren’t uploaded; they’re processed locally and released from memory when you
        remove them or close the tab. You can read the specifics on our{' '}
        <Link href="/privacy">privacy page</Link>. The practical upshot: even if you’re
        converting a photo of a passport or a private document, it doesn’t leave your
        computer or phone.
      </p>

      <h2>A checklist before you use any online converter</h2>
      <ul>
        <li>
          <strong>Does it say where conversion happens?</strong> Look for clear language
          like “in your browser,” “on your device,” “client-side,” or “no upload.” Vague
          reassurance (“we respect your privacy”) with no mechanism is a weaker signal.
        </li>
        <li>
          <strong>Is there a real privacy policy?</strong> It should state whether files
          are uploaded, how long anything is retained, and who else can access it.
        </li>
        <li>
          <strong>Is the connection secure?</strong> The address should start with{' '}
          <code>https://</code> and show a padlock. This protects data in transit, though
          it says nothing about what happens after the upload.
        </li>
        <li>
          <strong>Does it demand an account or payment for a simple conversion?</strong> A
          basic HEIC-to-PNG conversion shouldn’t require handing over an email address or
          card details.
        </li>
        <li>
          <strong>Can you test it offline?</strong> A genuinely in-browser tool will often
          still convert after the page has loaded even if you disconnect from the internet
          — a strong sign nothing is being uploaded.
        </li>
      </ul>

      <h2>When to skip online tools entirely</h2>
      <p>
        If an image is genuinely sensitive and you’re on a shared or public computer, the
        most cautious choice is an on-device method that involves no website at all: open
        the photo in your operating system’s built-in tools and export it. On a Mac,
        Preview can export HEIC to PNG or JPG. On Windows 11 with the HEIF extension
        installed, the Photos app can open and re-save it. A browser-based converter that
        runs locally sits comfortably between those options and a server upload — no
        software to install, and nothing transmitted.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Are online HEIC converters dangerous?</h3>
      <p>
        Not inherently — most are run by legitimate companies. The real issue is that the
        common ones upload your photos, so you’re trusting a third party with a copy of
        your image. Choosing a converter that processes files in your browser removes that
        risk.
      </p>

      <h3>How do I know if a converter uploads my files?</h3>
      <p>
        Check the site’s own description and privacy policy for words like “in your
        browser” or “no upload.” A practical test: load the page, then disconnect from the
        internet and try converting. If it still works, the processing is happening
        locally.
      </p>

      <h3>Is this converter safe for private photos?</h3>
      <p>
        Yes. It decodes and re-encodes images entirely on your device using WebAssembly,
        so your photos are never intentionally sent to a server. See our{' '}
        <Link href="/privacy">privacy page</Link> for details, or head straight to the{' '}
        <Link href="/heic-png">converter</Link>.
      </p>
    </ArticleShell>
  );
}
