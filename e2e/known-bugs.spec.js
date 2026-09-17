import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// This file is a deliberate "regression net" for specific bugs found during
// manual code review, kept separate from the general suite so a reviewer can
// see at a glance which known issues are still open (failing red) vs fixed
// (passing green). FIXED (2026-09-14): label/input id mismatches and the
// logo asset path - both now assert the fixed behavior stays fixed.

test.describe('Accessibility: label/input id association (code review finding, FIXED)', () => {
  test('LoginPage labels are correctly associated with their inputs via getByLabel()', async ({ page }) => {
    await page.goto('/login');
    // Previously: <label htmlFor="email"> paired with <input id="txtLoginEmailId">
    // (mismatched, so getByLabel() found nothing and screen readers/click-to-focus
    // were broken). Fixed by pointing htmlFor at the real input ids.
    await expect(page.getByLabel(/username or email/i)).toBeVisible();
    await expect(page.getByLabel(/enter password/i)).toBeVisible();
  });

  test('Signup form labels are correctly associated with their inputs', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/e-mail address/i)).toBeVisible();
    await expect(page.getByLabel(/create password/i)).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
  });
});

test.describe('Logo asset path (code review finding, FIXED)', () => {
  // NOTE: this used to be a single test that watched network responses for a
  // raw "/src/assets/logo.png" request. That approach was fundamentally
  // broken: Vite's DEV server serves a correctly bundler-imported asset at
  // that exact literal URL too (plus a "?import" companion request) - dev
  // mode never rewrites it to a hashed /assets/logo-xxxx.png URL the way a
  // real `vite build` does. So the old broken hardcoded <img src="./src/...">
  // and the fixed `import logo from "../assets/logo.png"` produced IDENTICAL
  // dev-server network traffic, making it impossible for that test to ever
  // distinguish "fixed" from "still broken". Replaced with static source
  // checks (which actually inspect the code) plus a live-render sanity check.

  test('Header logo is bundled via import, not a raw /src/ path that 404s in production', () => {
    const headerSrc = fs.readFileSync(
      path.join(__dirname, '..', 'src', 'components', 'Header.jsx'),
      'utf-8'
    );
    expect(headerSrc, 'Header.jsx must import the logo through the bundler').toMatch(
      /import\s+logo\s+from\s+["'].*logo\.png["']/
    );
    expect(headerSrc, 'Header.jsx must not hardcode a raw /src/ path for the logo').not.toMatch(
      /src\s*=\s*["'`][^"'`]*\/src\/assets\/logo\.png/
    );
  });

  test('favicon link is not a raw /src/ path that 404s in production', () => {
    const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
    expect(indexHtml, 'index.html favicon must not point at a raw /src/ path').not.toMatch(
      /rel="icon"\s+href="\/src\//
    );
  });

  test('the logo actually renders and loads on the home page', async ({ page }) => {
    await page.goto('/');
    const logoImg = page.getByAltText('LearnSphere Logo').first();
    await expect(logoImg).toBeVisible();
    const naturalWidth = await logoImg.evaluate((img) => img.naturalWidth);
    expect(naturalWidth, 'logo <img> should have actually loaded image data, not be broken').toBeGreaterThan(0);
  });
});
