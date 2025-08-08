import { Locator, Page } from "@playwright/test"

export class HomePage {

    readonly page: Page
    readonly homePageHeader: Locator
    readonly backPackAddToCart: Locator
    readonly backpackRemoveBtn: Locator
    readonly cartIcon: Locator

    constructor(page: Page) {

        this.page = page;
        this.backPackAddToCart = page.locator("[data-test='add-to-cart-sauce-labs-backpack']")
        this.backpackRemoveBtn = page.locator("[data-test='remove-cart-safuce-labs-backpack']")
        this.cartIcon = page.locator("#shopping_cart_container")
        this.homePageHeader = page.getByText("Swag Labs")
    }

    async addBackpackToCart() {

        await this.backPackAddToCart.click()
    }

    async goToCart() {

        await this.cartIcon.click()
    }
}