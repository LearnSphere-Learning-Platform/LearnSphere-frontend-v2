import { test, expect } from '@playwright/test';

const VIEWPORTS = {
  mobile: { width: 375, height: 667 },   // iPhone SE-ish
  tablet: { width: 768, height: 1024 },  // iPad portrait
  desktop: { width: 1440, height: 900 },
};

const PUBLIC_PAGES = ['/', '/catalog', '/login', '/signup', '/forgot-password'];

test.describe('No horizontal overflow on public pages at common viewports', () => {
  for (const [name, size] of Object.entries(VIEWPORTS)) {
    for (const path of PUBLIC_PAGES) {
      test(`${path} has no horizontal scroll at ${name} (${size.width}x${size.height})`, async ({ page }) => {
        await page.setViewportSize(size);
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        // Allow a couple px of rounding slack; anything beyond that means
        // something is forcing the page wider than the viewport (a classic
        // symptom of a fixed-pixel-width element on a small screen).
        expect(scrollWidth, `page is ${scrollWidth - clientWidth}px wider than the viewport`).toBeLessThanOrEqual(clientWidth + 4);
      });
    }
  }
});

test.describe('Mobile navigation', () => {
  test('hamburger menu opens and closes the mobile nav on small screens', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Desktop nav should be hidden, mobile toggle button visible.
    // (Was `header .md\\:hidden button`, which also matched every button in the
    // expanded mobile nav panel below - that panel has its own `.md:hidden`
    // wrapper, so the selector was never unique. The toggle button now has a
    // stable aria-label instead.)
    const mobileToggle = page.getByRole('button', { name: 'Toggle menu' });
    await expect(mobileToggle).toBeVisible();

    await mobileToggle.click();
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();

    await mobileToggle.click();
    await expect(page.getByRole('button', { name: 'Contact Us' })).not.toBeVisible();
  });
});

test.describe('devicePixelRatio-driven root font scaling (main.jsx handleZoomChange, FIXED)', () => {
  test('root font-size stays ~16px on a high-DPI mobile viewport', async ({ browser }) => {
    // Simulate a real phone: 3x device pixel ratio (iPhone-class hardware).
    // Previously main.jsx's handleZoomChange set html { font-size: 16 / devicePixelRatio }px
    // on load and on every resize/orientationchange - meant to detect BROWSER ZOOM
    // but actually reacted to device pixel ratio (a hardware/DPI signal with nothing
    // to do with zooming), collapsing the root font-size to ~5.3px on a real 3x
    // phone and shrinking every rem-based Tailwind size app-wide. Fixed by removing
    // the handler entirely.
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
    });
    const page = await context.newPage();
    await page.goto('/');

    const rootFontSizePx = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.documentElement).fontSize)
    );

    expect(rootFontSizePx, 'root font-size should stay at the 16px default on mobile, not scale down with device pixel ratio').toBeGreaterThan(14);

    await context.close();
  });
});
