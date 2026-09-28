declare module 'upng-js' {
  /**
   * Minimal typing for the parts of UPNG.js we use. `encode` produces a PNG
   * ArrayBuffer from raw RGBA frame(s). `cnum` controls quantisation:
   *   0   → lossless (24/32-bit)
   *   ≤256 → quantise to that many colours (indexed/palette PNG, lossy)
   */
  const UPNG: {
    encode(
      imgs: ArrayBuffer[],
      w: number,
      h: number,
      cnum: number,
      dels?: number[],
    ): ArrayBuffer;
  };
  export default UPNG;
}
