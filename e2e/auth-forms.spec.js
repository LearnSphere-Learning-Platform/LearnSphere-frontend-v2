import { test, expect } from '@playwright/test';

// Client-side form behavior that does NOT require a working backend.

test.describe('Signup form validation (client-side, no backend needed)', () => {
  test('shows an error when passwords do not match', async ({ page }) => {
    await page.goto('/signup');
    await page.locator('input[name="txtSignupFullName"]').fill('Test User');
    await page.locator('input[name="txtSignupEmailId"]').fill('test.user@example.com');
    await page.locator('input[name="txtSignupPassword"]').fill('Password123!');
    await page.locator('input[name="txtSignupConfirmPassword"]').fill('DifferentPassword!');
    await page.locator('#submitSignup').click();
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });

  test('requires agreeing to terms before submit succeeds', async ({ page }) => {
    await page.goto('/signup');
    await page.locator('input[name="txtSignupFullName"]').fill('Test User');
    await page.locator('input[name="txtSignupEmailId"]').fill('test.user@example.com');
    await page.locator('input[name="txtSignupPassword"]').fill('Password123!');
    await page.locator('input[name="txtSignupConfirmPassword"]').fill('Password123!');
    await page.locator('#submitSignup').click();
    // Scoped to the actual error banner (.text-red-600), not a bare text regex -
    // the checkbox's own always-visible label ("I agree to the Terms and
    // Conditions...") also matches /agree to the terms/i, so an unscoped
    // getByText() here was a false positive regardless of whether the real
    // validation error ever appeared.
    await expect(page.locator('.text-red-600', { hasText: /agree to the terms/i })).toBeVisible();
  });

  test('FIXED: rejects a 1-character password with a client-side strength error', async ({ page }) => {
    // Previously Signup.jsx had no password length/complexity validation - a
    // 1-character password sailed straight through to the network call. Fixed
    // by adding a minimum-length + letter-and-number check before submit.
    await page.goto('/signup');
    await page.locator('input[name="txtSignupFullName"]').fill('Test User');
    await page.locator('input[name="txtSignupEmailId"]').fill('weak.pw.test@example.com');
    await page.locator('input[name="txtSignupPassword"]').fill('a');
    await page.locator('input[name="txtSignupConfirmPassword"]').fill('a');
    await page.locator('.custom-checkbox').nth(1).click();
    await page.locator('#submitSignup').click();
    await expect(page.getByText(/password must be at least 8 characters/i)).toBeVisible();
  });

  test('FIXED: accepts a strong password and gets past client-side validation', async ({ page }) => {
    await page.goto('/signup');
    await page.locator('input[name="txtSignupFullName"]').fill('Test User');
    await page.locator('input[name="txtSignupEmailId"]').fill('strong.pw.test@example.com');
    await page.locator('input[name="txtSignupPassword"]').fill('Password123!');
    await page.locator('input[name="txtSignupConfirmPassword"]').fill('Password123!');
    await page.locator('.custom-checkbox').nth(1).click();
    await page.locator('#submitSignup').click();
    // Scoped to the error banner for the same reason as above - the unscoped
    // regex always matched the checkbox's static "agree to the terms" label
    // text, so this assertion could never pass regardless of the real bug.
    await expect(page.locator('.text-red-600')).toHaveCount(0);
  });
});

test.describe('Login form', () => {
  test('FIXED: pressing Enter in the password field submits the form', async ({ page }) => {
    // Previously LoginPage.jsx's submit <button type="button"> was only wired
    // via onClick with no form onSubmit, so Enter did nothing. Fixed by giving
    // the button type="submit" and the <form> an onSubmit={handleLogin}.
    // handleLogin() always window.alert()s on success or failure (even against
    // an unreachable backend, via the catch branch), so an alert firing is
    // proof Enter submitted the form.
    await page.goto('/login');
    await page.locator('input[name="txtLoginEmailId"]').fill('nobody@example.com');
    await page.locator('input[name="txtLoginPassword"]').fill('whatever');

    let dialogSeen = false;
    page.once('dialog', async (dialog) => {
      dialogSeen = true;
      await dialog.dismiss();
    });

    await page.locator('input[name="txtLoginPassword"]').press('Enter');
    await page.waitForTimeout(1000);

    expect(dialogSeen, 'No alert fired - Enter did not submit the form, the fix may have regressed.').toBe(true);
  });
});
