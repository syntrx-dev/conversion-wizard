/**
 * Site-wide "Powered by SYNTRX.DEV" attribution bar, pinned below the footer on
 * every page (rendered once in the root layout, after <Footer>). The entire
 * full-width bar is a single external link. Uses a fixed dark background
 * (theme-independent) so the white Syntrx icon stays visible in light or dark.
 */
export function PoweredBy() {
  return (
    <a
      href="https://syntrx.dev"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by SYNTRX.DEV"
      className="flex w-full items-center justify-center gap-2.5 bg-[#262626] py-3.5 no-underline transition-colors hover:bg-[#404040]"
      style={{ paddingBottom: 'calc(0.875rem + env(safe-area-inset-bottom))' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/syntrx-icon.png"
        alt="SYNTRX.DEV"
        width={22}
        height={22}
        decoding="async"
        style={{ width: 22, height: 22, minWidth: 22, maxWidth: 22 }}
        className="block h-[22px] w-[22px] min-w-[22px] max-w-[22px] shrink-0 object-contain opacity-90"
      />
      <span className="text-xs font-medium uppercase tracking-wide text-[#d4d4d4]">
        Powered by <span className="text-[#f5f5f5]">SYNTRX.DEV</span>
      </span>
    </a>
  );
}
