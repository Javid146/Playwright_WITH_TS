import {expect, test} from "@playwright/test"

test("Handle New Page", async({context}) => {

    const page = await context.newPage() //creates the first tab (page)
    await page.goto("https://testpages.eviltester.com/styled/windows-test.html");
    expect(page).toHaveTitle('Windows Example Test')

    const pagePromise = context.waitForEvent('page') //detects second tab. You declare the event listener before clicking the link so Playwright is already waiting when the second tab opens.
    await page.locator("#gobasicajax").click()

    const page2 = await pagePromise; //returns the second tab's Page object, which you store in page2. so this captures second page
    await page2.locator("[name='submitbutton']").click()
    await expect(page2).toHaveTitle('Processed Form Details')

})

