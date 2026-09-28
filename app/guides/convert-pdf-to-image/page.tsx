import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How to Convert a PDF to an Image (PNG or JPG)',
  description:
    'Turn a PDF page into a PNG, JPG, or WEBP image right in your browser. Learn how it works, when to pick PNG over JPG, resolution tips, and why nothing is uploaded.',
  path: '/guides/convert-pdf-to-image',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'PDF to Image', path: '/guides/convert-pdf-to-image' },
      ]}
      title="How to Convert a PDF to an Image (PNG or JPG)"
      lead="A PDF is a document, not an image — and plenty of places only accept images. Here is how to turn a PDF page into a clean PNG or JPG, when to choose each format, and how to do it without your file ever leaving your device."
    >
      <p>
        PDFs are built for documents you want to look identical everywhere — contracts,
        invoices, resumes, flyers, tickets. But an image is a different kind of thing
        entirely, and a lot of everyday tasks quietly demand one. The moment you try to
        drop a PDF into a slide, a website, or a social post, you run into the same wall:
        that box wants a PNG or a JPG, and a PDF is not one. Converting the page to an
        image is the fix, and it is quick once you know what is actually happening.
      </p>

      <h2>Why convert a PDF page to an image</h2>
      <p>
        There are more reasons than most people expect, and they tend to come up at
        awkward moments:
      </p>
      <ul>
        <li>
          <strong>Embedding in a document or slide:</strong> Word, Google Docs,
          PowerPoint, and Keynote all place images cleanly but treat a whole PDF as an
          attachment or an awkward object. An image drops in and flows with your layout.
        </li>
        <li>
          <strong>Thumbnails and previews:</strong> if you need a visual of a document —
          a cover, a preview card, a catalog entry — an image renders instantly where a
          PDF would need a viewer.
        </li>
        <li>
          <strong>Sharing a single page:</strong> sometimes you just want to show one
          page to someone without sending a file they have to open and scroll.
        </li>
        <li>
          <strong>Posting to social media:</strong> Instagram, X, LinkedIn feeds, and
          most chat apps accept images but not raw PDFs in a post.
        </li>
        <li>
          <strong>Forms and uploads that reject PDFs:</strong> plenty of web forms only
          take image types. Converting first gets you past the upload filter.
        </li>
      </ul>

      <h2>How it works</h2>
      <p>
        A PDF page is not stored as pixels — it is a set of drawing instructions for text,
        vectors, and embedded images. To make an image, that page has to be{' '}
        <strong>rendered</strong>: the instructions are drawn onto a canvas at a chosen
        resolution, and the result is saved as a flat picture. Conversion Wizard does this
        with <strong>pdf.js</strong>, the same open-source PDF engine that runs inside
        modern browsers, so the rendering happens right on your own machine.
      </p>
      <p>
        One thing to be clear about: the tool renders the <strong>first page only</strong>{' '}
        of each PDF, at high resolution. That is deliberate and it is a real limitation
        worth stating plainly rather than dressing up. If the page you want is not the
        first one, the simplest workaround is to save or extract that single page as its
        own one-page PDF first — most PDF viewers can print or export a specific page to a
        new PDF — and then convert that. You feed in the page you care about, and it comes
        out first.
      </p>

      <h2>PNG or JPG: choosing the output</h2>
      <p>
        Once the page is rendered, you decide what format to save it as. Conversion Wizard
        can output <strong>PNG</strong>, <strong>JPG</strong>, or <strong>WEBP</strong>,
        and the right pick depends on what is on the page.
      </p>
      <p>
        <strong>PNG is lossless.</strong> It records every pixel exactly, with no
        compression artifacts, which makes text edges and thin lines look crisp and clean.
        For a page that is mostly words, tables, diagrams, or line art — the typical
        document — PNG is the safe choice. Nothing smears, nothing gets fuzzy around the
        letters. If your destination specifically wants a PNG, you can go straight to our{' '}
        <Link href="/pdf-png">convert PDF to PNG</Link> tool.
      </p>
      <p>
        <strong>JPG is smaller, and best for photos.</strong> JPG uses lossy compression
        that is tuned for photographic content, so a page dominated by a full-bleed photo
        or rich gradients will come out much smaller as a JPG than as a PNG, with quality
        that looks essentially identical to the eye. The trade-off shows up on text: push
        JPG too hard and you get faint halos around letters. For a photo-heavy page where
        file size matters, JPG is the pragmatic pick — head to{' '}
        <Link href="/pdf-jpg">PDF to JPG</Link> when that is your case. WEBP sits in
        between, often beating both on size at a given quality, though a few older tools
        still do not read it.
      </p>
      <p>
        If you are still weighing the two main formats against each other in general, our{' '}
        <Link href="/png-jpg">PNG vs JPG</Link> comparison lays out the difference in more
        detail. The short version: crisp document with text and lines, choose PNG;
        photograph where size wins, choose JPG.
      </p>

      <h2>Resolution and quality</h2>
      <p>
        Because a PDF page gets rasterized into fixed pixels, resolution matters. Render
        too small and text looks soft when someone zooms in; render at high resolution and
        the image stays sharp even when enlarged or printed. Conversion Wizard renders at
        a high scale by default so your output holds up. A few things worth keeping in
        mind:
      </p>
      <ul>
        <li>
          <strong>Bigger is not free:</strong> a higher-resolution render produces a
          larger file. For a web thumbnail you do not need the same density you would want
          for print.
        </li>
        <li>
          <strong>Text is the stress test:</strong> if edges of letters look rough, that
          is usually a resolution issue, and PNG will preserve whatever sharpness the
          render produced without adding compression fuzz.
        </li>
        <li>
          <strong>You cannot recover detail that was never there:</strong> a PDF built
          from a low-quality scan will still look low-quality as an image. Conversion
          faithfully reproduces the page; it does not enhance it.
        </li>
      </ul>

      <h2>Privacy: nothing is uploaded</h2>
      <p>
        This is the part that sets an in-browser tool apart. When you convert a PDF with
        Conversion Wizard, the file is <strong>never uploaded</strong> — there is no
        server that receives it, no queue it sits in, no copy left behind somewhere. The
        rendering runs entirely inside your browser tab using your device&rsquo;s own
        processor. For anything sensitive — a signed contract, an invoice with account
        numbers, a medical form — that matters. The document stays with you from start to
        finish, and closing the tab is all the cleanup there is.
      </p>

      <h2>About the tool</h2>
      <p>
        Conversion Wizard is a <strong>free, 100% in-browser converter</strong>. It does
        one job well: it renders the first page of a PDF into a high-resolution PNG, JPG,
        or WEBP image, all on your device. You can convert in batches — up to{' '}
        <strong>50 files</strong> at a time — and download the results individually or
        bundled together as a single ZIP. Each file can be up to{' '}
        <strong>100 MB</strong>. There is no account, no watermark, and no upload.
      </p>
      <p>
        It is just as honest to say what the tool does <em>not</em> do. It does not run OCR
        or pull selectable text out of a PDF, it does not export every page of a multi-page
        document, and it is not a PDF editor. It converts a page to a picture — cleanly,
        privately, and quickly. When that is what you need, you can{' '}
        <Link href="/">start converting on the homepage</Link>.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Can I convert all pages of a multi-page PDF?</h3>
      <p>
        Not in one step — the tool renders the first page of each PDF you add. If you need
        a page other than the first, extract or save that page as its own one-page PDF in
        your PDF viewer first, then convert it. Because you can process up to 50 files at
        once, splitting a document into single-page PDFs and converting them together is a
        practical way to get several pages as images.
      </p>

      <h3>Should I choose PNG or JPG for my PDF page?</h3>
      <p>
        For a page that is mostly text, tables, or line art, pick PNG — it is lossless, so
        the letters and lines stay crisp. For a page dominated by a photograph where you
        want a smaller file, pick JPG. WEBP is a good middle ground on size if your
        destination supports it.
      </p>

      <h3>Is my PDF uploaded anywhere?</h3>
      <p>
        No. The conversion happens entirely in your browser using pdf.js. Your file is
        never sent to a server, so nothing leaves your device — which makes this a safe
        way to handle confidential documents.
      </p>

      <h3>Will the image be high enough quality to print?</h3>
      <p>
        The page is rendered at high resolution by default, which is fine for most print
        and on-screen use. Keep in mind that a render captures the page as pixels, so
        quality is capped by what the original PDF contained — a sharp source produces a
        sharp image, while a low-quality scan stays low-quality.
      </p>
    </ArticleShell>
  );
}
