import type { FaqEntry } from '@/lib/seo/structuredData';

/**
 * Canonical FAQ content. Used to render the on-page accordion AND the FAQPage
 * structured data, so the two never drift apart.
 */
export const faqEntries: FaqEntry[] = [
  {
    question: 'What is a HEIC file?',
    answer:
      'HEIC (High Efficiency Image Container) is an image format based on the HEIF standard. It stores photos using modern HEVC compression, so images take up roughly half the space of a comparable JPEG at similar quality. Apple made HEIC the default photo format on iPhones and iPads starting with iOS 11.',
  },
  {
    question: 'Why do iPhones use HEIC?',
    answer:
      'Apple adopted HEIC because it saves storage and preserves quality. HEIC also supports useful features such as transparency, image sequences, and higher bit-depth colour. The trade-off is that HEIC is not as widely supported outside the Apple ecosystem, which is why converting to PNG is often handy.',
  },
  {
    question: 'Is this HEIC-to-PNG converter free?',
    answer:
      'Yes. The converter is completely free to use with no signup, no watermarks, and no per-file limits beyond the sensible batch limits that keep your browser responsive.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer:
      'No. Conversion runs entirely in your browser using WebAssembly. Your images are read into memory, decoded, and re-encoded locally — they are never intentionally transmitted to or stored on a server.',
  },
  {
    question: 'Can I convert multiple HEIC files at once?',
    answer:
      'Yes. You can add up to 50 files per batch, convert them together, and download them individually or as a single ZIP archive. Conversions run a few at a time so large batches do not freeze your browser.',
  },
  {
    question: 'Does converting HEIC to PNG reduce image quality?',
    answer:
      'No visible quality is lost. PNG uses lossless compression, so the decoded pixels are stored exactly. By default the converter preserves the original dimensions and full quality of your photo.',
  },
  {
    question: 'Why is the PNG larger than the HEIC file?',
    answer:
      'HEIC uses efficient lossy compression, while PNG is lossless — it stores every pixel exactly without discarding data. As a result, a PNG can be several times larger than the original HEIC. That is expected and is the cost of PNG’s perfect fidelity and universal support.',
  },
  {
    question: 'Can I use this tool on an iPhone or iPad?',
    answer:
      'Yes. The converter works in mobile Safari and other modern mobile browsers. You can select photos from your library, convert them to PNG, and save or share the results directly from your device.',
  },
  {
    question: 'Does the converter preserve transparency?',
    answer:
      'When a source image contains an alpha (transparency) channel, the converter keeps it by default because PNG supports transparency. You can disable this in settings to flatten transparency onto a white background instead.',
  },
  {
    question: 'What happens to image metadata like location data?',
    answer:
      'Re-encoding the image through the browser drops most embedded metadata, including EXIF and GPS location. Removing metadata is enabled by default, so the PNGs you download generally do not carry your original photo’s location or camera details.',
  },
  {
    question: 'Why did my HEIC file fail to convert?',
    answer:
      'A file can fail if it is corrupted, incomplete, or uses a HEIC variant your browser’s decoder does not support (for example some depth or sequence formats). When that happens you will see a clear error and a retry option — you can also try opening the photo on the original device and re-exporting it.',
  },
  {
    question: 'What is the difference between HEIC and HEIF?',
    answer:
      'HEIF (High Efficiency Image Format) is the underlying container standard. HEIC is Apple’s specific implementation of HEIF that uses HEVC-encoded images and the .heic extension. In everyday use the terms overlap; this tool converts both .heic and .heif files to PNG.',
  },
];
