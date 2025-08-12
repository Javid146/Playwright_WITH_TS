import { test } from '@playwright/test';
import { encryptData, decryptData } from '../../util/encrypt-decrypt-util'
import secretData from "../../testData/secretData.json"

//Use util file, encrypt and decrypt data
test('Encrypt Decrypt Sensitive Data in Playwright', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //ENCRYPT CREDENTIALS
    const encryptedUsername = encryptData("standard_user");
    const encryptedPassword = encryptData("secret_sauce");
    console.log('ENCRYPTED USERNAME: ' + encryptedUsername)
    console.log('ENCRYPTED PASSWORD: ' + encryptedPassword)

    // //DECRYPT CREDENTIALS
    const decryptedUsername = decryptData(encryptedUsername)
    const decryptedPassword = decryptData(encryptedPassword)
    console.log('decryptedUsername: ' + decryptedUsername)
    console.log('decryptedPassword: ' + decryptedPassword)

    await page.locator('[data-test="username"]').fill(decryptedUsername);
    await page.locator('[data-test="password"]').fill(decryptedPassword);
    await page.locator('[data-test="login-button"]').click();

    await page.waitForTimeout(1000)
});

//Store encrypted data in .env file (encryptedUsernameOutput, encryptedPasswordOutput) and decrypt using util function
test.skip("Encrypt Decrypt 2", async ({ page }) => {
    const encUname: any = process.env.encryptedUsernameOutput;
    const encPwd: any = process.env.encryptedPasswordOutput;
    const decryptedUname = decryptData(encUname);
    const decryptPwd = decryptData(encPwd);

    console.log("decryptedUname 2: " + decryptedUname)
    console.log("decryptPwd 2: " + decryptPwd)

    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill(decryptedUname);
    await page.locator('[data-test="password"]').fill(decryptPwd);
    await page.locator('[data-test="login-button"]').click();

    await page.waitForTimeout(1000)
})

//Store encrypted data in secretData.json file (encryptedUsernameOutput, encryptedPasswordOutput) and decrypt using util function
test.skip("Encrypt Decrypt 3", async ({ page }) => {
    const decryptedUname = decryptData(secretData.encryptedUsernameOutput);
    const decryptPwd = decryptData(secretData.encryptedPasswordOutput);

    console.log("decryptedUname 3: " + decryptedUname)
    console.log("decryptPwd 3: " + decryptPwd)

    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill(decryptedUname);
    await page.locator('[data-test="password"]').fill(decryptPwd);
    await page.locator('[data-test="login-button"]').click();

    await page.waitForTimeout(1000)
})

/*
Encrypt/Decrypt with Playwright

Overview:
We'll store sensitive test credentials in an encrypted form and decrypt them
inside Playwright tests using a secret key.

-------------------------------------------------
1. Install dependencies
-------------------------------------------------
npm i crypto-js
npm i dotenv        // Only if using .env files

-------------------------------------------------
2. Create util file
-------------------------------------------------
File: util/encrypt-decrypt.ts
- Implement functions:
    encryptData(text: string)
    decryptData(text: string)

-------------------------------------------------
3. Store encrypted data
-------------------------------------------------

Option A — JSON file:
  File: testData/secretData.json
  {
    "encryptedUsernameOutput": "<cipher>",
    "encryptedPasswordOutput": "<cipher>"
  }

Option B — .env file:
  File: env-files/.env
  encryptedUsernameOutput=<cipher>
  encryptedPasswordOutput=<cipher>

  In config file:
    dotenv.config({ path: path.resolve('env-files', '.env') })

-------------------------------------------------
4. Fetch and decrypt data in tests
-------------------------------------------------

From JSON file:
    import secretData from '../testData/secretData.json';
    const decryptedUname = decryptData(secretData.encryptedUsernameOutput);
    const decryptedPwd   = decryptData(secretData.encryptedPasswordOutput);

From .env:
    const encUname = process.env.encryptedUsernameOutput;
    const encPwd   = process.env.encryptedPasswordOutput;
    const decryptedUname = decryptData(encUname);
    const decryptedPwd   = decryptData(encPwd);

-------------------------------------------------
5. Pass SECRET_KEY at runtime
-------------------------------------------------

Command Prompt:
    set SECRET_KEY=javidm
    npx playwright test tests/EncryptDecrypt --project=firefox

PowerShell:
    $env:SECRET_KEY="javidm"
    npx playwright test tests/EncryptDecrypt --project=firefox

(SECRET_KEY can be any string you choose. Must match the one used in encryptData.)
*/