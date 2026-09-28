import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'HEIC on Android: How to View and Convert HEIC Files',
  description:
    'View HEIC files on Android with Google Photos or Files, fix apps that reject HEIC uploads, convert to PNG in Chrome, and switch your camera format.',
  path: '/guides/heic-on-android',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'HEIC on Android', path: '/guides/heic-on-android' },
      ]}
      title="HEIC on Android: how to view and convert HEIC files"
      lead="Android can usually display HEIC photos, but support depends on your Android version, your phone maker, and the specific app you're using. Here's how to reliably view HEIC files on an Android phone, why some apps still reject them, and how to convert them without installing anything."
    >
      <h2>Does Android support HEIC at all?</h2>
      <p>
        Mostly, yes. Google added HEIF decoding to the Android platform in{' '}
        <strong>Android 10</strong>, so phones running Android 10 or later can generally
        display HEIC images at the system level. But "the platform supports it" is not the
        same as "every app supports it." Phone makers such as Samsung, Google, and OnePlus
        each build their own gallery apps, and third-party apps handle image formats
        differently. The result is that the same HEIC file might open perfectly in one app
        and show a blank thumbnail in another on the same phone.
      </p>
      <p>
        HEIC files usually reach an Android phone in one of two ways: someone with an
        iPhone shares them, or you have moved photos from an old iPhone to a new Android
        device. In both cases the goal is the same, view them, and convert if an app you
        need won't take them.
      </p>

      <h2>How to view HEIC files on Android</h2>
      <p>The two most dependable viewers are already on most phones:</p>
      <ul>
        <li>
          <strong>Google Photos.</strong> It decodes HEIC reliably across recent Android
          versions and is a safe first choice. If a HEIC won't open in your phone maker's
          gallery, open the same file in Google Photos.
        </li>
        <li>
          <strong>The Files app (Files by Google).</strong> Browse to the photo and tap
          it; the built-in viewer handles HEIF on Android 10 and up.
        </li>
      </ul>
      <p>To open a HEIC that someone sent you:</p>
      <ol>
        <li>Save the file to your phone (from the chat app, email, or download).</li>
        <li>
          Open <strong>Files</strong> or <strong>Google Photos</strong> and locate it in
          your Downloads or gallery.
        </li>
        <li>
          Tap to view. If it appears as a grey box, open it in the other app instead,
          since the two use different decoding paths.
        </li>
      </ol>

      <h2>Why some apps reject HEIC uploads</h2>
      <p>
        Even when your phone can display a HEIC, you'll often hit a wall trying to upload
        one. Social apps, marketplaces, job portals, and government or banking forms
        frequently accept only JPEG and PNG. When you pick a HEIC, the app may show an
        "unsupported file type" error or silently skip it. This isn't a bug on your phone;
        the app's server simply doesn't process HEIC. Some apps quietly convert HEIC to
        JPEG for you when you share a photo, and others don't, which is why the behaviour
        feels unpredictable. When an upload is refused, converting the photo to a widely
        supported format first is the clean fix.
      </p>

      <h2>Convert HEIC to PNG right on your phone</h2>
      <p>
        You don't need to install a converter app. Our{' '}
        <Link href="/heic-png">free HEIC to PNG converter</Link> runs in the browser, and
        it works in <strong>Chrome on Android</strong> just like it does on a computer.
      </p>
      <ol>
        <li>Open the converter in Chrome (or another modern mobile browser).</li>
        <li>
          Tap the upload area and choose the HEIC photos from your gallery or Downloads.
        </li>
        <li>
          Let them convert. The images are decoded on your phone using WebAssembly, so
          they are never uploaded to a server.
        </li>
        <li>
          Download the PNG files. They save to your Downloads folder and will then upload
          cleanly to any app that rejected the original HEIC.
        </li>
      </ol>
      <p>
        Because the whole process is local, it works even on a spotty connection and keeps
        your photos private. If you specifically need smaller files for sharing, a JPEG is
        often better suited than PNG; our comparison of{' '}
        <Link href="/guides/heic-vs-jpg">HEIC vs JPG</Link> explains when to pick which.
      </p>

      <h2>Stop your phone from creating HEIC in the first place</h2>
      <p>
        If the HEIC files come from your own camera, you can switch the format so new
        photos are saved as JPEG. The setting lives in different places depending on the
        phone:
      </p>
      <ul>
        <li>
          <strong>Samsung Galaxy:</strong> open the Camera app, go to{' '}
          <strong>Settings &rarr; Advanced picture options</strong> (older models:{' '}
          <strong>Advanced options</strong>), and turn off the HEIF/high-efficiency
          picture option.
        </li>
        <li>
          <strong>Google Pixel:</strong> in the Camera app settings, look for the storage
          or picture format option; Pixels typically shoot JPEG by default but some modes
          offer efficient formats.
        </li>
        <li>
          <strong>Other Android phones:</strong> check the Camera app's own settings for a
          "picture format," "high-efficiency," or "HEIF/HEIC" toggle and switch it to
          JPEG.
        </li>
      </ul>
      <p>
        Note that this only affects photos you take from now on. HEIC files you already
        have, or that other people send you, still need to be converted.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>My gallery shows a blank thumbnail for a HEIC. Is the file broken?</h3>
      <p>
        Usually not. It normally means your gallery app can't decode HEIC even though the
        phone can. Open the same file in Google Photos or the Files app; if it appears
        there, the file is fine and only that one app lacks support.
      </p>
      <h3>Which is better to convert to on Android, PNG or JPEG?</h3>
      <p>
        PNG is lossless and ideal when you need maximum quality or transparency, but the
        files are larger. JPEG is smaller and is what most upload forms expect for photos.
        If an app rejected your HEIC and you just need it accepted, either format works;
        pick JPEG when file size matters.
      </p>
      <h3>Does converting in the browser use my mobile data?</h3>
      <p>
        Only the small amount needed to load the converter page once. The conversion
        itself happens entirely on your phone, so your photos are not uploaded and no data
        is spent sending them anywhere.
      </p>
    </ArticleShell>
  );
}
