/**
 * Generate a reasonably unique id for queue items. Uses crypto.randomUUID when
 * available and falls back to a timestamp+counter for older environments.
 */
let counter = 0;

export function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  counter += 1;
  return `id-${Date.now().toString(36)}-${counter.toString(36)}`;
}
