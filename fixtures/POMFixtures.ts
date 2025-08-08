import { test as baseTest } from "@playwright/test" //baseTest is alias
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { CartPage } from "../pages/CartPage"

type myPOMFixtures = { //creating custom fixtures here. so to not initiate above page files in every test file

    loginPage: LoginPage
    homePage: HomePage
    cartPage: CartPage
}

export const test = baseTest.extend<myPOMFixtures>({ //exporting this fixture so we do not need to initialize page files each time in test files

/* 
  use(...) sends the fixture value to the test and waits for the test to finish.
  Code before use(...) is setup logic.
  Code after use(...) is teardown logic.
*/

    //page is fixture, use is callback function (callback function is a function that is passed as an argument to another function, and is called later)
    loginPage: async ({ page }, use) => { //loginPage fixture is exported to be used in CartVerificationWithFixtures
        const loginPg = new LoginPage(page)
        await use(loginPg)
    },

    homePage: async ({ page }, use) => { //homePage fixture is exported 
        const homePg = new HomePage(page)
        await use(homePg)
    },

    cartPage: async ({ page }, use) => { //cartPage fixture is exported 
        await use(new CartPage(page))
    }
})