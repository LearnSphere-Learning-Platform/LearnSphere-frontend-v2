// Playwright end-to-end test configuration for LearnSphere frontend.
//
// Setup (one-time):
//   npm install -D @playwright/test
//   npx playwright install --with-deps
//
// Run:
//   npm run test:e2e          # headless, all browsers/viewports
//   npm run test:e2e:ui       # interactive UI mode (best for debugging)
//   npm run test:e2e:headed   # headed, chromium only, for watching it click around
//
// Prerequisites for a full run:
//   - The frontend dev server is started automatically by this config (npm run dev),
//     so you do NOT need to start it yourself.
//   - The backend microservices (Oauth/auth :8070, course :8080, enrollment :8000,
//     discussion :8090, announcement :8081, student :8060) should be running for
//     anything beyond the "public pages render" smoke tests - most login/dashboard/
//     protected-route tests need a real backend to authenticate against.
//   - Tests that require a logged-in session read credentials from environment
//     variables (see .env.e2e.example in this folder). Any test whose required
//     credentials are missing is SKIPPED (not failed) so the suite still runs green
//     on a machine that only has the frontend up.

import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.E2E_PORT || 5173;
const BASE_URL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],
  timeout: 30_000,
  expect: { timeout: 8_000 },

  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'Tablet', use: { ...devices['iPad Mini'] } },
    { name: 'Mobile', use: { ...devices['Pixel 7'] } },
  ],

  // Auto-start the Vite dev server for the test run and reuse it locally
  // so repeated `npm run test:e2e` runs don't each pay the cold-start cost.
  webServer: {
    command: 'npm run dev -- --port ' + PORT + ' --strictPort',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
