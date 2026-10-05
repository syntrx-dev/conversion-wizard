import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { UniversalConverter } from '@/components/converter/UniversalConverter';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: `"Not an Accepted Image Type" — How to Fix a Rejected Upload`,
  description:
    'An upload form rejecting your photo as the wrong type usually means a HEIC from your phone. Here is how to tell what you actually have and convert it to a format the form accepts.',
  path: '/guides/not-an-accepted-image-type',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'Not an Accepted Image Type', path: '/guides/not-an-accepted-image-type' },
      ]}
      title={`"Not an Accepted Image Type" — How to Fix a Rejected Upload`}
      lead="Upload forms that reject your photo for being the wrong type are almost always looking at a HEIC file from a phone. The form wants JPG or PNG, your phone produced something else, and the error message rarely explains which."
    >
      <p>
        You&rsquo;re filling in an application, a government form, a profile, or an insurance
        claim. You attach a photo straight from your phone and the page objects — some
        variation of <strong>&ldquo;the file you selected is not an accepted image
        type&rdquo;</strong>, or a demand that you upload a JPG or PNG{' '}
        <em>instead of an accepted image type</em>. The photo looks perfectly normal on your
        phone, which makes the rejection feel arbitrary.
      </p>
      <p>
        It isn&rsquo;t arbitrary, and it&rsquo;s not a bug in the form. The form is checking
        your file&rsquo;s format against a list, and your file isn&rsquo;t on it.
      </p>

      <h2>Why your phone photo isn&rsquo;t a JPG</h2>
      <p>
        Most people assume &ldquo;photo&rdquo; means JPG. Since iOS 11, iPhones have shot in{' '}
        <strong>HEIC</strong> by default instead — a newer format that produces noticeably
        smaller files at the same quality. Many Android phones do something comparable, and
        some produce <strong>WEBP</strong> or <strong>AVIF</strong> depending on the app that
        saved the image.
      </p>
      <p>
        Those formats are genuinely better by most technical measures. The problem is that
        upload forms are conservative by design. A form built around a fixed allow-list of{' '}
        <code>.jpg</code>, <code>.jpeg</code>, <code>.png</code> and sometimes{' '}
        <code>.pdf</code> will reject everything else, no matter how modern or efficient. Many
        of these forms were written years ago and have never been updated.
      </p>
      <p>
        So the sequence is: your phone saves a HEIC, you attach it, the form sees{' '}
        <code>.heic</code>, finds it isn&rsquo;t on the list, and refuses. Your photo is
        fine. It&rsquo;s simply wearing the wrong format.
      </p>

      <h2>Find out what you actually have</h2>
      <p>
        You need the real extension, which phones tend to hide. On an iPhone, open the Files
        app, locate the photo, and long-press it for <strong>Get Info</strong>. On Windows,
        open File Explorer, go to the <strong>View</strong> tab, and tick{' '}
        <strong>File name extensions</strong>. On a Mac, press{' '}
        <strong>Command + I</strong> on the file.
      </p>
      <p>
        If you see <code>.heic</code>, <code>.heif</code>, <code>.webp</code>,{' '}
        <code>.avif</code> or a RAW extension like <code>.dng</code>, that&rsquo;s your
        answer.
      </p>
      <p>
        One trap worth naming: <strong>renaming the file does not convert it.</strong>{' '}
        Changing <code>photo.heic</code> to <code>photo.jpg</code> changes the label and
        nothing else. Some forms only check the extension and will let the renamed file
        through, and then it fails later or displays as a broken image, because the data
        inside is still HEIC. A few forms inspect the actual contents and reject it
        immediately. Either way it isn&rsquo;t a fix.
      </p>

      <h2>Convert it to something the form will accept</h2>
      <p>
        Real conversion re-encodes the image data, producing a file that is genuinely a JPG.
        Drop your photo below and you&rsquo;ll get one back. This runs entirely in your
        browser — relevant here, because the documents people attach to forms are often
        passports, IDs, bank letters and medical records, and those are exactly the files you
        shouldn&rsquo;t be uploading to an unknown server just to change their format.
      </p>

      <ToolEmbed
        title="Convert your photo to JPG"
        subtitle="HEIC, HEIF, WEBP, AVIF, PNG and more. Nothing is uploaded — it all happens on your device."
      >
        <UniversalConverter defaultTarget="jpg" />
      </ToolEmbed>

      <p>
        JPG is the safest choice for forms — it&rsquo;s the most universally accepted image
        format there is. Choose <Link href="/heic-png">PNG</Link> instead if the form
        specifically asks for it, or if the image is a scanned document or screenshot with
        text, where PNG&rsquo;s lossless compression keeps small lettering crisper.
      </p>

      <h2>If it still gets rejected after converting</h2>
      <p>
        Then the format was only half the story. Work through these:
      </p>
      <ul>
        <li>
          <strong>It&rsquo;s too big.</strong> Plenty of forms impose a size cap — commonly
          1 MB, 500 KB or 2 MB — and report it with the same vague wording. A modern phone
          photo is routinely 3&ndash;6 MB. Our{' '}
          <Link href="/guides/reduce-image-size-for-online-forms">
            guide to reducing image size for online forms
          </Link>{' '}
          covers compressing to an exact limit.
        </li>
        <li>
          <strong>The dimensions are out of range.</strong> Passport and ID photo uploads
          often demand a specific pixel size or aspect ratio, and reject anything outside it.
          The form&rsquo;s instructions usually state this, even if the error doesn&rsquo;t.
        </li>
        <li>
          <strong>The extension is uppercase.</strong> Rare, but it happens:{' '}
          <code>.JPG</code> instead of <code>.jpg</code> defeats a carelessly written check.
          Renaming to lowercase is a legitimate fix for this one.
        </li>
        <li>
          <strong>The filename has awkward characters.</strong> Accents, emoji, <code>#</code>
          , <code>&amp;</code> or very long names break some older upload handlers. Try a
          plain name like <code>photo.jpg</code>.
        </li>
        <li>
          <strong>It needs to be a PDF.</strong> Forms asking for &ldquo;documents&rdquo;
          sometimes want PDF specifically and will reject every image format.
        </li>
      </ul>

      <h2>Stop it happening again</h2>
      <p>
        If you fill in forms regularly, switch your iPhone over: <strong>Settings → Camera →
        Formats → Most Compatible</strong>. New photos are saved as JPG from then on. Photos
        already in your library stay HEIC, so you&rsquo;ll still convert those as needed —
        see <Link href="/guides/turn-off-heic-iphone">how to turn off HEIC on iPhone</Link>{' '}
        for the details.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Which format should I pick when a form doesn&rsquo;t say?</h3>
      <p>
        JPG. It is accepted essentially everywhere and produces small files. Use PNG only
        when the form asks for it, or for screenshots and scanned text.
      </p>

      <h3>Is it safe to convert an ID or passport photo here?</h3>
      <p>
        This is the right question to ask, and for most online converters the honest answer
        is no — your file is uploaded to a server you know nothing about. This tool converts
        inside your browser and sends no image data anywhere, which you can confirm yourself
        in your browser&rsquo;s Network tab. See{' '}
        <Link href="/guides/convert-images-without-uploading">
          how to convert images without uploading them
        </Link>
        .
      </p>

      <h3>Why does the form accept my photo on a computer but not my phone?</h3>
      <p>
        Usually because the two gave it different files. Sharing from an iPhone&rsquo;s Photos
        app sometimes converts to JPG automatically on the way out, while picking the file
        directly hands over the original HEIC. Same photo, different format.
      </p>

      <h3>Will converting reduce my photo&rsquo;s quality?</h3>
      <p>
        JPG is lossy, so technically yes, but at normal quality settings the difference
        isn&rsquo;t visible — and it will comfortably satisfy any form&rsquo;s requirements.
        If you need no loss at all, convert to PNG.
      </p>

      <h3>Can I convert several files at once?</h3>
      <p>
        Yes. Add as many as you need and download them individually or as one ZIP.
      </p>
    </ArticleShell>
  );
}
