// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  globalSetup: require.resolve('./global-setup.js'),
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        /* Força o tamanho da página a ficar em 1080p, anulando o padrão do device */
        viewport: { width: 1920, height: 1080 }, 
        launchOptions: {
          executablePath: '/usr/bin/google-chrome',
          args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080'],
        },
        // Sem storageState - para login tests
      },
    },
    {
      name: 'chromium-auth',
      use: {
        ...devices['Desktop Chrome'],
        /* Força o tamanho da página a ficar em 1080p, anulando o padrão do device */
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          executablePath: '/usr/bin/google-chrome',
          args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080'],
        },
        storageState: 'auth.json',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

