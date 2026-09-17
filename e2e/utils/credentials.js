// Central place to read test-account credentials from environment variables.
// Every credential is optional - any test/suite that needs one calls
// requireCreds(...) and gets skipped (not failed) when it's missing, so the
// suite still runs green on a machine that hasn't configured real accounts.
//
// Populate these by copying .env.e2e.example to .env.e2e and filling in
// real accounts that exist in your dev database, then:
//   export $(cat .env.e2e | xargs)   (bash/mac/linux)
// or set them in your shell / CI secrets before running `npm run test:e2e`.

export const creds = {
  student: {
    email: process.env.E2E_STUDENT_EMAIL,
    password: process.env.E2E_STUDENT_PASSWORD,
  },
  instructor: {
    email: process.env.E2E_INSTRUCTOR_EMAIL,
    password: process.env.E2E_INSTRUCTOR_PASSWORD,
  },
  admin: {
    email: process.env.E2E_ADMIN_EMAIL,
    password: process.env.E2E_ADMIN_PASSWORD,
  },
};

/**
 * Returns { email, password } for the given role, or null if not configured.
 * Call `test.skip(!creds, 'reason')` with the result in a test body.
 */
export function getCreds(role) {
  const c = creds[role];
  if (!c || !c.email || !c.password) return null;
  return c;
}
