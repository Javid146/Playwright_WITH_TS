import { expect, test } from "@playwright/test"


test('Login Setup', async ({ page }) => {

    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    await page.goto(url); 
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(url);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    //save auth state session to auth.json file
    await page.context().storageState({ path: "./playwright/.auth/auth.json" })
})