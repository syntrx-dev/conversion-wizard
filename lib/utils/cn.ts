/**
 * Tiny classname combiner. Filters falsy values and joins with spaces.
 * Avoids pulling in clsx/tailwind-merge for such a small need.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
