import { chromium, expect } from "playwright/test";

async function globalAuthSetup() {

    const browser = await chromium.launch();
    const context = await browser.newContext()
    const page = await context.newPage()

    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    await page.goto(url); await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(url);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    //Save authentication/session state to auth.json after login — so you can reuse it in later tests without logging in again
    await page.context().storageState({ path: "./playwright/.auth/auth.json" })
}

// export default globalAuthSetup;


/* SAVE AND REUSE AUTH STATE. 2 WAYS:

A. By using globalSetup:

This setup is used to store authentication in a file (global-auth-setup.ts), so you don't need to use credentials every time you log in to the website. 
The saved auth state allows the browser to recognize that the request comes from a previously authenticated session.

Steps:
1. Create a separate file for login where you locate the input fields for credentials and perform the login. 
   At the end, use 'page.context().storageState()' to save the authenticated session to a file path for later reuse.

2. In the Playwright config file, add: globalSetup: './global-auth-setup.ts' 
   (Make sure the path and filename exactly match your global setup file.)

3. In the same config file, add: storageState: './playwright/.auth/auth.json' 
   (Make sure the path and filename exactly match the JSON file where the session is saved.)

   This way login each time with credentials is not needed. Login is only done once from globalAuthSetup() function. Then tests only need to visit test link with goto()
   and auth session accesses site directly with no creds. It is done in ReUseAuthPractice.spec.ts and ReUseAuthPractice2.spec.ts files


B. By using dependencies:

This setup is used to store authentication in a test file (dependency-auth-setup.ts), so you don't need to use credentials every time you log in to the website. 
The saved auth state allows the browser to recognize that the request comes from a previously authenticated session.

Here we comment out these two lines from Option a above in config file:
globalSetup: './global-auth-setup.ts'
storageState:"./playwright/.auth/auth.json"

Instead we add global setup as project dependency:
 projects:
    [
      {
        name: "authSessionSetup", //that can be any name but dependencies: ["authSessionSetup"] below should match with this name
        testMatch: "dependency-auth-setup.ts" //setup test file's name
      },
      {
        name: 'Chromium',
        dependencies: ["authSessionSetup"],
        use: {
          ...devices['Desktop Chrome'],
          storageState: "./playwright/.auth/auth.json"
        }}

storageState: "./playwright/.auth/auth.json" should be added to all projects you want to use it with. Can be firefox and webkit as well.       

Feature Comparison — globalSetup vs dependencies:
Scope
• globalSetup: Global (applies to all tests)
• dependencies: Project-specific

Setup style
• globalSetup: Function
• dependencies: Test file

Reusability
• globalSetup: Less flexible
• dependencies: Highly flexible for multi-project setups
*/
