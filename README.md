# LearnSphere — Frontend

LearnSphere is a full-stack e-learning platform where instructors create and manage courses, and students browse, enroll in, pay for, and complete them — with quizzes, coding exercises, discussion forums, and announcements built in. This repository is the frontend: a React single-page app that talks to LearnSphere's Spring Boot microservices backend.

## Features

- Course catalog, course detail pages, and enrollment with Razorpay payments
- Role-based dashboards for students, instructors, and admins (route-guarded)
- Instructor tools: course authoring, content/session management, quizzes, coding exercises, assignments, analytics
- Discussion forum with threads, replies, and flagging
- Announcements management
- Rich text editing (CKEditor), in-browser code editor for coding exercises
- Auth flows: signup, login, forgot/reset password

## Tech stack

- React 18 + Vite 7
- React Router 7
- TanStack Query for data fetching/caching
- Tailwind CSS 4 + Radix UI primitives
- React Hook Form + Zod for form validation
- Chart.js / Recharts for analytics views
- CKEditor 5, Prism.js / react-simple-code-editor for the coding exercise editor
- Vitest + Testing Library for unit tests, Playwright for end-to-end tests

## Project structure

```
src/
  admin/          Admin dashboard (pages, components, hooks)
  catalog/        Course catalog, course detail, enrollment, payment
  dashboard/      Student dashboard
  instructor/     Instructor dashboard, course/content authoring, analytics
  forum/          Discussion forum
  landing/        Public landing page sections
  pages/          Top-level routed pages (login, signup, profile, quiz, etc.)
  quiz/           Quizzes, assignments, coding exercises
  services/       API clients (api.js, authService.js)
  hooks/          Shared data-fetching hooks
  utils/          Shared utilities
e2e/              Playwright end-to-end tests
scripts/          e2e-test.mjs, seed-demo-data.mjs
```

## Backend architecture

The frontend does not talk to one monolithic API — it calls several separate Spring Boot microservices directly, each behind its own base URL (course, enrollment, discussion, announcement, student/admin, and auth). An API gateway with Eureka-based service discovery also exists in the backend for routing between services. See the backend README for the full architecture.

## Getting started

### Prerequisites

- Node.js 18+
- The backend services running locally (see backend README)

### Setup

```bash
npm install
```

Create a `.env` file in the project root with the base URL of each backend service:

```
VITE_AUTH_API_URL=http://localhost:8070
VITE_COURSE_API_URL=http://localhost:8080
VITE_ENROLLMENT_API_URL=http://localhost:8000
VITE_DISCUSSION_API_URL=http://localhost:8090
VITE_ANNOUNCEMENT_API_URL=http://localhost:8081
VITE_STUDENT_API_URL=http://localhost:8060
VITE_JUDGE0_API_KEY=your_judge0_api_key
```

### Run

```bash
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build locally
```

### Test

```bash
npm run test           # unit tests (Vitest)
npm run test:ui        # Vitest UI
npm run test:e2e       # Playwright end-to-end tests
npm run test:e2e:ui    # Playwright UI mode
npm run test:e2e:report
```

## Related

- Backend repository: see `README-backend.md` / the backend repo for the eight-service microservices architecture and local setup.
