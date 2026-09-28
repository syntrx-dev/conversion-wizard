import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { UniversalConverter } from '@/components/converter/UniversalConverter';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: 'Best Image Format for Shopify Product Photos (2026 Guide)',
  description:
    'What format to use for Shopify product photos: how Shopify auto-serves WebP, its real size limits (up to 4472x4472, 20 MB), and whether to upload JPG, PNG, or WebP.',
  path: '/guides/best-image-format-for-shopify',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'Best Format for Shopify', path: '/guides/best-image-format-for-shopify' },
      ]}
      title="Best Image Format for Shopify Product Photos"
      lead="Upload high-quality JPG for photos and PNG when you need transparency, and let Shopify handle the rest — it already converts your images to WebP for browsers that support it. Here is what Shopify actually does behind the scenes, its real specs, and where converting yourself still helps."
    >
      <p>
        There is a lot of conflicting advice about Shopify product images, and much of it
        is out of date. The most common myth is that you have to hand-convert everything to
        WebP before uploading or your store will be slow. You do not. Shopify already does a
        surprising amount of image optimization for you automatically. Once you understand
        what the platform handles and what it does not, choosing an upload format becomes
        simple — and you can spend your energy on the things that actually move the needle,
        like image quality and file size.
      </p>

      <h2>What Shopify actually does with your images</h2>
      <p>
        When you upload a product photo, Shopify does not just serve back the exact file you
        gave it. Its content delivery network transforms images on the fly, and two of those
        transformations matter most:
      </p>
      <ul>
        <li>
          <strong>Automatic WebP delivery.</strong> Shopify detects whether the visitor's
          browser supports WebP and, if it does, serves a WebP version of your image instead
          of the original JPG or PNG — without you lifting a finger. Browsers that do not
          support WebP still get a standard JPG or PNG. This is the single biggest reason you
          do not need to convert every photo to WebP by hand.
        </li>
        <li>
          <strong>Responsive resizing.</strong> Shopify generates multiple sizes of each
          image and, through its theme's responsive markup, serves an appropriately sized
          version for the visitor's screen. A phone does not download the same enormous file
          a desktop does. That means you should upload one large, high-quality master image
          and let Shopify scale it down, rather than uploading tiny images yourself.
        </li>
      </ul>
      <p>
        In other words, a lot of the &ldquo;optimization&rdquo; work people stress about is
        already happening at the delivery layer. Your job on the upload side is narrower:
        give Shopify a clean, correctly sized, reasonably compressed master file in a format
        it can work with.
      </p>

      <h2>Shopify's real image specs</h2>
      <p>
        It helps to know the actual limits so you are not guessing. For product images,
        Shopify accepts files up to <strong>4472 x 4472 pixels</strong> (about 20 megapixels)
        and up to <strong>20 MB</strong>. Those are ceilings, not targets — you almost never
        want to push either one.
      </p>
      <p>
        The practical recommendation is a <strong>square image around 2048 x 2048 pixels</strong>.
        Square keeps your product grid tidy and consistent, and 2048 px on the long edge is
        large enough to drive Shopify's zoom feature so customers can inspect texture and
        detail. Going much larger rarely improves the visible result; it just inflates your
        master file. Shopify's supported formats for upload include JPG, PNG, and WebP (and
        others), so the format question is really about which of those you should hand it.
      </p>

      <h2>What format to upload</h2>
      <p>
        With delivery handled for you, the upload decision comes down to the nature of each
        image:
      </p>
      <ul>
        <li>
          <strong>Photographs of products: high-quality JPG.</strong> For the smooth tones,
          gradients, and detail of a real photograph, a JPG saved at high quality is an
          excellent, universally reliable master. Shopify will convert it to WebP for
          capable browsers anyway, so you get modern delivery from a format you can create in
          any editor.
        </li>
        <li>
          <strong>Logos, icons, and cutouts that need transparency: PNG.</strong> If your
          image has a transparent background — a flat-lay product cutout floating on your
          brand color, a logo, a badge — you need an alpha channel, and JPG has none (every
          JPG pixel is opaque). PNG preserves that transparency cleanly and losslessly.
        </li>
        <li>
          <strong>WebP: an optional way to control file size yourself.</strong> Uploading
          your own WebP is not required, but it can help. Because you choose the compression,
          a well-made WebP master can be meaningfully smaller than a JPG at similar quality,
          which trims your storage and your initial upload, and it supports transparency too.
          Think of it as taking manual control of size rather than a mandatory step.
        </li>
      </ul>
      <p>
        If you want the deeper reasoning behind format trade-offs on the web generally, our{' '}
        <Link href="/guides/best-image-format-for-web">best image format for the web guide</Link>{' '}
        walks through JPG, PNG, WebP, and AVIF in detail. For Shopify specifically, the short
        version is: high-quality JPG for photos, PNG for transparency, and WebP when you want
        to squeeze size down on your own terms.
      </p>

      <ToolEmbed
        title="Convert your product images"
        subtitle="Drop any image and pick PNG, JPG, or WebP — nothing is uploaded."
      >
        <UniversalConverter />
      </ToolEmbed>

      <p>
        Everything runs right here in your browser — your images never leave your device, so
        there is no upload, no account, and no waiting on a server. Drop in a photo and export
        it as a high-quality JPG for standard product shots, a PNG when you need a transparent
        background, or a WebP when you want to control the file size before it ever reaches
        Shopify. If you already have images in other formats, converting{' '}
        <Link href="/jpg-webp">JPG to WebP</Link> is the quickest way to shrink your photos,
        and <Link href="/png-webp">PNG to WebP</Link> keeps transparency intact while cutting
        the weight of your graphics.
      </p>

      <h2>Why oversized files still hurt — even with auto-optimization</h2>
      <p>
        Shopify's automatic WebP and resizing are powerful, but they are not magic. If you
        upload a 15 MB, 5000-pixel image, the platform still has to process a huge master, and
        several things can suffer. The version served to visitors is derived from what you gave
        it, so bloated, poorly compressed masters can mean heavier delivered files than
        necessary. Bigger images take longer to load, and slow-loading product pages are a
        well-documented drag on conversions — shoppers abandon pages that make them wait,
        especially on mobile connections.
      </p>
      <p>
        So the goal is a sensible master, not the largest possible one. Aim for that ~2048 px
        square, save your JPGs at high but not maximum quality, and keep individual files well
        under the 20 MB ceiling — most good product photos land comfortably in the low
        single-digit megabytes or less. That gives Shopify a clean file to optimize from and
        keeps your storefront quick.
      </p>

      <h2>A simple workflow that works</h2>
      <p>
        Put it all together and the routine is short: shoot or export your product photo,
        resize it to roughly 2048 x 2048 pixels, and decide on format by image type. For a
        normal product photo, save a high-quality JPG. For anything needing transparency, use
        PNG. If you want to shave file size yourself, export a WebP instead. Upload that single
        master, and let Shopify serve WebP and responsive sizes to your customers automatically.
        No plugin, no bulk re-encoding, no chasing every last kilobyte by hand.
      </p>
      <p>
        When you are ready to prepare your images, you can{' '}
        <Link href="/">open the converter</Link> and process a whole batch in your browser in
        seconds — free, private, and with no files ever uploaded.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Do I need to convert my Shopify images to WebP myself?</h3>
      <p>
        No. Shopify automatically serves WebP versions of your images to browsers that support
        it and falls back to JPG or PNG for those that do not. Converting to WebP yourself is
        optional — it can help you control file size and storage before upload, but it is not
        required for your store to serve modern, efficient images.
      </p>

      <h3>What size should Shopify product photos be?</h3>
      <p>
        Shopify accepts product images up to 4472 x 4472 pixels and 20 MB, but those are limits,
        not goals. A square image around 2048 x 2048 pixels is the sweet spot: consistent in your
        product grid and large enough to power Shopify's zoom, without creating an unnecessarily
        heavy master file.
      </p>

      <h3>Should I upload JPG or PNG for product images?</h3>
      <p>
        Use a high-quality JPG for standard product photographs — it handles photographic detail
        well and Shopify converts it to WebP for delivery anyway. Choose PNG when the image needs
        transparency, such as a logo or a product cutout on a transparent background, since JPG
        cannot store an alpha channel.
      </p>

      <h3>Will large image files slow down my Shopify store?</h3>
      <p>
        They can. Even though Shopify optimizes and resizes on delivery, uploading oversized,
        poorly compressed masters can lead to heavier files being served and slower product pages,
        which tends to hurt conversions. Keep images near 2048 px, save at high (not maximum)
        quality, and stay well under the 20 MB limit for fast, reliable loading.
      </p>
    </ArticleShell>
  );
}
