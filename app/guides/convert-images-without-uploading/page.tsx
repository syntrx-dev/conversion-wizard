import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleShell } from '@/components/layout/ArticleShell';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How to Convert Images Without Uploading Them',
  description:
    'Learn how to convert images without uploading them to a server. Understand client-side vs server-side converters, how in-browser conversion works, and how to verify a tool is local.',
  path: '/guides/convert-images-without-uploading',
});

export default function Page() {
  return (
    <ArticleShell
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        {
          name: 'Convert Without Uploading',
          path: '/guides/convert-images-without-uploading',
        },
      ]}
      title="How to Convert Images Without Uploading Them"
      lead="You don't have to hand your photos to a stranger's server to change their format. Modern browsers can convert images entirely on your own device — here's how that works, and how to confirm a tool actually does it."
    >
      <p>
        Changing a photo from one format to another sounds trivial, and technically it is.
        But the most common way people do it — dropping a file onto a "convert online"
        website — quietly involves shipping a full copy of that image to a computer you
        don't own. For a screenshot of a meme, nobody cares. For a scan of your passport, a
        photo of a medical form, or a picture that carries the GPS coordinates of your
        home, that's a different conversation. This guide explains why uploading is a
        privacy concern, how in-browser conversion avoids it entirely, and how you can
        verify for yourself that a converter keeps your files local.
      </p>

      <h2>Why uploading an image to a converter is a privacy concern</h2>
      <p>
        The core issue is simple: <strong>once a file lands on someone else's server, you
        lose control of it.</strong> You can't see what happens next, and you're taking the
        operator's word for the rest. That matters more than people assume, because the
        images we convert are often the sensitive ones:
      </p>
      <ul>
        <li>
          <strong>Identity and financial documents:</strong> ID scans, passports, bank
          statements, and tax forms are frequently photographed and converted for upload
          elsewhere.
        </li>
        <li>
          <strong>Personal and family photos:</strong> pictures of children, your home
          interior, or a whiteboard full of confidential work.
        </li>
        <li>
          <strong>Hidden metadata:</strong> most photos carry EXIF data — the exact date,
          camera, and often the <strong>GPS location</strong> where the shot was taken. You
          may be sharing where you live without realizing the file says so.
        </li>
      </ul>
      <p>
        Even with a well-run service, uploading means trusting several things you can't
        directly check: that the transfer was encrypted, that the file is truly deleted on
        the schedule the policy claims, that it wasn't cached by a content-delivery network
        along the way, and that no analytics vendor or sub-processor got a look. None of
        that is necessarily sinister — plenty of online converters are run by legitimate
        companies — but the point is that <em>you cannot verify any of it</em>. The privacy
        rests entirely on a promise.
      </p>

      <h2>Server-side vs. client-side: the distinction that matters</h2>
      <p>
        Nearly every image converter falls into one of two camps, and the difference
        determines whether your file ever leaves your device.
      </p>
      <p>
        A <strong>server-side (online) converter</strong> is a thin web page in front of a
        machine somewhere else. When you drop in a file, it's transmitted over the internet,
        decoded and re-encoded on that remote server, and the result is sent back for
        download. The tell-tale sign is an <strong>upload progress bar</strong> — that bar
        is your image traveling across the network. This is the default model for most
        "convert online" sites.
      </p>
      <p>
        A <strong>client-side (in-browser) converter</strong> does the whole job on your own
        computer or phone. The file is read from disk into your browser's memory, processed
        there, and handed straight back to you as a download. Nothing is transmitted; there
        is no server copy because there was never an upload. That's the model{' '}
        <Link href="/">Conversion Wizard</Link> uses — your images are read into memory,
        converted with the browser's own tools and WebAssembly, and never sent anywhere.
        Because the work happens locally, it keeps functioning even after you disconnect
        from the internet.
      </p>

      <h2>How in-browser conversion actually works</h2>
      <p>
        It's fair to be skeptical that a web page can convert an image without a server
        doing the heavy lifting. The answer is that modern browsers have quietly become
        capable enough to run the same kind of code that native desktop apps use. A few
        technologies make it possible:
      </p>
      <ul>
        <li>
          <strong>WebAssembly (Wasm) decoders:</strong> formats like HEIC and HEIF need a
          specialized decoder. Libraries such as <strong>libheif</strong> — the same
          open-source code that powers native photo apps — can be compiled to WebAssembly
          and run directly inside the browser tab, at close to native speed, entirely on
          your machine.
        </li>
        <li>
          <strong>The browser's own canvas and codec APIs:</strong> once an image is
          decoded into pixels, the browser's built-in <code>&lt;canvas&gt;</code> and image
          encoders re-encode those pixels to PNG, JPG, or WEBP. Your browser already
          contains production-grade encoders for these formats; the page just asks it to use
          them.
        </li>
        <li>
          <strong>pdf.js and similar in-browser engines:</strong> rendering a PDF page to an
          image is handled by a JavaScript/Wasm engine running locally, so even document
          conversion happens without a round trip.
        </li>
      </ul>
      <p>
        Put together, these let a converter accept a wide range of inputs — HEIC, HEIF,
        JPG, PNG, WEBP, AVIF, GIF, BMP, SVG, and PDF — and produce a clean PNG, JPG, or WEBP
        without a single byte of your image leaving the device. The processing power is
        already sitting in the browser you have open; a good tool simply puts it to work
        instead of renting a server to do it.
      </p>

      <h2>How to verify a converter is truly local</h2>
      <p>
        You don't have to take any site's word for it. Here are practical ways to check
        whether a converter really keeps your files on your device:
      </p>
      <ul>
        <li>
          <strong>Turn off the internet and try it.</strong> Load the page, then switch on
          airplane mode or unplug the network, and convert a file. If it still works, the
          conversion is happening locally — a server-side tool would simply fail.
        </li>
        <li>
          <strong>Watch for an upload progress bar.</strong> A genuinely local converter
          processes instantly with no "uploading… 42%" step, because there's nothing to
          upload.
        </li>
        <li>
          <strong>Open your browser's developer tools.</strong> In the{' '}
          <strong>Network</strong> tab, convert a file and watch the requests. A local tool
          won't show your image being sent out in a large outbound (POST) request. You'll
          see the page's own scripts load, and then silence while it works.
        </li>
        <li>
          <strong>Read how the tool describes itself.</strong> Clear, specific language like
          "in your browser," "on your device," "client-side," or "no upload" is a stronger
          signal than a vague "we value your privacy." Open-source or well-documented
          behavior is better still.
        </li>
      </ul>
      <p>
        If you want a deeper walkthrough of these checks in the context of photo formats,
        our companion guide on whether{' '}
        <Link href="/guides/is-it-safe-to-convert-heic-online">
          it is safe to convert HEIC online
        </Link>{' '}
        covers what to look for before you trust any converter with a sensitive image.
      </p>

      <h2>When a desktop app might still be the better choice</h2>
      <p>
        In-browser conversion is the right default for privacy, but it isn't the only
        private option, and a few situations still favor installed software. If you need to
        convert <strong>hundreds or thousands of files at once</strong>, a native batch tool
        can be faster and less memory-hungry than a browser tab. If you want conversion
        wired into an automated workflow or a command-line script, a desktop utility fits
        better. And your operating system already includes on-device tools: macOS Preview
        exports HEIC to PNG or JPG, and Windows 11 with the HEIF extension can re-save
        images from the Photos app — no website involved at all.
      </p>
      <p>
        The trade-off is that desktop apps need installing, updating, and trusting in their
        own right. A browser-based converter that runs locally sits neatly in between: there
        is nothing to install, it works on any device with a modern browser, and — done
        properly — nothing is transmitted. When you're ready to try it, you can{' '}
        <Link href="/heic-png">convert your files here</Link> without anything leaving your
        device.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>How can I convert an image without uploading it anywhere?</h3>
      <p>
        Use a client-side converter that runs in your browser, or your operating system's
        built-in tools. An in-browser converter reads the file into your device's memory,
        converts it there with WebAssembly and the browser's own encoders, and gives you the
        result as a download — no server, no upload. Conversion Wizard works exactly this
        way.
      </p>

      <h3>Is a converter that works offline actually private?</h3>
      <p>
        Yes — that's one of the clearest signals. If a page can still convert a file after
        you disconnect from the internet (once the page itself has loaded), then the work is
        happening on your device and nothing is being sent to a server. Server-side
        converters break the moment they lose their connection.
      </p>

      <h3>Does converting locally remove my photo's location metadata?</h3>
      <p>
        It depends on the tool and the output format, but re-encoding an image to a format
        like PNG commonly drops most EXIF fields, including GPS coordinates, because that
        data isn't carried over into the new file. The key privacy win, though, is that with
        local conversion the original — metadata and all — never leaves your device in the
        first place.
      </p>

      <h3>Are online converters unsafe to use?</h3>
      <p>
        Not inherently. Many are run by reputable companies over encrypted connections. The
        honest limitation is that you can't verify what a server does with your file after
        it arrives. For anything sensitive, a converter that processes files in your browser
        removes that uncertainty by never uploading them at all.
      </p>
    </ArticleShell>
  );
}
