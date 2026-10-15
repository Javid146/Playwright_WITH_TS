import { test, expect } from '@playwright/test';

/*
1. To skip saved authentication (auth.json) session for all tests in a test file, use:

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})
    
   - Overrides the saved auth state and starts each test with empty cookies and localStorage.
   - Best option for testing login from a fresh session.
   - Does not modify or delete auth.json.

2. To clear authentication cookies in a specific test, use:

   await context.clearCookies()

   - Clears cookies from the current browser context.
   - Does NOT clear localStorage or sessionStorage.
   - If authentication depends only on cookies, the user will need to log in again.
   - If authentication uses localStorage, the user may remain logged in.

3. Difference between localStorage and sessionStorage:

   - localStorage: Stores browser data (e.g., auth tokens, user preferences).
     Data survives page refreshes and browser restarts and is shared across
     tabs of the same website (same origin).

   - sessionStorage: Stores temporary browser data (e.g., auth tokens).
     Data survives page refreshes but is generally removed when the tab closes.
     Each tab has its own sessionStorage.

   - Neither is cleared by context.clearCookies().
   - Playwright auth.json saves cookies and localStorage by default,
     but NOT sessionStorage.

Both approaches work with globalSetup and project dependencies.
However, the first option is more reliable for testing without saved authentication.
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