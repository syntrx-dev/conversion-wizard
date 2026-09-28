import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: "How to Compress Images for WordPress (Fix 'Exceeds Maximum Upload Size')",
  description:
    "WordPress rejects uploads over your host's max upload size. Here is why it happens, how to check your own limit, and how to compress images before uploading.",
  path: '/guides/compress-images-for-wordpress',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        {
          name: 'Compress Images for WordPress',
          path: '/guides/compress-images-for-wordpress',
        },
      ]}
      title="How to Compress Images for WordPress (Fix 'Exceeds Maximum Upload Size')"
      lead="WordPress stops an upload when the file is bigger than the limit your host allows. The fix that does not require touching server files is simple: shrink the image before you upload it. Here is how, and why it also makes your site faster."
    >
      <p>
        You drag a photo into the WordPress Media Library, wait a moment, and instead of a
        thumbnail you get a red error: something like &ldquo;<em>filename.jpg exceeds the
        maximum upload size for this site</em>.&rdquo; It is a frustrating wall, because the
        image is perfectly fine — it is just larger than the ceiling your particular install
        allows. The good news is that this is one of the most solvable problems in WordPress,
        and you almost never need to edit a server config file to get past it.
      </p>

      <h2>Why WordPress rejects the upload</h2>
      <p>
        WordPress runs on PHP, and PHP decides how big an uploaded file is allowed to be. Two
        settings govern this: <strong>upload_max_filesize</strong> (the largest a single file
        can be) and <strong>post_max_size</strong> (the largest a whole submission can be).
        Whichever is smaller wins. Your web host sets these values, and they vary a lot from
        one host and plan to another — you will commonly see a limit of <strong>2 MB</strong>,{' '}
        <strong>8 MB</strong>, or <strong>64 MB</strong>, but there is no single number that
        applies everywhere.
      </p>
      <p>
        That is the key honesty here: there is no universal WordPress upload limit. It is
        whatever your host has configured PHP to allow. So before you assume anything, check
        the actual number for <em>your</em> site.
      </p>

      <h2>How to find your own upload limit</h2>
      <p>
        WordPress tells you directly. In the admin dashboard, go to{' '}
        <strong>Media &rarr; Add New Media File</strong> (older versions call it{' '}
        <strong>Media &rarr; Add New</strong>). At the bottom of the uploader you will see a
        line such as &ldquo;<em>Maximum upload file size: 8 MB</em>.&rdquo; That figure is the
        real ceiling for your install — not a guess, not a number from a blog post, but what
        your server is enforcing right now. Read it, and treat any file bigger than that as
        something you need to shrink first.
      </p>
      <p>
        Raising that limit is possible — you can ask your host to bump it, or edit
        <code> php.ini</code>, <code>.htaccess</code>, or <code>wp-config.php</code> — but that
        means server-level changes, some hosts lock them down, and it does nothing for the
        real problem underneath. Which brings us to the better path.
      </p>

      <h2>Big images are a problem even when they upload</h2>
      <p>
        The upload error is really a symptom. Even if your host allowed a 20 MB photo through,
        putting it on a page would hurt you. Large images are the single most common reason
        pages load slowly, and page speed feeds directly into{' '}
        <strong>Core Web Vitals</strong> — Google&rsquo;s measurements of loading, interactivity,
        and visual stability. A heavy hero image drags down Largest Contentful Paint, and slow
        pages rank worse and lose visitors who give up waiting.
      </p>
      <p>
        So the goal is not merely &ldquo;get under the limit.&rdquo; It is to publish images
        that are the right size for how they are actually displayed. A photo shown in a
        700-pixel-wide content column does not need to be a 4000-pixel export straight off your
        camera. Serving those wasted pixels to every visitor is pure overhead.
      </p>

      <h2>The fix: compress before you upload</h2>
      <p>
        The reliable, no-server-config solution is to compress and right-size the image on your
        own device first, then upload the smaller version. Two moves do almost all the work:
      </p>
      <ul>
        <li>
          <strong>Right-size to the display width.</strong> Figure out how wide the image will
          actually appear — often somewhere between 800 and 2000 pixels depending on your theme
          — and resize it to about that. Anything wider is invisible detail the browser throws
          away anyway.
        </li>
        <li>
          <strong>Compress to a few hundred KB.</strong> For most content photos, a target in
          the low hundreds of kilobytes looks great and loads fast. That is comfortably under
          almost any host&rsquo;s limit and light on your page budget.
        </li>
      </ul>
      <p>
        You do not need a plugin or a subscription to do this. Use the compressor below to pick
        a target size and shrink your image right now — it runs entirely in your browser, so
        the file never leaves your device and nothing is uploaded to a server.
      </p>

      <ToolEmbed
        title="Compress your image for WordPress"
        subtitle="Pick a target size under your upload limit — runs in your browser, nothing uploaded."
      >
        <CompressTool />
      </ToolEmbed>

      <p>
        Once you have the smaller file, upload that to the Media Library instead of the
        original, and the &ldquo;exceeds maximum upload size&rdquo; error disappears. If you
        would rather do this on its own page or need to compress a batch of images before a big
        post, our standalone{' '}
        <Link href="/compress-image">compress-image tool</Link> does the same job. And if you
        are still deciding which file type to publish, our guide to the{' '}
        <Link href="/guides/best-image-format-for-web">best image format for the web</Link>{' '}
        walks through the trade-offs.
      </p>

      <h2>What about WebP?</h2>
      <p>
        Modern WordPress (5.8 and later) supports the <strong>WebP</strong> format, and it is
        worth using. WebP typically produces noticeably smaller files than JPG or PNG at the
        same visual quality, which means faster pages and easier uploads. Every current browser
        displays it, so there is little downside for the web. If your images are currently JPGs,
        you can convert them first — see our{' '}
        <Link href="/jpg-webp">convert JPG to WebP</Link> tool — and then compress the result
        to trim it further before uploading.
      </p>
      <p>
        A caveat worth knowing: a few hosts have PHP configured without WebP support, which can
        cause a rare upload error for that format specifically. If a WebP file is refused even
        though it is small, fall back to a well-compressed JPG, which every host accepts.
      </p>

      <h2>Extra tips for lean WordPress images</h2>
      <ul>
        <li>
          <strong>Check the limit before a big upload session.</strong> Glance at the Media
          &rarr; Add New screen so you know the number you are working under, rather than
          discovering it one failed upload at a time.
        </li>
        <li>
          <strong>Use JPG for photos, PNG for graphics.</strong> JPG compresses photographic
          images efficiently; reserve PNG for logos, screenshots, and anything with sharp text
          or flat color where crisp edges matter.
        </li>
        <li>
          <strong>Do not upscale.</strong> Enlarging a small image to look &ldquo;higher
          quality&rdquo; only inflates the file without adding real detail — and pushes you back
          toward the limit.
        </li>
        <li>
          <strong>Convert phone formats first.</strong> If your image is a HEIC file from an
          iPhone, WordPress may reject the format outright. Convert it with our{' '}
          <Link href="/">HEIC converter on the home page</Link>, then compress the result before
          uploading.
        </li>
      </ul>

      <h2>Frequently asked questions</h2>

      <h3>What is the maximum image size for WordPress?</h3>
      <p>
        There is no single answer — it depends on your host&rsquo;s PHP configuration
        (upload_max_filesize and post_max_size). It is commonly 2 MB, 8 MB, or 64 MB, but the
        only number that matters is yours. Find it under Media &rarr; Add New, where WordPress
        shows &ldquo;Maximum upload file size&rdquo; for your specific site.
      </p>

      <h3>How do I fix the &ldquo;exceeds maximum upload size&rdquo; error without editing server files?</h3>
      <p>
        Compress and resize the image before uploading so it lands under your limit. That
        sidesteps php.ini and .htaccess changes entirely. Resize toward the width the image will
        actually display at and compress to a few hundred KB — the{' '}
        <Link href="/compress-image">compress-image tool</Link> does both in your browser.
      </p>

      <h3>Will compressing images hurt my site&rsquo;s quality?</h3>
      <p>
        Not when done sensibly. Right-sizing to the display width removes only pixels no one
        sees, and moderate compression is close to invisible on screen. In exchange you get
        faster pages and better Core Web Vitals, which help both visitors and search rankings.
      </p>

      <h3>Should I use WebP for WordPress?</h3>
      <p>
        Usually yes. WordPress 5.8+ supports WebP, and it produces smaller files than JPG or PNG
        at similar quality, so pages load faster and uploads stay small. If a host has not
        enabled WebP in PHP and rejects it, a well-compressed JPG is a safe fallback.
      </p>
    </ArticleShell>
  );
}
