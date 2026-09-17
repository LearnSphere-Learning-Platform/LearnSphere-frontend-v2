# LearnSphere frontend E2E tests (Playwright)

## One-time setup

```
npm install -D @playwright/test
npx playwright install --with-deps
```

## Running

```
npm run test:e2e          # headless, runs on Desktop Chrome + Tablet + Mobile projects
npm run test:e2e:ui       # interactive UI mode - best for writing/debugging new tests
npm run test:e2e:headed   # headed Chromium only, for watching it click around
npm run test:e2e:report   # open the last HTML report
```

The frontend dev server is started for you automatically (see `playwright.config.js`'s
`webServer` block) - you do not need to run `npm run dev` yourself first.

## What needs the backend running

- `public-pages.spec.js` and the "no backend needed" half of `auth-forms.spec.js` only need
  the frontend (`npm run dev`) up. They'll pass even with every microservice down, though the
  catalog test is weaker without real course data.
- Everything else (real login, dashboards, role-gated routes) needs the actual backend
  microservices running on the ports in `.env` (auth :8070, course :8080, enrollment :8000,
  discussion :8090, announcement :8081, student :8060).

## Test accounts

Login-dependent tests read credentials from environment variables and **skip themselves**
(they do not fail) when a credential pair is missing. Copy `.env.e2e.example` to `.env.e2e`,
fill in real student/instructor/admin accounts that exist in your dev database, and export
them before running the suite. See that file for the exact variable names.

## Files

- `playwright.config.js` (repo root) - projects, viewports, webServer, reporters.
- `e2e/public-pages.spec.js` - pages render, no console/page errors, 404 works. No login.
- `e2e/auth-forms.spec.js` - client-side signup/login validation, including two tests that
  document real bugs found in code review (weak-password acceptance, Enter-key-doesn't-submit).
- `e2e/protected-routes.spec.js` - RoleRoute.jsx redirect behavior for logged-out users and for
  student/instructor/admin roles (role tests need the matching `.env.e2e` credentials).
- `e2e/responsive.spec.js` - horizontal-overflow checks across mobile/tablet/desktop viewports
  on every public page, the mobile hamburger menu, and a regression test for the
  devicePixelRatio root-font-scaling bug in `main.jsx`.
- `e2e/known-bugs.spec.js` - a small, separate "regression net" for specific bugs found during
  the manual code review (label/input id mismatches, the logo asset path). These are meant to
  fail (red) until fixed - that's intentional, it's how you'll know they're fixed.
- `e2e/utils/credentials.js`, `e2e/utils/login.js` - shared helpers.

## Extending this suite

The routes this app defines (from `App.jsx`) that aren't covered yet and are good next targets:
course detail (`/course/:id`), the payment flow (`/user/course/:id/payment` - Razorpay, would
need a Razorpay test-mode account to exercise end to end), the quiz/assignment/coding-exercise
pages, instructor course-creation form, and the admin CRUD screens (students/courses/instructors).
Each needs either seeded test data or an instructor/admin account with existing courses to be
meaningful - add them once such a seed/account is available in your dev environment.
