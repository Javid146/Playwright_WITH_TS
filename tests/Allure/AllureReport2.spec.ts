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
npm i allure-playwright@2.15.1

in config file: 
reporter: [['allure-playwright', { outputFolder: "GoogleAllureReportFolder" }]]

This will create folder called GoogleAllureReportFolder (The Raw Test Data, Not Human-Readable)
On Windows CMD:
set ALLURE_RESULTS_DIR=GoogleAllureReportFolder
npx playwright test tests/Allure  --reporter=allure-playwright

On Powershell:
$env:ALLURE_RESULTS_DIR="GoogleAllureReportFolder"
npx playwright test tests/Allure  --reporter=allure-playwright


generate report (The Generated Human-Readable Report): 
CMD: allure generate GoogleAllureReportFolder --clean
This command will create allure-report folder where you can view reports. And if folder already exists with old
report files "--clean" will overwrite them with new reports.

Open report to view:
allure open allure-report

If you define options below in config file they will be displayed on Allure report as well:
Options:
  retries: process.env.CI ? 2 : 1,
  screenshot: 'on',
  video: 'on',
  trace: 'on'

  in order to view trace its zip needs to be downloaded from allure report and zip folder needs to be pasted on test.playwright.dev 
  to view.
*/

/*
How to Generate Allure Report with Playwright and allure-playwright

1. Install allure-playwright:
   npm i allure-playwright@2.15.1

2. Configure Playwright (playwright.config.ts):
   reporter: [['allure-playwright', { outputFolder: "GoogleAllureReportFolder" }]]

   This creates the folder "GoogleAllureReportFolder" containing raw test data (NOT human-readable).
   Folder name can be any

3. Run tests:
   npx playwright test tests/Allure --reporter=allure-playwright
   Allure practice tests are in Allure folder that's why we added it to command.


4. Generate human-readable Allure report:

   allure generate GoogleAllureReportFolder --clean

   - This creates the "allure-report" folder.
   - The --clean option overwrites old reports if they exist.

5. Open the Allure report in a browser:
   allure open allure-report

6. Optional config options to add in playwright.config.ts to show in Allure report:
   retries: process.env.CI ? 2 : 1, //retries once if test fails
   screenshot: 'on',               //takes ss
   video: 'on',                   //takes video
   trace: 'on'                   //creates trace.zip

   Note:
   To view trace details, download the trace zip from Allure report
   and upload it to https://test.playwright.dev for visualization.
*/
