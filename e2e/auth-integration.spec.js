import { test, expect } from '@playwright/test';
import { getCreds } from './utils/credentials';
import { loginAs } from './utils/login';

// Full integration coverage for the Auth feature: these tests hit the REAL running
// Oauth backend (http://localhost:8070 by default, see .env / VITE_AUTH_API_URL) -
// no mocking. Requires the Oauth service (and its MySQL database) to actually be
// running. Pairs with the backend-side AuthControllerIntegrationTest.java, which
// covers the same contract with Testcontainers instead of a browser.

test.describe('Signup -> login, real backend', () => {
  test('a brand new student can sign up and then log in', async ({ page }) => {
    const unique = Date.now();
    const email = `e2e.student.${unique}@example.com`;
    const password = 'Password123';

    await page.goto('/signup');
    await page.locator('input[name="txtSignupFullName"]').fill('E2E Student');
    await page.locator('input[name="txtSignupEmailId"]').fill(email);
    await page.locator('input[name="txtSignupPassword"]').fill(password);
    await page.locator('input[name="txtSignupConfirmPassword"]').fill(password);
    // second checkbox = "I agree to the Terms and Conditions" (first is "sign up as instructor")
    await page.locator('.custom-checkbox').nth(1).click();

    let dialogText = '';
    page.once('dialog', async (dialog) => {
      dialogText = dialog.message();
      await dialog.accept();
    });
    await page.locator('#submitSignup').click();

    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
    expect(dialogText).toMatch(/signup successful/i);

    // now log in with the account just created
    let loginDialogText = '';
    page.once('dialog', async (dialog) => {
      loginDialogText = dialog.message();
      await dialog.accept();
    });
    await page.locator('input[name="txtLoginEmailId"]').fill(email);
    await page.locator('input[name="txtLoginPassword"]').fill(password);
    await page.locator('#submitLogin').click();

    await expect(page).not.toHaveURL(/\/login/, { timeout: 10_000 });
    expect(loginDialogText).toMatch(/login successful/i);

    // authService.login() should have populated these after a real login
    const token = await page.evaluate(() => localStorage.getItem('jwtToken'));
    const storedEmail = await page.evaluate(() => localStorage.getItem('userEmail'));
    expect(token).toBeTruthy();
    expect(storedEmail).toBe(email);
  });

  test('signing up with an email that already exists is rejected', async ({ page }) => {
    const unique = Date.now();
    const email = `e2e.dup.${unique}@example.com`;
    const password = 'Password123';

    async function fillAndSubmitSignup() {
      await page.goto('/signup');
      await page.locator('input[name="txtSignupFullName"]').fill('E2E Dup');
      await page.locator('input[name="txtSignupEmailId"]').fill(email);
      await page.locator('input[name="txtSignupPassword"]').fill(password);
      await page.locator('input[name="txtSignupConfirmPassword"]').fill(password);
      await page.locator('.custom-checkbox').nth(1).click();
      await page.locator('#submitSignup').click();
    }

    // first signup succeeds
    page.once('dialog', (dialog) => dialog.accept());
    await fillAndSubmitSignup();
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });

    // second signup with the same email must fail with an inline error, not a silent success
    await fillAndSubmitSignup();
    await expect(page.getByText(/already exists|failed/i)).toBeVisible({ timeout: 10_000 });
  });

  test('logging in with the wrong password is rejected', async ({ page }) => {
    const creds = getCreds('student');
    test.skip(!creds, 'E2E_STUDENT_EMAIL/PASSWORD not configured - see e2e/README.md');

    let dialogText = '';
    page.once('dialog', async (dialog) => {
      dialogText = dialog.message();
      await dialog.accept();
    });

    await page.goto('/login');
    await page.locator('input[name="txtLoginEmailId"]').fill(creds.email);
    await page.locator('input[name="txtLoginPassword"]').fill('definitely-the-wrong-password');
    await page.locator('#submitLogin').click();

    await page.waitForTimeout(1000);
    expect(dialogText).toMatch(/login failed|invalid/i);
    // must still be on /login - a failed login must never redirect
    await expect(page).toHaveURL(/\/login/);
  });

  test('a configured student account can log in successfully', async ({ page }) => {
    const creds = getCreds('student');
    test.skip(!creds, 'E2E_STUDENT_EMAIL/PASSWORD not configured - see e2e/README.md');

    // LoginPage.jsx sends a student to "/" (not straight to the dashboard) on success.
    await loginAs(page, creds);
    const token = await page.evaluate(() => localStorage.getItem('jwtToken'));
    expect(token).toBeTruthy();
  });
});
