import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    await page.goto(url);
});

test("Verify timesheet card navigation on Dashboard page", async ({ page }) => {
    await expect(page.getByText('Quick Launch')).toContainText('Quick Launch');
    await expect(page.getByRole('button', { name: 'Timesheets' })).toBeVisible();
    await page.getByRole('link', { name: 'Time' }).click();
    await expect(page.getByLabel('Topbar Menu').getByRole('list')).toContainText('Timesheets');
});

test("Add Candidate for Recruitment", async ({ page }) => {
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByRole('heading', { name: 'Add Candidate' })).toContainText('Add Candidate');

    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('Automate');
    await page.getByPlaceholder('Middle Name').fill('Code');
    await page.getByPlaceholder('Type here').first().fill('testcodeautomate@gmail.com');

    await page.getByRole('button', { name: 'save' }).click();
    await expect(page.getByText('Test Code Automate', { exact: true })).toContainText('Test Code Automate');
});
