/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  test: {
    // jsdom simulates a browser DOM in Node so component tests can render real React output
    // and query it, without needing an actual browser (that's what the separate Playwright
    // suite under e2e/ is for).
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
    // Without this, vitest's default include glob (**/*.{test,spec}.*) also picks up the
    // Playwright specs under e2e/*.spec.js and tries to run them as vitest tests. Playwright's
    // test.describe() throws when invoked outside the Playwright runner, and that crash was
    // corrupting the shared worker environment for whichever component test file ran next in
    // the same worker (surfacing as "localStorage is undefined" in unrelated page tests).
    // e2e/ has its own runner via `npm run test:e2e` (playwright test) - keep vitest out of it.
    exclude: [...configDefaults.exclude, 'e2e/**'],
    // Node 22+ ships its own experimental localStorage/sessionStorage globals. Without a
    // --localstorage-file flag they're non-functional (accessing them logs an
    // ExperimentalWarning and resolves to undefined). Vitest's jsdom environment only installs
    // its own working Storage implementation onto the global when nothing is already there -
    // but Node's (broken) stub already occupies that spot before the environment is even set
    // up, so jsdom skips installing its own and any test touching localStorage/sessionStorage
    // crashes with "Cannot read properties of undefined". Forcing the "forks" pool and passing
    // --no-experimental-webstorage disables Node's stub before each test worker process boots,
    // so jsdom's real Storage gets installed instead.
    pool: 'forks',
    poolOptions: {
      forks: {
        execArgv: ['--no-experimental-webstorage'],
      },
    },
  },
})
