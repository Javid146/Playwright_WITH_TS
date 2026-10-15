import { test } from "@playwright/test";
import fs from "fs" //fs=file system
import { parse } from "csv-parse/sync"

// needed for type assertion in order to avoid red underline thrown by TS. Not strictly required, but good practice in TypeScript.
type UserRecord = {
    FirstName: string;
    LastName: string;
};


const records = parse(fs.readFileSync('testData/testData.csv'), {
    columns: true, //tells csv-parse to treat the first row of the CSV file as the header, and to return each row as a JavaScript object using those column names as keys.
    skip_empty_lines: true
    //delimiter: ";" //default delimiter is comma. Add this line if delimiter is other character
}) as UserRecord[]; //type assertion to specify that the records variable is an array of UserRecord objects. It's not strictly required, but it's a good practice in TypeScript.

/*
Read CSV file:
1. create CSV file
2. import fs and parse to test file. 
3. declare records. Add CSV file path in parse method. (line 6)

both loops (for...of and forEach) approaches below create the same number of Playwright tests.
If you're testing the same thing with multiple sets of data (parametrized) from the CSV use loops.
Otherwise, loop not needed.
*/


records.forEach(record => {

    test(`Get Data from CSV ${record.FirstName}`, async ({ page }) => {
        await page.goto("https://demoqa.com/automation-practice-form");
        await page.getByPlaceholder("First Name").fill(record.FirstName);
        await page.getByPlaceholder("Last Name").fill(record.LastName);
    });
});

for(const record of records){

    test(`Get Data from CSV ${record.FirstName}`, async ({ page }) => {
        await page.goto("https://demoqa.com/automation-practice-form");
        await page.getByPlaceholder("First Name").fill(record.FirstName);
        await page.getByPlaceholder("Last Name").fill(record.LastName);
    });
}
