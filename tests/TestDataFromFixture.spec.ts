import { expect } from '@playwright/test';
import {test} from "../fixtures/TestDataFixture"

test.beforeEach("Login", async ({ page, loginData }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill(loginData.uname);
    await page.getByPlaceholder('Password').fill(loginData.pwd);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('Add Candidate for Recruitment', async ({ page, testData }) => {
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByRole('heading', { name: 'Add Candidate' })).toContainText('Add Candidate');

    await page.getByPlaceholder('First Name').fill(testData.fname);
    await page.getByPlaceholder('Middle Name').fill(testData.mname);
    await page.getByPlaceholder('Last Name').fill(testData.lname);
    await page.getByPlaceholder('Type here').first().fill(testData.email);

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Application Stage')).toBeVisible();
});
