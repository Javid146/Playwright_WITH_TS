import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await expect(page.getByRole('img', { name: 'Facebook' })).toBeVisible();
  await page.getByTestId('royal-email').click();
  await page.getByTestId('royal-email').fill('mammadl.javid15@gmail.com');
  await expect(page.getByTestId('royal-email')).toHaveValue('mammadl.javid15@gmail.com');
  await expect(page.getByTestId('open-registration-form-button')).toContainText('Create new account');
});


/*
There are 2 ways to create test code without writing code:
1. Playwright test extension: 
- From 'Extensions' on left sidebar install Playwright Test for VSCode
- Click 'Testing' on left sidebar -> Click record new -> browser opens and auto-test file created -> inspect/interact with any webpage and code will be auto-added to test

2. CLI: 
- npx playwright codegen
- same browser will open and you can goto and interact with any website
- with CLI test file will not be created auto. After interaction with website: copy created code -> create new test file and paste code 
*/