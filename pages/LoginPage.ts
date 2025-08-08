import { Locator, Page } from "@playwright/test"

export class LoginPage {

  readonly page: Page //readonly is like final var in Java. Plain js: constructor(page) { this.page=page }
  readonly userNameTextbox: Locator; //TS requires to define object's type
  readonly passwordTxtbox: Locator;
  readonly loginBtn: Locator
  readonly openMenu: Locator
  readonly logoutBtn: Locator

  constructor(page: Page) {

    this.page = page;
    this.userNameTextbox = page.locator("#user-name")
    this.passwordTxtbox = page.locator("#password")
    this.loginBtn = page.locator("#login-button")
    this.openMenu = page.getByRole('button', {name: 'Open Menu'});
    this.logoutBtn = page.getByRole('link', {name: 'Logout'})
  }

  async openApp() {

    await this.page.goto("https://www.saucedemo.com")
  }

  async login(userName: string, password: string) {

    await this.userNameTextbox.fill(userName)
    await this.passwordTxtbox.fill(password)
    await this.loginBtn.click()
  }

  async logout() {
    await this.openMenu.click()
    await this.logoutBtn.click()
  }
}

/*
Plain JS:

class LoginPage {
  constructor(page) {
    this.page = page;
    this.userNameTextbox = page.locator("#user-name");
    this.passwordTxtbox = page.locator("#password");
    this.loginBtn = page.locator("#login-button");
  }}
*/