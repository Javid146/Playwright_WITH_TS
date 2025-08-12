import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv"
import { dot } from 'node:test/reporters';
import path from 'path';

// dotenv.config({
//   // path: process.env.TEST_ENV ? `./env-files/.env.${process.env.TEST_ENV}` : `./env-files/.env.dev`
//   path: `./env-files/.env.${process.env.TEST_ENV}`
// })

dotenv.config({
  path: path.resolve('env-files', '.env') //this means same as above path but simple way
})

export default defineConfig({
  // globalSetup: './global-auth-setup.ts',
  testDir: './tests',
  fullyParallel: true,
  /*fail build in CI if you accdentally left test.only in source code. ! means false (no), !! means true (no no)*/
  forbidOnly: !!process.env.CI,
  /*retry  Run failed tests 2 times if running in CI*/
  retries: process.env.CI ? 1 : 0,
  /*Run tests with 1 worker in CI (to avoid flaky parallelism), otherwise use 3 workers locally for speed*/
  workers: process.env.CI ? 1 : 3,
  reporter: [['html', { open: 'on-failure' }]],
  // reporter: [['allure-playwright', { outputFolder: "GoogleAllureReportFolder" }]],
  /*by default timeout is 30 secs even if it is not defined here*/
  timeout: 30000, //ms
  use: {
    baseURL: "https://restful-booker.herokuapp.com/",
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'retain-on-failure'
    // storageState:"./playwright/.auth/auth.json",  
  },
  projects:
    [
      // {
      //   name: "authSessionSetup",
      //   testMatch: "dependency-auth-setup.ts"
      // },
      {
        name: 'Chromium',
        // dependencies: ["authSessionSetup"],
        use: {
          ...devices['Desktop Chrome'],
          // storageState: "./playwright/.auth/auth.json"
        }
      },

      {
        name: 'Firefox',
      //   dependencies: ["authSessionSetup"],

        use: {
          ...devices['Desktop Firefox'],
      //     storageState: "./playwright/.auth/auth.json"
        },
      },

      {
        name: 'WebKit',
        use: {
          ...devices['Desktop Safari'],
        },
      },

      // {
      //   name: 'iphone15Plus',
      //   use: {
      //     ...devices['iPhone 15 Plus'],
      //   },
      // }

    ]
});
