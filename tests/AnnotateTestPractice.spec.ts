import { test, expect } from "@playwright/test"

//1 annotation
test("Annotate Test Practice Test 1", {
    annotation: {
        type: "Jira Story",
        description: "https://wishinfinite1.atlassian.net/jira/software/projects_111" //actual link for jira issue
    }
}, async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle("Google");
});




//array of annotations
test("Annotate Test Practice Test 2", {
  tag: "@UI",
  annotation: [
    {
      type: "Google Title Verification",
      description: "We are going to verify google title"
    },
    {
      type: "Jira Story",
      description: "https://wishinfinite1.atlassian.net/jira/software/projects_222"
    }
  ]
}, async ({ page }) => {
  await page.goto("https://www.google.com");
  await expect(page).toHaveTitle("Google");
});



test.describe("Describe Block", {
    annotation: {
        type: "Jira Story 2", //actual link for jira issue below
        description: "https://wishinfinite1.atlassian.net/jira/software/project_333/"
    }
}, async () => {

    test("Practice Test 1", async () => {
        console.log("Practice Test 1");
    });

    test("Practice Test 2", async () => {
        console.log("Practice Test 2");
    });

    test("Practice Test 3", async () => {
        console.log("Practice Test 3");
    });
});


/*
Annotations in Playwright are metadata attached to tests, which serve as informational or organizational helpers. 
While they do not affect the execution of the test logic, they provide valuable context for:

1. Linking to external systems. Example: JIRA story links.
2. Describing intent. Example:
    { type: "Verification",
      description: "Verifies the Google title" }
3. Grouping & filtering contextually

Annotations can be 1 or can be several attached to test. Line 16 test has 2 annotations.
If describe block has annotation it will be applied all tests inside the block
*/