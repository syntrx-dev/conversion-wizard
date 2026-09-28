/** Build a fake File for tests without touching the filesystem. */
export function makeFile(
  name: string,
  { size = 1024, type = 'image/heic' }: { size?: number; type?: string } = {},
): File {
  const blob = new Blob([new Uint8Array(Math.min(size, 8))], { type });
  const file = new File([blob], name, { type });
  // jsdom's File uses the blob length for size; override to the requested size.
  Object.defineProperty(file, 'size', { value: size });
  return file;
}
