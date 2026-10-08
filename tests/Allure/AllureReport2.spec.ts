import { test, expect } from '@playwright/test';

test("Reporter Practice 4", async ({ page }) => {
  await page.goto("https://www.google.com");
  await expect(page).toHaveTitle("Google");
});

test("Reporter Practice 5", async ({ page }) => {
  await page.goto("https://www.google.com");
  await expect(page).toHaveTitle("Google");
});

test("Reporter Practice 6", async ({ page }) => {
  await page.goto("https://www.google.com");
  await expect(page).toHaveTitle("Google");

  console.log("💡 ALLURE_RESULTS_DIR:", process.env.ALLURE_RESULTS_DIR);

});


/*
How to Generate Allure Report with Playwright and allure-playwright:

1. npm i allure-playwright@2.15.1

2. in config file: 
reporter: [['allure-playwright', { outputFolder: "GoogleAllureReportFolder" }]]
This will create folder called GoogleAllureReportFolder (The Raw Test Data, Not Human-Readable)

3. npx playwright test tests/Allure 

if you didn't already set reporter inconfig file then you can do as below via terminals:
2.a. On Windows CMD:
set ALLURE_RESULTS_DIR=GoogleAllureReportFolder
3.a. npx playwright test tests/Allure  --reporter=allure-playwright

2.b. On Powershell:
$env:ALLURE_RESULTS_DIR="GoogleAllureReportFolder"
3.a. npx playwright test tests/Allure  --reporter=allure-playwright

4.generate report (The Generated Human-Readable Report): 
CMD: allure generate GoogleAllureReportFolder --clean
This command will create allure-report folder where you can view reports. And if folder already exists with old
report files "--clean" will overwrite them with new reports.

Open report generated in step 4 to view:
5. allure open allure-report

If you define options below in config file they will be displayed on Allure report as well:
Options:
  retries: process.env.CI ? 2 : 1,
  screenshot: 'on',
  video: 'on',
  trace: 'on'

6.  in order to view trace its zip needs to be downloaded from allure report and zip folder needs to be pasted on https://test.playwright.dev to view.
6.a. or you can just do it locally: npx playwright show-trace path\to\trace.zip. By default, Playwright stores test artifacts in the test-results folder.
*/

