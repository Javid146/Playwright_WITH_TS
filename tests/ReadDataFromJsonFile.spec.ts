import { test, expect } from '@playwright/test';
import jsonData from '../testData/ReadDataFromJsonFile.json' //test data added to this file and test gets data from here
import loginData from '../testData/loginData.json' //login data added to this file and test gets data from here


test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await page.getByPlaceholder('Username').fill(loginData.username);
    await page.getByPlaceholder('Password').fill(loginData.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('Verify timesheet card navigation on Dashboard page', async ({ page }) => {
    await expect(page.getByText('Quick Launch')).toContainText('Quick Launch');
    await expect(page.getByRole('button', { name: 'Timesheets' })).toBeVisible();
    await page.getByRole('link', { name: 'Time' }).click();
    await expect(page.getByLabel('Topbar Menu').getByRole('list')).toContainText('Timesheets');
});


/*
📄 How to read data from a JSON file in Playwright tests:
1. Create a JSON file and add your data.
2. Import the JSON file into your test file and access the data.

📌 For parameterized tests (like Java's dataProvider):
1. Store multiple data sets in the JSON file as an array: [{}, {}, {}]
2. Import the JSON file into your test.
3. Use a `forEach` or `for...of` loop to iterate through the data.
4. Place the test case inside the loop so it runs once per data set.

⚠️ Test name duplication:
Since the same test will run multiple times, you should make each test name unique.  
Example: `"Add Candidate for Recruitment - " + data.fname`

🚀 To run parameterized tests in parallel across browsers (in playwright.config.ts):
fullyParallel: true,
workers: process.env.CI ? 1 : 3 // Adjust the number of workers as needed
*/

//forEach
jsonData.forEach((data) => {

    test('Add Candidate for Recruitment ' + data.fname, async ({ page }) => {
        await page.getByRole('link', { name: 'Recruitment' }).click();
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.getByRole('heading', { name: 'Add Candidate' })).toContainText('Add Candidate');
        await page.getByPlaceholder('First Name').fill(data.fname);
        await page.getByPlaceholder('Last Name').fill(data.lname);
        await page.getByPlaceholder('Middle Name').fill(data.mname);
        await page.getByPlaceholder('Type here').first().fill(data.email);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('Application Stage')).toBeVisible();
    });
})

// //forOf
// for (const data of jsonData) {
//     test('Add Candidate for Recruitment' + data.lname, async ({ page }) => {
//         await page.getByRole('link', { name: 'Recruitment' }).click();
//         await page.getByRole('button', { name: 'Add' }).click();
//         await expect(page.getByRole('heading', { name: 'Add Candidate' })).toContainText('Add Candidate');
//         await page.getByPlaceholder('First Name').fill(data.fname);
//         await page.getByPlaceholder('Last Name').fill(data.lname);
//         await page.getByPlaceholder('Middle Name').fill(data.mname);
//         await page.getByPlaceholder('Type here').first().fill(data.email);
//         await page.getByRole('button', { name: 'Save' }).click();
//         await expect(page.getByText('Application Stage')).toBeVisible();
//     });
// }


