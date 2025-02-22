import { test, expect } from '@playwright/test';

test.describe('Game Flow', () => {
  test('should complete full game flow with correct answers', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /who wants to be a millionaire/i }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /start/i })).toBeVisible();

    await page.getByRole('button', { name: /start/i }).click();

    await expect(
      page.getByRole('heading', { name: /what is the capital of france/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /paris/i }).click();

    await expect(page.getByRole('button', { name: /paris/i })).toHaveClass(
      /correct/,
    );

    await expect(
      page.getByRole('heading', {
        name: /which planet is known as the red planet/i,
      }),
    ).toBeVisible();
  });
});

test.describe('Game Navigation', () => {
  test('should navigate between screens correctly', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /start/i }).click();
    await expect(page).toHaveURL(/.*game/);

    await page.getByRole('button', { name: /london/i }).click();
    await expect(page).toHaveURL(/.*game-over/);

    await page.getByRole('button', { name: /try again/i }).click();
    await expect(page).toHaveURL(/.*game/);
  });
});

test.describe('Mobile View', () => {
  test('should adapt to mobile screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    await page.getByRole('button', { name: /start/i }).click();
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();

    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
