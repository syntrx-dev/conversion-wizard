import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';
import { CompressTool } from '@/components/tools/CompressTool';
import { ToolEmbed } from '@/components/tools/ToolEmbed';

export const metadata: Metadata = buildMetadata({
  title: "How to Reduce a Photo's File Size on iPhone",
  description:
    'iPhone photos are big and hard to shrink. Here is why, what iOS can and cannot do, and how to compress a photo to a target size right in Safari on your phone.',
  path: '/guides/reduce-photo-file-size-on-iphone',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        {
          name: 'Reduce Photo Size on iPhone',
          path: '/guides/reduce-photo-file-size-on-iphone',
        },
      ]}
      title="How to reduce a photo's file size on iPhone"
      lead="Your iPhone takes gorgeous photos, and every one of them is big. That is great until an upload form rejects the file, an email bounces it back, or an app complains it is over the limit. Here is why iPhone photos are so large, what iOS actually lets you do about it, and the one method that reliably shrinks a photo to a target size without installing anything."
    >
      <p>
        You go to attach a photo — to a job application, a rental form, an insurance
        claim, a marketplace listing — and the site pushes back: file too large, maximum
        5 MB, please upload something smaller. On a computer you would just open an editor
        and export a smaller version. On an iPhone, the obvious ways to do that are
        strangely missing, and the workarounds people suggest are either vague or make the
        photo worse. Let us clear up why the problem exists and then fix it properly.
      </p>

      <h2>Why iPhone photos are so large</h2>
      <p>
        Modern iPhones shoot at <strong>12 megapixels or more</strong> — some models
        capture 24 or 48 MP. That is a lot of detail, and detail costs bytes. A single
        photo can easily run several megabytes, and a burst or a Live Photo more still.
        The camera is doing exactly what you want when you are taking the picture; it just
        leaves you holding a file that is bigger than many upload forms and email systems
        are willing to accept.
      </p>
      <p>
        Apple softens this with its default format, <strong>HEIC</strong>, which packs a
        photo into roughly half the space of an equivalent JPG at similar quality. So HEIC
        genuinely helps keep file sizes down. The catch is compatibility: plenty of
        websites, older apps, and Windows programs cannot read HEIC at all, so the moment
        you need to share widely you often have to convert to JPG — and a JPG of the same
        photo is <em>larger</em>. You can trade size for compatibility or compatibility for
        size, but the phone will not hand you both automatically.
      </p>

      <h2>What iOS can — and cannot — do on its own</h2>
      <p>
        Here is the honest part that most articles skip: <strong>iOS has no built-in
        &quot;compress this photo to X KB&quot; button.</strong> There is no setting in
        Photos, no share-sheet action, and no toggle that lets you type a target size and
        get a file under it. Apple gives you a few partial tools that get you into the
        neighborhood, and it is worth knowing exactly what each one really does so you do
        not waste time on the ones that will not help:
      </p>
      <ul>
        <li>
          <strong>Mail&apos;s resize prompt.</strong> When you attach a photo to an email
          in the Mail app and hit send, iOS sometimes offers to send it as{' '}
          <strong>Small, Medium, Large, or Actual Size</strong>. This is the closest thing
          to built-in compression — but it only appears when emailing, the sizes are rough
          buckets rather than a number you choose, and you cannot see the resulting file
          size before you commit. It is fine for a casual email; it is not a way to hit a
          form&apos;s 2 MB limit on purpose.
        </li>
        <li>
          <strong>Screenshotting the photo.</strong> Opening a picture full-screen and
          taking a screenshot produces a smaller PNG or JPG because it is capturing at
          screen resolution, not the full 12 MP. It works in a pinch, but you lose real
          resolution, you often pick up the surrounding interface, and you have no control
          over the exact size. Treat it as a last resort, not a plan.
        </li>
        <li>
          <strong>Keeping HEIC.</strong> Leaving photos in HEIC keeps them small, which is
          why it is the default. But as noted above, that only helps if wherever you are
          sending the photo can actually open HEIC — and many places cannot.
        </li>
      </ul>
      <p>
        Notice the pattern: each native option either gives you no control over the final
        size or costs you quality you did not mean to give up. That gap is exactly why a
        purpose-built tool is so useful — and the good news is you do not need to install
        one.
      </p>

      <h2>The reliable fix: compress to a target size in Safari</h2>
      <p>
        The dependable way to shrink an iPhone photo to a size you choose is to compress it
        in your <strong>mobile browser</strong>. You do not have to install an app, create
        an account, or move the photo to a computer first. It works right on the phone, in{' '}
        <strong>Safari</strong> (or Chrome on iOS), and because the work happens inside the
        browser on your device, the photo is never uploaded anywhere. Pick a target size,
        let it compress, and save the smaller version back to your phone.
      </p>
      <p>
        Try it here — this runs entirely in mobile Safari, so tap the button below, choose
        the photo from your library, and set the size you need:
      </p>

      <ToolEmbed
        title="Shrink your iPhone photo"
        subtitle="Pick a target size — works right here in Safari, nothing is uploaded."
      >
        <CompressTool />
      </ToolEmbed>

      <p>
        Once it finishes, use the download or save option to keep the smaller file, then
        attach that version to whatever was rejecting the original. If you would rather do
        this from a laptop later, or want a full-screen version with the same controls, the
        standalone <Link href="/compress-image">compress-image tool</Link> does the exact
        same job on its own page. And if the reason you are shrinking the photo is to get it
        through an inbox, our focused walkthrough on how to{' '}
        <Link href="/guides/reduce-photo-size-for-email">reduce photo size for email</Link>{' '}
        covers the attachment limits that trip people up.
      </p>

      <h2>Convert HEIC to JPG first for compatibility</h2>
      <p>
        If the site or app that rejected your photo does not accept HEIC in the first place,
        compressing the HEIC will not help — you need a JPG. In that case, convert the photo
        first. You can{' '}
        <Link href="/heic-jpg">convert HEIC to JPG</Link> right in your browser, then
        compress the resulting JPG down to the size you need using the tool above. Doing it
        in that order — convert, then compress — means the file both opens everywhere and
        lands under the limit. If a form is refusing your picture and you are not sure
        whether it is a size problem or a format problem, converting to JPG first rules out
        the format question entirely.
      </p>
      <p>
        For a broader look at getting past HEIC everywhere it causes friction, the{' '}
        <Link href="/">HEIC converter on the home page</Link> handles the conversion in
        seconds and, like everything here, keeps the photo on your device.
      </p>

      <h2>Tips for smaller iPhone photos going forward</h2>
      <ul>
        <li>
          <strong>Resize as well as compress.</strong> A photo does not need to be 4000
          pixels wide to fill an upload form or an email. Bringing the dimensions down is
          often the single biggest saving, and the compressor handles it for you.
        </li>
        <li>
          <strong>Do not screenshot for quality-sensitive uses.</strong> The screenshot
          trick is quick, but it throws away resolution and can grab interface elements.
          Compress the real photo instead when the picture matters.
        </li>
        <li>
          <strong>Keep the original.</strong> Compress a copy for the upload and leave the
          full-quality photo in your library. You never want to overwrite the good version
          just to satisfy a one-time size limit.
        </li>
        <li>
          <strong>Match the format to the destination.</strong> JPG for photographs going
          almost anywhere; keep HEIC only when you know the other end can read it.
        </li>
      </ul>

      <h2>Frequently asked questions</h2>

      <h3>Does the iPhone have a built-in way to compress a photo to a specific size?</h3>
      <p>
        No. iOS has no setting that lets you enter a target size and shrink a photo to fit
        it. The closest native feature is Mail&apos;s Small / Medium / Large / Actual Size
        prompt when you send an email attachment, and those are rough buckets, not a size
        you choose. To hit a specific KB or MB target, compress the photo in a browser tool
        like the one on this page.
      </p>

      <h3>Can I really do this in Safari without installing an app?</h3>
      <p>
        Yes. The compressor above runs entirely inside mobile Safari (or Chrome on iOS).
        You pick the photo from your library, choose a target size, and save the smaller
        result — no app, no account, and nothing uploaded to a server. The photo is
        processed on your phone and stays there.
      </p>

      <h3>Should I convert my photo to JPG before compressing it?</h3>
      <p>
        If the place you are uploading to accepts HEIC, you can compress the HEIC directly.
        But many websites and apps cannot open HEIC, so if yours was rejected — or you are
        not sure — <Link href="/heic-jpg">convert it to JPG</Link> first, then compress the
        JPG. That way the file both opens everywhere and meets the size limit.
      </p>

      <h3>Will compressing my iPhone photo ruin the quality?</h3>
      <p>
        Not noticeably, if you keep the target sensible. Moderate compression at a
        reasonable resolution looks nearly identical to the original for ordinary photos,
        and it is far better than the screenshot trick, which discards real detail. Because
        you compress a copy, your full-quality original stays untouched in your library.
      </p>
    </ArticleShell>
  );
}
