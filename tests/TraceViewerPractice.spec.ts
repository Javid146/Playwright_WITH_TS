import { expect } from "@playwright/test"
import { test } from "../fixtures/POMFixtures"


test.beforeEach(async ({ loginPage }) => {
    await loginPage.openApp()
    await loginPage.login("standard_user", "secret_sauce")
});

test.afterEach(async({loginPage}) => {
    await loginPage.logout()
})

test('Adding / Removing Item to / from Cart Verification', async ({ page }) => {

    await page.getByText("Sauce Labs Backpack").click()
    // await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('#add-to-cart').click()
    await page.locator(".shopping_cart_link").click()
    await expect(page.getByRole('link', {name: 'Sauce Labs Backpack'})).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible()
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
    await expect(page.getByRole('link', {name: "Sauce Labs Backpack"})).not.toBeVisible()
})

test("Empty Cart Verification", async ({page}) => {

    await page.locator(".shopping_cart_link").click()
    await expect(page.locator('inventory_item_name')).not.toBeVisible()
})

/*
🧪 How to View Playwright Trace:

1️⃣ Enable trace (in config or CLI):
   - Config: use: { trace: 'on' }
     or
   - CLI: npx playwright test --trace=on

2️⃣ Run your tests: npx playwright test

3️⃣ View the trace:
✅ Option A — CLI: npx playwright show-trace <path of test-results/trace.zip>
✅ Option B — HTML Report:
   CLI: npx playwright show-report (test report only auto-opens when you run test from CLI, Testing sidebar does not open report on failures)
   → Click “View Trace” button
✅ Option C — VS Code “Show Trace” checkbox:
   - Before running a test from the Testing sidebar, enable the “Show Trace” checkbox at the top.
   - Trace viewer will auto-open after the test run, even if trace is not enabled in config.

⚠️ Note:
   - trace.zip is only saved if trace is set to:
     'on', 'on-first-retry', 'on-all-retries', or 'retain-on-failure' (if test fails)
*/

