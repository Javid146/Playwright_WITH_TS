import { Locator, Page } from "@playwright/test"

export class CartPage {

    readonly page: Page
    readonly backpackItem: Locator


    constructor(page: Page) {

        this.page = page
        this.backpackItem = page.getByRole("link", { name: 'Sauce Labs Backpack' })
    }
}
