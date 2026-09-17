import { expect } from '@playwright/test';

/**
 * Logs in through the real UI (not localStorage injection) so the test also
 * exercises the actual login form + API call. Waits for redirect away from
 * /login as the success signal. Throws if login didn't succeed - callers
 * should only call this after confirming credentials are configured.
 *
 * Uses name-attribute selectors (still works fine now that the label htmlFor
 * mismatch and the button's missing form-submit wiring are both fixed -
 * getByLabel()/Enter-to-submit work too now, see known-bugs.spec.js and
 * auth-forms.spec.js for the regression tests covering those fixes).
 */
export async function loginAs(page, { email, password }) {
  await page.goto('/login');
  await page.locator('input[name="txtLoginEmailId"]').fill(email);
  await page.locator('input[name="txtLoginPassword"]').fill(password);
  await page.locator('#submitLogin').click();
  await expect(page).not.toHaveURL(/\/login/, { timeout: 10_000 });
}
