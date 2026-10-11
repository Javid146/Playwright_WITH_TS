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
    /*   
    path: `./playwright/.auth/${browserName}.json`  or can set up this way to save auth state for each browser type (chromium, firefox, webkit) separately.
    browserName is built-in variable in Playwright that represents the name of the browser being used (e.g., 'chromium', 'firefox', or 'webkit').
    This way you can have separate auth state files for each browser type, allowing you to maintain different authentication sessions for different browsers.

    This (auth/${browserName}.json), each project (chrome, firefox, webkit) will have its own auth state file. So if you run tests in different browsers, 
    each browser will have its own authentication session saved in its respective file. After logging in here once, next step in config file:
    projects: [
    {
    name: 'setup-chromium',
    testMatch: './playwright/dependency-auth-setup.ts', 
    use: { 
    ...devices['Desktop Chrome'],  //means get "Desktop Chrome" device settings from Playwright's built-in devices object. ...devices here is object that has multiple device configurations, and we are spreading (... =spread syntax) it to get chrome browser settings.
    },
    {
    
    name: 'chromium-tests',
    dependecy: 'setup-chromium',
    use: { 
    ...devices['Desktop Chrome'], 
    storageState: './playwright/.auth/chromium.json' 
    },
    
    {
    name: 'setup-firefox',
    testMatch: './playwright/dependency-auth-setup.ts',
    use: { 
    ...devices['Desktop Firefox'] 
    },
    {
    name: 'firefox-tests',
    dependecy: 'setup-firefox',
    use: { 
    ...devices['Desktop Firefox'], 
    storageState: './playwright/.auth/firefox.json' 
    }
    ]

    Now:
    a. with setup-chromium and setup-firefox, you can run tests in both browsers with their respective authentication sessions saved in separate files.
    b. chromium-tests and firefox-tests will use the saved authentication sessions from their respective setup projects, allowing you to run tests in both browsers without needing to log in again.
    
    */

})