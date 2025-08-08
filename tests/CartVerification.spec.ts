import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { CartPage } from "../pages/CartPage"

test('Verify Cart', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.openApp()
    await loginPage.login("standard_user", "secret_sauce")

    const homepage = new HomePage(page)
    await expect(homepage.homePageHeader).toHaveText("Swag Labs")
    await homepage.addBackpackToCart()
    await expect(homepage.cartIcon).toHaveText("1")
    await homepage.goToCart()

    const cartPage = new CartPage(page)
    await expect(cartPage.backpackItem).toHaveText("Sauce Labs Backpack")
})