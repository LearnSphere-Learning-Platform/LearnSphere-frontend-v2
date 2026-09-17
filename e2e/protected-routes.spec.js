import { test, expect } from '@playwright/test';
import { getCreds } from './utils/credentials.js';
import { loginAs } from './utils/login.js';

const PROTECTED_STUDENT_ROUTES = [
  '/user/dashboard',
  '/user/my-learning',
  '/user/profile',
  '/user/payment-history',
];
const PROTECTED_INSTRUCTOR_ROUTES = ['/instructor/dashboard', '/instructor/course-adding'];
const PROTECTED_ADMIN_ROUTES = ['/admin/dashboard', '/admin/students', '/admin/courses'];

test.describe('Unauthenticated access is redirected to /login', () => {
  for (const route of [...PROTECTED_STUDENT_ROUTES, ...PROTECTED_INSTRUCTOR_ROUTES, ...PROTECTED_ADMIN_ROUTES]) {
    test(`${route} redirects to /login when logged out`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL(/\/login/);
    });
  }
});

test.describe('Role-gated access (requires E2E_STUDENT_EMAIL/PASSWORD env vars)', () => {
  test('a logged-in student is redirected to /not-authorized on instructor/admin routes', async ({ page }) => {
    const student = getCreds('student');
    test.skip(!student, 'Set E2E_STUDENT_EMAIL / E2E_STUDENT_PASSWORD to run this test.');

    await loginAs(page, student);

    await page.goto('/instructor/dashboard');
    await expect(page).toHaveURL(/\/not-authorized/);

    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/not-authorized/);
  });

  test('a logged-in student can reach their own dashboard', async ({ page }) => {
    const student = getCreds('student');
    test.skip(!student, 'Set E2E_STUDENT_EMAIL / E2E_STUDENT_PASSWORD to run this test.');

    await loginAs(page, student);
    await page.goto('/user/dashboard');
    await expect(page).toHaveURL(/\/user\/dashboard/);
  });
});

test.describe('Instructor role (requires E2E_INSTRUCTOR_EMAIL/PASSWORD env vars)', () => {
  test('a logged-in instructor is redirected away from admin-only routes', async ({ page }) => {
    const instructor = getCreds('instructor');
    test.skip(!instructor, 'Set E2E_INSTRUCTOR_EMAIL / E2E_INSTRUCTOR_PASSWORD to run this test.');

    await loginAs(page, instructor);
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/not-authorized/);
  });

  test('a logged-in instructor can reach the instructor dashboard', async ({ page }) => {
    const instructor = getCreds('instructor');
    test.skip(!instructor, 'Set E2E_INSTRUCTOR_EMAIL / E2E_INSTRUCTOR_PASSWORD to run this test.');

    await loginAs(page, instructor);
    await page.goto('/instructor/dashboard');
    await expect(page).toHaveURL(/\/instructor\/dashboard/);
  });
});

test.describe('Admin role (requires E2E_ADMIN_EMAIL/PASSWORD env vars)', () => {
  test('a logged-in admin can reach admin AND student/instructor routes (blanket access)', async ({ page }) => {
    const admin = getCreds('admin');
    test.skip(!admin, 'Set E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD to run this test.');

    await loginAs(page, admin);
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/admin\/dashboard/);

    // RoleRoute.jsx grants admin an unconditional Outlet on every RoleRoute,
    // including routes whose allowedRoles doesn't list "admin" explicitly
    // (e.g. the student-only /user/dashboard) - confirm that here.
    await page.goto('/user/dashboard');
    await expect(page).not.toHaveURL(/\/not-authorized/);
  });
});
