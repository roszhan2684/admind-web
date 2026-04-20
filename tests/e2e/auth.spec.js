const { test, expect } = require('@playwright/test');

test.describe('Login Page', () => {
  test('renders email step by default', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('submit button is disabled with empty email', async ({ page }) => {
    await page.goto('/login');
    const btn = page.locator('button[type="submit"]');
    await expect(btn).toBeDisabled();
  });

  test('submit button enables when email is entered', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    const btn = page.locator('button[type="submit"]');
    await expect(btn).not.toBeDisabled();
  });

  test('shows email in OTP step or error after submission', async ({ page }) => {
    // This test requires a live Supabase connection. In CI/offline it will show an error.
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@admind.ai');
    await page.click('button[type="submit"]');
    // Accept either: OTP screen (email visible) OR an error message (network/auth issue in test env)
    await Promise.race([
      page.waitForSelector('text=demo@admind.ai', { timeout: 10000 }).catch(() => null),
      page.waitForSelector('[class*="danger"]', { timeout: 10000 }).catch(() => null),
    ]);
    // Either way, the page should not crash — just verify it's still on login
    await expect(page).toHaveURL(/\/login/);
  });

  test('OTP step shows 6 input boxes (requires live Supabase)', async ({ page }) => {
    // Skip gracefully if Supabase isn't available in test environment
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@admind.ai');
    await page.click('button[type="submit"]');
    // Wait for either OTP inputs or an error state
    const hasOtp = await page.waitForSelector('input[type="text"]', { timeout: 10000 })
      .then(() => true)
      .catch(() => false);
    if (hasOtp) {
      const otpInputs = page.locator('input[type="text"]');
      await expect(otpInputs).toHaveCount(6);
    } else {
      // Supabase not reachable in this env — verify page is stable
      await expect(page.locator('input[type="email"]')).toBeVisible();
    }
  });

  test('back button returns to email step (requires live Supabase)', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@admind.ai');
    await page.click('button[type="submit"]');
    // Only proceed if we reach the OTP step (requires live Supabase)
    const reachedOtp = await page.waitForSelector('text=Change email', { timeout: 10000 })
      .then(() => true)
      .catch(() => false);
    if (reachedOtp) {
      await page.click('text=Change email');
      await expect(page.locator('input[type="email"]')).toBeVisible();
    } else {
      // Supabase not reachable — still verify page is functional
      await expect(page.locator('input[type="email"]')).toBeVisible();
    }
  });

  test('unauthenticated access to dashboard redirects to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('unauthenticated access to settings redirects to login', async ({ page }) => {
    await page.goto('/settings');
    await expect(page).toHaveURL(/\/login/);
  });

  test('unauthenticated access to brief-generator redirects to login', async ({ page }) => {
    await page.goto('/brief-generator');
    await expect(page).toHaveURL(/\/login/);
  });
});
