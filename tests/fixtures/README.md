# Test fixtures

The Playwright end-to-end test (`tests/e2e/convert.spec.ts`) needs a **real HEIC
image** to exercise the full upload → convert → download flow. Place it here:

```
tests/fixtures/sample.heic
```

When the file is present, `npm run test:e2e` runs the full conversion test. When
it is absent, that test is **skipped** (the rest of the e2e suite still runs).

## Why isn't a HEIC file committed?

A valid HEIC file must be encoded with **HEVC (H.265)**, whose encoder is
patent-encumbered and therefore not bundled with common open-source image tools
(including the `sharp` build used elsewhere in this project). We deliberately do
**not** commit a HEIC we can't regenerate reproducibly, and we don't download
binaries from third parties as part of the build.

## How to add one (legally)

Any of these produce a fixture that is yours to distribute:

- **Take a photo on an iPhone/iPad** (HEIC is the default) and copy it here as
  `sample.heic`.
- **Export from macOS Preview**: open any image → File → Export → Format: HEIF.
- **Use a device/tool you own** that can encode HEIC.

Keep the fixture small (a few hundred KB is plenty) so the test stays fast.
