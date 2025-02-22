import { test, expect } from '@playwright/test';

test.describe('Sound Functionality', () => {
  test('should toggle sound on/off', async ({ page }) => {
    await page.goto('/');

    const soundToggle = page.getByRole('button', { name: /sound/i });
    await expect(soundToggle).toBeVisible();

    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute('aria-label', 'Enable sound');

    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute('aria-label', 'Disable sound');
  });

  test('should persist sound preference', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /sound/i }).click();

    await page.reload();

    await expect(page.getByRole('button', { name: /sound/i })).toHaveAttribute(
      'aria-label',
      'Enable sound',
    );
  });
});
