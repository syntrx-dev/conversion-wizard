/**
 * Long-form, per-format editorial content used to deepen every /{from}-{to}
 * converter page. Kept separate from the functional registry in
 * `lib/config/formats.ts` so the metadata stays lean. Because each converter
 * page weaves together the *source* and *target* format's content, pages stay
 * substantially different from one another (a HEIC→PNG page and a BMP→PNG page
 * share only the PNG half), which is what genuine, non-duplicate content needs.
 *
 * Everything here is factual, checkable, and deliberately free of marketing
 * fluff or invented statistics.
 */
export interface FormatContent {
  /** A plain-language paragraph: what the format is and where it comes from. */
  whatIs: string;
  /** How it actually stores/compresses an image. */
  technical: string;
  /** Genuine advantages. */
  pros: string[];
  /** Genuine limitations. */
  cons: string[];
  /** Common real-world uses. */
  useCases: string[];
}

export const formatContent: Record<string, FormatContent> = {
  heic: {
    whatIs:
      'HEIC (High Efficiency Image Container) is the format iPhones and iPads have saved photos in by default since iOS 11 in 2017. It stores one or more images inside a HEIF container, compressed with HEVC — the same codec used for high-efficiency video.',
    technical:
      'HEVC compression uses smart intra-frame prediction, variable block sizes, and efficient entropy coding to pack roughly the same visual quality into about half the bytes of a JPEG. A single HEIC file can also carry 10-bit color, an alpha channel, depth maps, and multi-frame sequences like Live Photos.',
    pros: [
      'About half the file size of a comparable JPEG',
      'Supports 10-bit color and transparency',
      'Can store Live Photos, bursts, and depth data',
    ],
    cons: [
      'Limited support outside the Apple ecosystem',
      'Frequently rejected by upload forms and web apps',
      'Windows needs an extra codec to open it',
    ],
    useCases: ['iPhone and iPad camera photos', 'Saving storage space on Apple devices'],
  },
  heif: {
    whatIs:
      'HEIF (High Efficiency Image Format) is the ISO standard container behind HEIC. Some Android phones, mirrorless cameras, and export tools use it to store high-quality photos in a fraction of the space older formats need.',
    technical:
      'Like HEIC, HEIF images are typically compressed with HEVC, giving high quality at small sizes. The container itself is flexible enough to hold transparency, image sequences, and rich metadata alongside the picture.',
    pros: [
      'Very small files for the quality delivered',
      'Modern, standardized container',
      'Supports transparency and image sequences',
    ],
    cons: [
      'Inconsistent support across apps and browsers',
      'Often rejected by upload forms',
      'Requires specific codecs to decode',
    ],
    useCases: ['Android and mirrorless-camera photos', 'Space-efficient photo storage'],
  },
  jpg: {
    whatIs:
      'JPG (also written JPEG) is the universal photo format, standardized back in 1992. It is the default for digital cameras, the web, and virtually every device and app made in the last three decades.',
    technical:
      'JPEG uses discrete cosine transform (DCT) compression, dividing the image into 8×8 pixel blocks and discarding the fine detail your eye is least likely to miss. It is lossy and limited to 8 bits per channel, with every pixel opaque — no transparency.',
    pros: [
      'Opens on essentially every device and app ever made',
      'Small files that are ideal for photographs',
      'Accepted by practically every upload form',
    ],
    cons: [
      'Lossy — a little quality is shed each time it is re-saved',
      'No transparency support',
      'Blocky artifacts and banding when pushed hard',
    ],
    useCases: ['Sharing and uploading photos', 'Email attachments', 'Web images where size matters'],
  },
  png: {
    whatIs:
      'PNG (Portable Network Graphics) is a lossless format built for the web and for graphics work. It records every pixel exactly, supports clean transparency, and opens everywhere JPG does.',
    technical:
      'PNG uses DEFLATE, a lossless compression algorithm, so re-saving never degrades the image. It supports a full 8-bit alpha channel for smooth transparency and up to 24-bit color, which is why it is the go-to for anything with sharp edges or text.',
    pros: [
      'Lossless — no quality is ever thrown away',
      'Full transparency via an alpha channel',
      'Universally supported in browsers and editors',
    ],
    cons: [
      'Larger files than JPG for photographs',
      'No animation support',
      'Overkill for large photo libraries',
    ],
    useCases: [
      'Logos, icons, and graphics',
      'Screenshots',
      'Images that need transparency',
      'Editing and long-term archiving',
    ],
  },
  webp: {
    whatIs:
      'WebP is a modern image format from Google, designed for the web. It offers both lossy and lossless modes, supports transparency and animation, and produces noticeably smaller files than JPG or PNG at similar quality.',
    technical:
      "WebP's lossy mode is based on VP8 intra-frame coding, while its lossless mode uses a dedicated predictor-based algorithm. Both modes support an alpha channel, and every current major browser can display WebP natively.",
    pros: [
      'Smaller than JPG and PNG at comparable quality',
      'Supports transparency and animation',
      'Well supported across modern browsers',
    ],
    cons: [
      'Older software may not open it',
      'Not a fit for print workflows',
      'Less universal than JPG for one-off sharing',
    ],
    useCases: ['Fast-loading website images', 'Web graphics that need transparency'],
  },
  avif: {
    whatIs:
      'AVIF (AV1 Image File Format) is one of the newest image formats, built on the AV1 video codec. It delivers excellent compression and quality — including HDR and wide color — and is supported in every current major browser.',
    technical:
      'AVIF uses AV1 intra-frame coding, which often compresses more efficiently than JPEG, WebP, or HEIC, and supports 10- and 12-bit color plus a full alpha channel. The trade-off is that encoding can be slower than older formats.',
    pros: [
      'Excellent compression and image quality',
      'Supports HDR, wide color, and transparency',
      'Supported in all current major browsers',
    ],
    cons: [
      'Older apps and operating systems may not read it',
      'Slower to encode than JPG or WebP',
      'Newer, so some tools are still catching up',
    ],
    useCases: ['Cutting-edge web images', 'High-quality photos at very small sizes'],
  },
  gif: {
    whatIs:
      'GIF (Graphics Interchange Format) dates to 1987 and is best known for simple looping animations. It is limited to a 256-color palette per frame, which makes it a poor fit for photographs but perfectly serviceable for simple graphics.',
    technical:
      'GIF uses lossless LZW compression over an indexed palette of up to 256 colors, with only 1-bit (fully on or fully off) transparency. It can bundle multiple frames for animation, but it cannot do smooth alpha or full-color photography.',
    pros: [
      'Universally supported everywhere',
      'Simple animation in a single file',
      'Fine for low-color graphics and icons',
    ],
    cons: [
      'Only 256 colors — bad for photos',
      'Only 1-bit on/off transparency',
      'Large files relative to what it delivers',
    ],
    useCases: ['Simple animations and reaction clips', 'Low-color graphics and icons'],
  },
  bmp: {
    whatIs:
      'BMP (Bitmap) is an uncompressed Windows image format from the early days of the PC. It stores raw pixel data with little or no compression, which keeps it dead simple but makes the files very large.',
    technical:
      'A BMP records each pixel’s color more or less directly, so the image is perfectly lossless but far larger than a PNG or JPG of the same picture. The common variants carry no transparency at all.',
    pros: ['Perfectly lossless', 'A very simple, predictable format', 'Fast to read and write'],
    cons: ['Very large files', 'Little or no compression', 'Poorly supported on the web'],
    useCases: ['Legacy Windows software', 'Simple lossless working files'],
  },
  svg: {
    whatIs:
      'SVG (Scalable Vector Graphics) is an XML-based vector format. Instead of a grid of pixels, it describes shapes, paths, and text with math, so it stays perfectly sharp at any size — from a favicon to a billboard.',
    technical:
      'Because an SVG is defined by geometry rather than pixels, it has no inherent resolution. Turning it into a PNG or JPG means rasterizing it at a chosen pixel size — larger sizes look crisper but produce bigger files. Conversion Wizard rasterizes up to 4096 px on the longest side.',
    pros: [
      'Infinitely scalable with zero quality loss',
      'Tiny files for logos and icons',
      'Editable as plain text or code',
    ],
    cons: [
      'Not a photographic format',
      'Rejected by many upload forms and apps',
      'Rendering can vary slightly between programs',
    ],
    useCases: ['Logos, icons, and illustrations', 'Graphics that must scale crisply'],
  },
  pdf: {
    whatIs:
      'PDF (Portable Document Format) is the universal document format, designed to preserve a page’s exact layout, text, and graphics on any device. It is built for documents rather than single images.',
    technical:
      'A PDF page can combine vector graphics, text, and embedded raster images. Turning a page into a picture means rendering it to a pixel grid at a chosen resolution — Conversion Wizard renders the first page of each PDF at high resolution.',
    pros: [
      'Looks identical on every device',
      'Ideal for documents, invoices, and scans',
      'Widely supported everywhere',
    ],
    cons: [
      'Not an image format on its own',
      'Only the first page is converted to an image here',
      'Cannot be edited as a picture',
    ],
    useCases: ['Documents, invoices, and forms', 'Scanned pages', 'Sharing a single page as an image'],
  },
};

export function getFormatContent(id: string): FormatContent | undefined {
  return formatContent[id];
}
