import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { UniversalConverter } from '@/components/converter/UniversalConverter';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: `"This File Type Is Not Permitted for Security Reasons" — WordPress Fix`,
  description:
    'WordPress blocks uploads outside its allow-list. Here is which image formats trigger it, why converting beats disabling the check, and how to convert in your browser.',
  path: '/guides/file-type-not-permitted-for-security-reasons',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        {
          name: 'File Type Not Permitted for Security Reasons',
          path: '/guides/file-type-not-permitted-for-security-reasons',
        },
      ]}
      title={`"Sorry, This File Type Is Not Permitted for Security Reasons"`}
      lead="WordPress refuses any upload outside its allow-list of file types. For images, the usual culprits are SVG, AVIF and HEIC — and converting is a better fix than switching the check off."
    >
      <p>
        You drag an image into the WordPress media library and get{' '}
        <strong>
          &ldquo;Sorry, this file type is not permitted for security reasons.&rdquo;
        </strong>{' '}
        Note what this error is <em>not</em> saying: it isn&rsquo;t about file size, and
        it&rsquo;s not claiming your file is malicious. WordPress maintains a list of
        extensions it will accept, your file&rsquo;s isn&rsquo;t on it, and that&rsquo;s the
        end of the conversation.
      </p>
      <p>
        The &ldquo;security reasons&rdquo; phrasing is doing real work, though, and it&rsquo;s
        worth understanding before you reach for the first fix the internet offers you.
      </p>

      <h2>Which image formats trigger it</h2>
      <ul>
        <li>
          <strong>SVG</strong> — blocked by default, always, on every WordPress install. This
          is the one case where the security wording is literal: an SVG is an XML document
          that can legitimately contain JavaScript, so an uploaded SVG is a potential
          cross-site-scripting vector. WordPress excludes it deliberately, not as an
          oversight.
        </li>
        <li>
          <strong>AVIF</strong> — WordPress has supported AVIF uploads since version 6.5. On
          anything older, it&rsquo;s rejected.
        </li>
        <li>
          <strong>HEIC / HEIF</strong> — not on the allow-list. Photos straight from an
          iPhone hit this constantly.
        </li>
        <li>
          <strong>WEBP</strong> — supported since WordPress 5.8. Only an issue on genuinely
          old installs.
        </li>
        <li>
          <strong>Camera RAW</strong> (.cr2, .nef, .arw, .dng) — not permitted, and
          wouldn&rsquo;t be much use in a web page anyway.
        </li>
      </ul>
      <p>
        The same error also appears for fonts (.woff, .woff2, .ttf), .json files and
        anything else outside the list — a common surprise when installing a theme that
        expects you to upload its font files through the media library.
      </p>
      <p>
        Your host can narrow the list further than WordPress core does, and some managed
        hosts do. If a format that should be allowed is being rejected, that&rsquo;s worth
        asking them about.
      </p>

      <h2>The fix we&rsquo;d recommend: convert the file</h2>
      <p>
        Search this error and the top result will usually tell you to add{' '}
        <code>define(&apos;ALLOW_UNFILTERED_UPLOADS&apos;, true);</code> to{' '}
        <code>wp-config.php</code>. That does work. We&rsquo;d encourage you not to do it,
        and it&rsquo;s worth being clear about why rather than just saying &ldquo;use our
        tool.&rdquo;
      </p>
      <p>
        That constant doesn&rsquo;t whitelist the one format you need. It disables the upload
        type check <strong>entirely, for every file type, site-wide</strong>, for anyone who
        can upload — including any contributor account, and including an attacker who gets
        hold of one. It is the single setting standing between a compromised login and
        someone uploading an executable PHP file into your web root. For the sake of posting
        one image, that is a poor trade.
      </p>
      <p>
        Converting to JPG or PNG solves the immediate problem and leaves your site&rsquo;s
        defences intact. For photographs, it&rsquo;s also just better practice: JPG and PNG
        are what WordPress&rsquo;s own image pipeline is built around, so thumbnails,
        responsive sizes and any optimisation plugin you use will all behave normally.
      </p>

      <ToolEmbed
        title="Convert it to a format WordPress accepts"
        subtitle="HEIC, HEIF, AVIF, SVG and more → JPG or PNG. Runs in your browser; nothing is uploaded."
      >
        <UniversalConverter defaultTarget="png" />
      </ToolEmbed>

      <p>
        Pick <strong>JPG</strong> for photographs. Pick{' '}
        <Link href="/svg-png">PNG</Link> for logos, icons and anything with flat colour or
        transparency — including SVGs, where PNG preserves the transparent background. Our{' '}
        <Link href="/guides/convert-svg-to-png">guide to converting SVG to PNG</Link>{' '}
        explains how to choose an output resolution, since you&rsquo;re turning something
        infinitely scalable into fixed pixels and that decision matters.
      </p>

      <h2>When you genuinely do need SVG</h2>
      <p>
        Sometimes a PNG won&rsquo;t do — a logo that has to stay razor-sharp on every screen
        is a real case for SVG. If so, the right approach is a plugin such as{' '}
        <strong>Safe SVG</strong>, which permits SVG uploads <em>and sanitises them</em>,
        stripping scripts and event handlers before the file is stored. That is a far
        narrower and safer change than turning off all upload filtering.
      </p>
      <p>
        If you only need the file once and don&rsquo;t want a plugin at all, you can also
        upload it outside the media library — place it in your theme folder or a subdirectory
        over SFTP and reference it directly. Fine for a one-off; awkward to maintain.
      </p>

      <h2>If it&rsquo;s a size error, not a type error</h2>
      <p>
        These two get conflated constantly. Check the exact wording:
      </p>
      <ul>
        <li>
          <strong>&ldquo;not permitted for security reasons&rdquo;</strong> — wrong format.
          Convert it.
        </li>
        <li>
          <strong>&ldquo;exceeds the maximum upload size for this site&rdquo;</strong> — the
          file is too big. That&rsquo;s a server limit, and compressing the image is the fix.
          See our guide to{' '}
          <Link href="/guides/compress-images-for-wordpress">
            compressing images for WordPress
          </Link>
          .
        </li>
      </ul>
      <p>
        It&rsquo;s entirely possible to hit both in sequence: convert a 6 MB HEIC to JPG,
        clear the type error, and immediately run into the size limit. If that happens, use
        the <Link href="/compress-image">compressor</Link> on the converted file.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Why does WordPress block SVG but not PNG?</h3>
      <p>
        Because a PNG is only pixel data — there is nothing in it a browser will execute. An
        SVG is markup, and it can carry <code>&lt;script&gt;</code> tags and event handlers
        that run when the image is viewed. The distinction is about executable content, not
        about how modern the format is.
      </p>

      <h3>Will converting to JPG hurt my site&rsquo;s performance?</h3>
      <p>
        Not meaningfully. AVIF and WEBP are more efficient per byte, which is a real
        advantage, but a correctly sized and compressed JPG is perfectly fast — and many
        WordPress hosts and plugins now generate WEBP versions automatically from whatever
        you upload, so you may get the modern format served anyway without uploading one.
      </p>

      <h3>Can I add just one file type to the allow-list?</h3>
      <p>
        Yes, via the <code>upload_mimes</code> filter in your theme or a small plugin.
        That&rsquo;s a reasonable middle ground: it permits exactly the type you want and
        leaves everything else blocked. It still won&rsquo;t sanitise SVGs, so use Safe SVG
        for those rather than just permitting them.
      </p>

      <h3>Is converting here safe for client work?</h3>
      <p>
        The conversion happens in your browser and no image data is transmitted, so
        unreleased client assets don&rsquo;t end up on a third-party server. You can verify
        that in your browser&rsquo;s Network tab, and the{' '}
        <a
          href="https://github.com/syntrx-dev/conversion-wizard"
          target="_blank"
          rel="noopener noreferrer"
        >
          source code is public
        </a>{' '}
        if you want to read it.
      </p>

      <h3>Does this affect the WordPress block editor differently?</h3>
      <p>
        No. The block editor, the classic editor and the media library all go through the same
        upload validation, so the error and the fix are identical in each.
      </p>
    </ArticleShell>
  );
}
