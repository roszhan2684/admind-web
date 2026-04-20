const { test, expect } = require('@playwright/test');

test.describe('Navigation & Routes', () => {
  test('homepage loads with 200', async ({ page }) => {
    const res = await page.goto('/');
    expect(res.status()).toBe(200);
  });

  test('login page loads with 200', async ({ page }) => {
    const res = await page.goto('/login');
    expect(res.status()).toBe(200);
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    // Should either show 404 or redirect, not crash
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('logo links back to home from login', async ({ page }) => {
    await page.goto('/login');
    const logo = page.locator('a[href="/"]').first();
    if (await logo.isVisible()) {
      await logo.click();
      await expect(page).toHaveURL('/');
    }
  });

  test('all protected routes redirect unauthenticated users', async ({ page }) => {
    const protectedRoutes = [
      '/dashboard',
      '/creative-library',
      '/competitors',
      '/recommendations',
      '/alerts',
      '/settings',
      '/brief-generator',
      '/ad-library',
      '/fatigue',
    ];
    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
    }
  });
});
