import { expect } from "@playwright/test"
import { test } from "../fixtures/POMFixtures"

test('Verify Cart', async ({ loginPage, homePage, cartPage }) => {

    await loginPage.openApp()
    await loginPage.login("standard_user", "secret_sauce")

    await expect(homePage.homePageHeader).toHaveText("Swag Labs")
    await homePage.addBackpackToCart()
    await expect(homePage.cartIcon).toHaveText("1")
    await homePage.goToCart()

    await expect(cartPage.backpackItem).toHaveText("Sauce Labs Backpack")
})