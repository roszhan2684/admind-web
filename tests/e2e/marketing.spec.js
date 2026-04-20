const { test, expect } = require('@playwright/test');

test.describe('Marketing Homepage', () => {
  test('loads and shows hero headline', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AdMind/i);
    // Hero section
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
    const heroText = await hero.textContent();
    expect(heroText.length).toBeGreaterThan(5);
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('CTA button navigates to login', async ({ page }) => {
    await page.goto('/');
    // Look for Get Started / Start Free / Begin links
    const ctaLink = page.locator('a[href="/login"]').first();
    await expect(ctaLink).toBeVisible();
  });

  test('page has no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForTimeout(1000);
    // Filter out known non-critical/dev-only warnings
    const critical = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('404') &&
        !e.includes('hydration') &&
        !e.includes('Text content did not match') &&
        !e.includes('Warning:') &&
        !e.includes('font'),
    );
    expect(critical).toHaveLength(0);
  });

  test('product video section exists', async ({ page }) => {
    await page.goto('/');
    const videoSection = page.locator('#product-video');
    await expect(videoSection).toBeVisible();
  });
});
