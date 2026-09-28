import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: 'Facebook Says Your Photo Is Too Large? How to Fix It',
  description:
    'Facebook accepts photos up to about 30 MB but re-compresses everything. Here is why huge files fail or look worse, and how to compress before uploading.',
  path: '/guides/facebook-image-too-large',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'Facebook Image Too Large', path: '/guides/facebook-image-too-large' },
      ]}
      title="Facebook Says Your Photo Is Too Large? How to Fix It"
      lead="Facebook accepts fairly big photos, but it re-compresses and shrinks everything you upload — so a giant file can fail to post or end up looking worse than a smaller one. The reliable fix is to compress and resize before you upload."
    >
      <p>
        You picked a photo, hit upload, and Facebook pushed back — an error, an endless
        spinner, or a posted image that looks softer than the original. It is a confusing
        moment, because Facebook does not actually make you fight for every kilobyte the way
        an email attachment does. Understanding what really happens to your photo the second
        it leaves your device explains both why very large files cause trouble and why the
        answer is almost never &ldquo;upload something even bigger.&rdquo;
      </p>

      <h2>What Facebook actually does with your photo</h2>
      <p>
        The key thing to understand is that Facebook does not store and display your file as
        you sent it. Every photo you upload is run through Facebook&rsquo;s own processing
        pipeline: it gets <strong>re-compressed</strong> and, if it is bigger than the sizes
        Facebook targets, <strong>downscaled</strong>. This happens to everyone, on every
        photo, no matter how carefully you exported it. You are not uploading a final image
        so much as handing Facebook a source that it re-encodes for its feed.
      </p>
      <p>
        Facebook does accept genuinely large files — the practical hard cap for a single
        photo is around <strong>30 MB</strong>. But that ceiling is not permission to upload
        your largest possible export. Because everything gets re-compressed anyway, a
        massive file mostly gives Facebook more raw material to crush, and the crushing is
        done by an automated process tuned for speed and bandwidth, not for preserving your
        specific image.
      </p>

      <h2>Why bigger can look worse</h2>
      <p>
        Facebook&rsquo;s &ldquo;high quality&rdquo; display path is built around images
        roughly <strong>2048 pixels</strong> on the long edge. When you upload a photo far
        larger than that — say a 6000-pixel-wide export straight from a camera or a modern
        phone — Facebook scales it down to fit its pipeline and applies its own compression
        on top. You have no control over the quality setting it uses in that step. The
        result is that a needlessly gigantic upload can come out <em>softer or blockier</em>
        {' '}than a photo you resized and compressed yourself before uploading.
      </p>
      <p>
        In other words, the quality question is not &ldquo;how big can I make it&rdquo; but
        &ldquo;how well can I control the version Facebook receives.&rdquo; If you hand
        Facebook a clean, correctly sized image, its re-compression has far less work to do
        and far less to spoil.
      </p>

      <h2>Where &ldquo;too large&rdquo; errors actually show up</h2>
      <p>
        A true size failure is less common than people assume, and it tends to cluster
        around a few specific situations:
      </p>
      <ul>
        <li>
          <strong>Very large files on a slow or shaky connection.</strong> A 25 MB photo
          over weak Wi-Fi or spotty mobile data can time out mid-upload and surface as an
          error, even though the file is technically under the cap.
        </li>
        <li>
          <strong>The mobile app choking.</strong> The Facebook app sometimes struggles with
          huge images or many photos at once, stalling or failing where a smaller file would
          have gone straight through.
        </li>
        <li>
          <strong>Ad, cover, and profile contexts.</strong> Business and ad tools, cover
          photos, and event images can enforce their own stricter limits and dimension
          requirements than an ordinary feed post, so a file that posts fine to your
          timeline may be rejected there.
        </li>
      </ul>
      <p>
        In nearly all of these, the same move fixes it: shrink the file before you upload so
        it transfers cleanly and lands inside whatever limit that particular surface is
        enforcing.
      </p>

      <h2>The fix: compress before you upload</h2>
      <p>
        Since Facebook is going to re-compress your photo regardless, the smart play is to
        control that first step yourself. Resize the image toward Facebook&rsquo;s sweet spot
        and bring the file size down to something that uploads reliably, then let Facebook do
        its pass on an already-reasonable file. Aim for these targets:
      </p>
      <ul>
        <li>
          <strong>Width around 2048 px</strong> on the long edge for standard feed photos —
          this matches Facebook&rsquo;s high-quality display path, so it has little reason to
          downscale further.
        </li>
        <li>
          <strong>A file size of a few MB or less.</strong> There is no fixed KB limit for a
          normal photo, but keeping it modest makes uploads fast and dodges timeout errors.
        </li>
        <li>
          <strong>Stay well under the ~30 MB cap.</strong> If a file is anywhere near that,
          it is a prime candidate for both upload failures and heavy re-compression.
        </li>
      </ul>
      <p>
        You do not need Photoshop or an account anywhere to do this. Use the compressor below
        to set a target size and shrink your photo right here — it runs entirely in your
        browser, so the image never leaves your device.
      </p>

      <ToolEmbed
        title="Compress your photo for Facebook"
        subtitle="Pick a target size — it runs in your browser, nothing is uploaded."
      >
        <CompressTool />
      </ToolEmbed>

      <p>
        Once you have a smaller file, upload that version instead of the original. If you
        want to do this again later or need finer control over the output, our standalone{' '}
        <Link href="/compress-image">compress-image tool</Link> does the same job on its own
        page, and there is a preset version if you want to land near a specific number — see{' '}
        <Link href="/compress-image-to-500kb">compress an image to 500 KB</Link> when you
        need something small enough to move quickly.
      </p>

      <h2>Extra tips for clean Facebook uploads</h2>
      <ul>
        <li>
          <strong>Upload on a solid connection.</strong> Even a well-sized file benefits from
          stable Wi-Fi. If the app keeps failing, try uploading from a browser on a computer.
        </li>
        <li>
          <strong>Do not upscale to &ldquo;improve&rdquo; quality.</strong> Enlarging a photo
          past its native resolution just makes a bigger file without adding real detail, and
          gives Facebook more to compress.
        </li>
        <li>
          <strong>Export as JPG for photos.</strong> Facebook handles JPG efficiently for
          photographic images; reserve PNG for graphics, text, and screenshots where sharp
          edges matter.
        </li>
        <li>
          <strong>Convert phone-specific formats first.</strong> If your photo is a HEIC file
          from an iPhone, convert it before uploading so nothing gets rejected for format
          reasons. Our <Link href="/">HEIC to PNG converter on the home page</Link> handles
          that in your browser.
        </li>
        <li>
          <strong>Check the context-specific rules.</strong> For cover photos, event banners,
          and ads, confirm the recommended dimensions for that placement before you export.
        </li>
      </ul>

      <h2>Frequently asked questions</h2>

      <h3>What is Facebook&rsquo;s actual size limit for a photo?</h3>
      <p>
        The practical hard cap for a single photo is around 30 MB. Facebook does not publish
        a single fixed KB limit for ordinary feed photos, so do not chase a specific small
        number — instead keep files comfortably below the cap and resized toward 2048 px, and
        you will avoid trouble. Ad and cover-photo tools can impose their own stricter limits.
      </p>

      <h3>Why does my photo look worse after posting to Facebook?</h3>
      <p>
        Because Facebook re-compresses and often downscales every upload. If you send a file
        far larger than its ~2048 px high-quality target, its automated pass shrinks and
        re-encodes it with settings you do not control. Resizing and compressing to a sensible
        size yourself first gives that pass less to degrade, so the posted result usually looks
        cleaner.
      </p>

      <h3>Will compressing my photo make it look bad?</h3>
      <p>
        Not if you do it sensibly. Moderate compression at a reasonable resolution is close to
        invisible, and it is almost always better than letting Facebook crush an oversized file
        with its own aggressive settings. The{' '}
        <Link href="/compress-image">compress-image tool</Link> lets you preview the result and
        choose a target, so you decide the trade-off rather than leaving it to Facebook.
      </p>

      <h3>Do I need an app or account to compress a photo?</h3>
      <p>
        No. The compressor embedded above and our standalone tools run entirely in your web
        browser — no upload, no sign-up, and nothing sent to a server. Your photo stays on your
        device the whole time.
      </p>
    </ArticleShell>
  );
}
