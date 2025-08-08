import {expect, test} from "@playwright/test"

test("Handle New Page", async({context}) => {

    const page = await context.newPage()
    await page.goto("https://testpages.eviltester.com/styled/windows-test.html");
    expect(await page).toHaveTitle('Windows Example Test')

    const pagePromise = context.waitForEvent('page')
    await page.locator("#gobasicajax").click()

    const page2 = await pagePromise;
    await page2.locator("[name='submitbutton']").click()
    expect(await page2).toHaveTitle('Processed Form Details')

})

