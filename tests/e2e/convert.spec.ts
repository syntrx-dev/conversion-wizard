import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const fixture = path.join(__dirname, '..', 'fixtures', 'sample.heic');
const hasFixture = fs.existsSync(fixture);

test.describe('HEIC to PNG converter', () => {
  test('page loads with the converter visible', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: /convert heic to png/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /upload heic or heif files/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/your images never leave your device/i).first(),
    ).toBeVisible();
  });

  test('converts a HEIC file and offers a PNG download', async ({ page }) => {
    test.skip(
      !hasFixture,
      'No tests/fixtures/sample.heic present. Add a real HEIC image (see tests/fixtures/README.md) to run this end-to-end conversion test.',
    );

    await page.goto('/');

    // Upload the HEIC fixture via the hidden file input.
    const input = page.locator('input[type="file"]').first();
    await input.setInputFiles(fixture);

    // The queue row should appear for the uploaded file.
    await expect(page.getByText('sample.heic', { exact: true })).toBeVisible();

    // Conversion completes when the per-item Download button appears. This is
    // the definitive success signal (it only renders once status is complete).
    const downloadButton = page.getByRole('button', { name: /download sample\.png/i });
    await expect(downloadButton).toBeVisible({ timeout: 60_000 });

    // The complete status badge and the PNG output name are shown.
    await expect(page.getByText('Complete', { exact: true })).toBeVisible();
    await expect(page.getByText('sample.png', { exact: true })).toBeVisible();

    // Clicking Download triggers a PNG file download.
    const downloadPromise = page.waitForEvent('download');
    await downloadButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/sample.*\.png$/i);
  });

  test('offers a reduce-size prompt that opens settings and highlights Smaller', async ({
    page,
  }) => {
    test.skip(!hasFixture, 'No tests/fixtures/sample.heic present.');

    await page.goto('/');
    await page.locator('input[type="file"]').first().setInputFiles(fixture);
    await expect(page.getByRole('button', { name: /download sample\.png/i })).toBeVisible(
      { timeout: 60_000 },
    );

    // The default is lossless, so the reduce-size prompt is offered.
    const reduceLink = page.getByRole('button', { name: /want to reduce file size/i });
    await expect(reduceLink).toBeVisible();

    await reduceLink.click();

    // Settings panel opens and the "Smaller" option is revealed + pressable.
    const smaller = page.getByRole('button', { name: /^Smaller/ });
    await expect(smaller).toBeVisible();

    // Choosing it re-converts the file smaller and removes the prompt.
    await smaller.click();
    await expect(reduceLink).toHaveCount(0, { timeout: 60_000 });
  });
});
