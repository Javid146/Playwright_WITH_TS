import { test, expect } from '@playwright/test';

/* 
- To avoid auth in specific test in a test file this line tells Playwright for this test (or test file), don't use the saved auth. 
Instead, use a clean, empty session. it is applied to all tests in the file:
test.use({storageState: {cookies: [], origins: [] }})

- To avoid auth in specific test in a test file below line needs to be added in test case as line 20
await context.clearCookies()

Both lines can work with dependency and globalSetup.
*/

test.beforeEach(async ({ page }) => {
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    await page.goto(url);
});

test("Verify Apply leave card navigation on dashboard page", async ({ page, context }) => {
    // await context.clearCookies()
    await expect(page.getByText('Quick Launch')).toContainText('Quick Launch');
    await expect(page.getByRole('button', { name: 'Apply Leave' })).toBeVisible();
    await page.getByRole('button', { name: 'Apply Leave' }).click();
    await expect(page.getByRole('link', { name: 'My Leave' })).toContainText('My Leave');
});