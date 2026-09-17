import { test, expect } from '@playwright/test';

// These tests only need the frontend dev server, no backend or login required.

test.describe('Public pages render', () => {
  test('home page loads with header and footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible(); // <footer>
  });

  test('catalog page loads without crashing', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/catalog');
    await expect(page.locator('body')).not.toContainText('Something went wrong');

    expect(pageErrors, `Uncaught page errors: ${pageErrors.join('; ')}`).toEqual([]);
  });

  test('login page has email and password inputs', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[name="txtLoginEmailId"]')).toBeVisible();
    await expect(page.locator('input[name="txtLoginPassword"]')).toBeVisible();
  });

  test('signup page has the core required fields', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input[name="txtSignupFullName"]')).toBeVisible();
    await expect(page.locator('input[name="txtSignupEmailId"]')).toBeVisible();
    await expect(page.locator('input[name="txtSignupPassword"]')).toBeVisible();
    await expect(page.locator('input[name="txtSignupConfirmPassword"]')).toBeVisible();
  });

  test('unknown route shows the 404 page, not a blank/crashed screen', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-12345');
    await expect(page.locator('body')).toContainText(/404|not found/i);
  });

  test('forgot-password page loads', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('input[type="email"], input#email, input[name="email"]').first()).toBeVisible();
  });
});
