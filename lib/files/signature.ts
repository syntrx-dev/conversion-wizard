/**
 * Best-effort HEIC/HEIF file-signature (magic bytes) detection.
 *
 * HEIF-family files are ISO-BMFF containers whose header looks like:
 *   [4 bytes box size][ 'f' 't' 'y' 'p' ][ major brand ][ ... ]
 * The major brand for HEIC/HEIF images is one of a small known set.
 *
 * This is a defence-in-depth check on top of extension/MIME validation — it is
 * intentionally lenient (returns true when it cannot read the header) so we
 * never reject a real image just because signature reading failed.
 */

const HEIF_BRANDS = new Set([
  'heic',
  'heix',
  'heim',
  'heis',
  'hevc',
  'hevx',
  'heifs',
  'heif',
  'mif1',
  'msf1',
  'mif2',
]);

/** Read the first bytes of a file as an ArrayBuffer. */
async function readHeader(file: Blob, bytes = 16): Promise<Uint8Array | null> {
  try {
    const slice = file.slice(0, bytes);
    const buffer = await slice.arrayBuffer();
    return new Uint8Array(buffer);
  } catch {
    return null;
  }
}

function asciiAt(bytes: Uint8Array, offset: number, length: number): string {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    const code = bytes[offset + i];
    if (code === undefined) return out;
    out += String.fromCharCode(code);
  }
  return out;
}

/**
 * Returns true when the header looks like a HEIF-family image, OR when the
 * header could not be determined (lenient by design). Returns false only when
 * we positively identify a non-HEIF container.
 */
export async function looksLikeHeif(file: Blob): Promise<boolean> {
  const header = await readHeader(file, 16);
  if (!header || header.length < 12) return true; // can't tell — allow

  // Bytes 4–8 must be the 'ftyp' box type for an ISO-BMFF file.
  const boxType = asciiAt(header, 4, 4);
  if (boxType !== 'ftyp') {
    // Not an ISO-BMFF container at all — could still be something unusual;
    // stay lenient and let the decoder make the final call.
    return true;
  }

  const majorBrand = asciiAt(header, 8, 4).trim().toLowerCase();
  return HEIF_BRANDS.has(majorBrand);
}
