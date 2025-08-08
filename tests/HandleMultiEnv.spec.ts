import { test } from "@playwright/test";

test("Handle Multiple Environments", async ({ page }) => {

    //env files' path is defined in playwright.config.ts file. That's why env variables below work
    console.log(process.env.URL);
    console.log(process.env.USERNAME1);
    console.log(process.env.PASSWORD);

    // const urlVal = <string> process.env.URL; or as below. Defines that type is string
    const urlVal = process.env.URL as string;

    await page.goto(urlVal);
    await page.locator('[data-test="username"]').fill(<string>process.env.USERNAME1);
    await page.locator('[data-test="password"]').fill(process.env.PASSWORD as string);
    await page.waitForTimeout(3000);
});

/*
📘 How to Run Playwright Tests in Different Environments
   Without Changing Code — Just Using Commands

1️⃣ Install dotenv package: npm install dotenv
2️⃣ Create environment-specific .env files:
- Create a folder named `.env-files`
- Inside it, create env files like:
    - .env.dev
    - .env.uat
    - .env.qa
  Add environment variables inside each file:
    URL=
    USERNAME1=
    PASSWORD=

3️⃣ Configure dotenv (env path) in your playwright.config.ts:
import dotenv from "dotenv";

dotenv.config({
  path: process.env.TEST_ENV 
    ? `./env-files/.env.${process.env.TEST_ENV}` 
    : `./env-files/.env.dev`
});

Explanation:
- If someone runs the test like this:
    npx playwright test HandleMultiEnv.spec.ts
  without setting the TEST_ENV variable (e.g. `$env:TEST_ENV = "uat"`),
  then all environment variables will be undefined and test will fail. Because playwright will not know which env is required to run test on

- That's why we use the ternary above in playwright.config.ts:
  ➤ If TEST_ENV is defined, load the matching env file (e.g. `.env.uat`)
  ➤ If not defined, default to `.env.dev`

FYI — Setting env vars differs across terminals:
Batch CMD: set TEST_ENV=dev
PowerShell: $env:TEST_ENV="uat"

────────────────────────────────────────────────────────────
✅ Optional: Use Shorter Cross-Platform Commands via `cross-env`

1️⃣ Install cross-env: npm install cross-env
cross-env ensures your env vars work the same across Windows, macOS, Linux,
and different shells (PowerShell, Bash, etc).

2️⃣ Add lines below in scripts section of package.json:
"scripts": {
  "test:dev": "cross-env TEST_ENV=dev npx playwright test",
  "test_UAT": "cross-env TEST_ENV=uat npx playwright test"
}

3️⃣ Run tests by choosing your environment:
> npm run test:dev
> npm run test_UAT

Note: The keys `test:dev` and `test:uat` are custom — you can name them however you want.
*/

