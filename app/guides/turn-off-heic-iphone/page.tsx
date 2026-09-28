import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How to Turn Off HEIC on iPhone and Shoot JPG Instead',
  description:
    'Stop your iPhone saving photos as HEIC. Exact steps for Settings, Camera Formats, and Transfer options — plus how to convert the HEIC photos you already have.',
  path: '/guides/turn-off-heic-iphone',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: 'Turn off HEIC on iPhone', path: '/guides/turn-off-heic-iphone' },
      ]}
      title="How to Turn Off HEIC on iPhone and Shoot JPG Instead"
      lead="Your iPhone captures HEIC by default to save space, but you can switch the camera back to universally compatible JPEG in about fifteen seconds. Here is exactly how — plus a second setting most people miss."
    >
      <p>
        If HEIC photos keep tripping up your PC, your email attachments, or a website that
        will not accept them, the cleanest fix is to stop creating them in the first
        place. iOS gives you two separate controls: one changes what the camera{' '}
        <em>captures</em>, and another changes what iOS <em>sends</em> when you transfer
        photos off the phone. Understanding both saves a lot of confusion.
      </p>

      <h2>Switch the camera to capture JPEG</h2>
      <p>
        This is the setting most people are looking for. On any iPhone or iPad running a
        modern version of iOS:
      </p>
      <ol>
        <li>
          Open the <strong>Settings</strong> app.
        </li>
        <li>
          Scroll down and tap <strong>Camera</strong>.
        </li>
        <li>
          Tap <strong>Formats</strong> (it is the first item on the Camera screen).
        </li>
        <li>
          Under <strong>Camera Capture</strong>, choose <strong>Most Compatible</strong>.
        </li>
      </ol>
      <p>That is it. Here is what the two options mean:</p>
      <ul>
        <li>
          <strong>High Efficiency</strong> — captures stills as HEIC and video as HEVC
          (H.265). Smallest files, Apple&rsquo;s default.
        </li>
        <li>
          <strong>Most Compatible</strong> — captures stills as JPEG and video as H.264.
          Larger files, but they open on essentially any device.
        </li>
      </ul>
      <p>
        A note worth knowing: on some models the <strong>Most Compatible</strong> option
        is greyed out or hidden until you turn off certain high-resolution or
        high-frame-rate video modes, because those modes require HEVC. If the switch will
        not budge, check your video format settings on the same Camera screen first.
      </p>

      <h2>This only affects new photos</h2>
      <p>
        Changing the capture format does <strong>not</strong> convert the photos already
        in your library — those stay HEIC. From the moment you flip the switch, every new
        shot is a JPEG, but everything taken before remains untouched. If you want
        everything in a compatible format, you will need to convert the existing ones
        separately (covered below).
      </p>

      <h2>The second setting: how photos transfer to a computer</h2>
      <p>
        There is a completely separate control that decides whether iOS converts your HEIC
        photos to JPEG when you move them to a Mac or PC over USB. This is why some people
        find their photos arrive as JPGs even though the camera is still set to High
        Efficiency:
      </p>
      <ol>
        <li>
          Open <strong>Settings</strong>.
        </li>
        <li>
          Tap <strong>Photos</strong>.
        </li>
        <li>
          Scroll to the bottom to <strong>Transfer to Mac or PC</strong>.
        </li>
        <li>
          Choose <strong>Automatic</strong> or <strong>Keep Originals</strong>.
        </li>
      </ol>
      <ul>
        <li>
          <strong>Automatic</strong> — iOS converts HEIC to JPEG on the fly when it
          detects the receiving computer needs a compatible format during a USB transfer.
        </li>
        <li>
          <strong>Keep Originals</strong> — transfers the raw HEIC files exactly as
          stored, no conversion.
        </li>
      </ul>
      <p>
        Setting this to <strong>Automatic</strong> is a good way to get JPGs onto a
        Windows PC without touching your camera format. Note that it governs cabled
        transfers to a computer; AirDrop to another Apple device generally keeps HEIC, and
        how a photo travels through Messages, Mail, or third-party apps depends on those
        apps.
      </p>

      <h2>The trade-off: storage versus compatibility</h2>
      <p>
        Before you switch everything to JPEG, weigh what you are giving up. HEIC files are
        roughly half the size of the equivalent JPEG at similar quality, so shooting Most
        Compatible means your photos take up noticeably more space and fill iCloud storage
        faster. You also lose HEIC extras like higher color depth and depth-map data.
      </p>
      <p>
        A practical middle path many people prefer: leave the camera on High Efficiency to
        save space, and simply convert the specific photos you need to share whenever the
        need comes up. That way you keep the storage savings and only pay the size penalty
        on the handful of images you actually send out.
      </p>

      <h2>Converting the HEIC photos you already have</h2>
      <p>For photos already sitting in your library, you have a few options:</p>
      <ul>
        <li>
          <strong>Transfer with Automatic</strong> — plug into a computer with the
          Transfer setting above set to Automatic, and iOS hands over JPGs.
        </li>
        <li>
          <strong>Email or upload them</strong> — some apps down-convert on send, though
          this is inconsistent.
        </li>
        <li>
          <strong>Convert them directly</strong> — the most reliable option when you want
          a clean, lossless copy that opens anywhere.
        </li>
      </ul>
      <p>
        Our free tool converts HEIC and HEIF to PNG right in your browser — nothing is
        uploaded to a server, so it works even for personal photos. You can{' '}
        <Link href="/heic-png">drop your files in here</Link>, or read the step-by-step
        walkthrough in{' '}
        <Link href="/convert-iphone-photos-to-png">convert iPhone photos to PNG</Link>.
        PNG gives you a pixel-perfect copy; if you specifically need JPG, the transfer
        method above is the quickest route.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Will turning off HEIC delete or change my existing photos?</h3>
      <p>
        No. Switching to Most Compatible only affects photos you take from that point on.
        Everything already in your library stays exactly as it is, still in HEIC.
      </p>

      <h3>Why is &ldquo;Most Compatible&rdquo; greyed out on my iPhone?</h3>
      <p>
        Usually because you have a video mode enabled that requires HEVC, such as 4K at a
        high frame rate or certain cinematic modes. Lower those video settings on the same
        Camera &rarr; Formats screen and the option should become selectable.
      </p>

      <h3>Should I turn HEIC off permanently?</h3>
      <p>
        Only if compatibility matters more to you than storage. HEIC saves significant
        space on your device and in iCloud. If you rarely hit compatibility problems,
        leaving it on and converting individual photos as needed is often the smarter
        choice.
      </p>
    </ArticleShell>
  );
}
