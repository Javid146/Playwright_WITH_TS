import { test } from "@playwright/test";

test("Practice Keyboard Actions", async ({ page }) => {
  await page.goto("https://testpages.eviltester.com/styled/basic-html-form-test.html");

  const commentTextArea = page.locator('[name="comments"]');
  await commentTextArea.press("Control+a");
  await commentTextArea.press("Backspace"); //delete
  await commentTextArea.press("a+b+c"); //types abc
  await commentTextArea.press("Control+a+x"); //selects all and cuts

  const usernameInput = page.locator('[name="username"]');
  await usernameInput.press("Control+v");
  await usernameInput.press("ArrowLeft+ArrowLeft+ArrowLeft"); //moves cursor 3 times left
  await usernameInput.press("z");

  await page.keyboard.press("PageDown"); //scroll down
  await page.keyboard.press("PageUp"); //scroll up
});
