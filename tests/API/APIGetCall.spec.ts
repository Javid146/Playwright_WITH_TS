import { test, request, expect, APIRequestContext } from '@playwright/test';

let reqContext: APIRequestContext;


/*
2. Compare imported factory request vs built-in request:
Feature	                                'import { request } from '@playwright/test'	            built-in request 'async ({ request }) => {}'
What is it?	                            Factory	                                                APIRequestContext fixture
Can make HTTP calls directly?	        No, not until you create a context	                    Yes
How do you get a context?	            request.newContext()	                                Playwright supplies it
Can use a base URL?	                    Yes, when creating a context	                        Yes, through Playwright configuration
Can retain cookies between requests?    The factory itself doesn't; its created context can	    Yes, the fixture's context can
Who manages cleanup?	                You dispose of the context	                            Playwright manages the fixture lifecycle



1. Built-in { request } fixture — Quick and Simple:
✅ Convenient for one-off API requests.
✅ Can use a full URL or a configured baseURL.
✅ Supports request-specific headers and configured default headers.
✅ Retains cookie state within the same APIRequestContext.
✅ Playwright manages the fixture lifecycle. 


2. request.newContext() — Reusable, Stateful, Configurable:
 Use `request.newContext()` to create a separate, reusable APIRequestContext with its own baseURL and default headers.
✅ Ideal when:
   - You reuse the same base URL
   - You set headers (e.g. tokens) once
   - You make multiple requests in a test or file
✅ Keeps your code cleaner and more DRY

3. Global Setup — Define once in playwright.config.ts:
use: {
  baseURL: "https://restful-booker.herokuapp.com",
  extraHTTPHeaders: {
    Accept: "application/json"}}
    
✅ You only write `request.get('/endpoint')`
✅ Automatically uses baseURL
✅ Best for consistent environments (e.g. same staging API)

❓ What if you have multiple APIs?

Option A: Use global `baseURL` only if all tests use the same domain.

Option B: If you test multiple APIs/domains:
  🔸 Use `request.newContext({ baseURL })` inside `beforeAll()` or test.
  🔸 This allows separate configs per API group/file.
  🔸 Cleaner than changing global config for every test.
*/
test.beforeAll('Before All', async () => {

    reqContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            Accept: "application/json"
        }
    });
})


test("API Testing Get Practice 1", async ({ request }) => {
    // Direct GET request using full URL. this used as an example. all the rest are using reqContext
    const resp1 = await request.get("https://restful-booker.herokuapp.com/booking", {
        headers: {
            Accept: "application/json"
        }
    });
    console.log(await resp1.json());
});

test("API Testing Get Practice 2", async () => {

    const resp1 = await reqContext.get("/booking");
    console.log(await resp1.json());
});

/*
global setup. this test does not use baseURL from my custom reqContext in beforeAll hook. it uses baseURL from playwright.config.ts file. 
this is just to show that you can use baseURL from config file as well.
but it is only for testing purpose. in real world you should use either reqContext or baseURL from config file. not both. but since reqContext is in this file
it is logical to use reqContext for all the tests in this file. but this test is just to show that you can use baseURL from config file as well.
*/
test("API Testing Get Practice 3", async ({ request }) => {

    const resp1 = await request.get("/booking");
    console.log(await resp1.json());
});

//global setup. this test does not use baseURL from my custom reqContext in beforeAll hook. it uses baseURL from playwright.config.ts file. this is just to show that you can use baseURL from config file as well.
test("API Testing Get Practice 4", async ({ request }) => {

    const resp1 = await request.get("/booking/95");
    console.log(await resp1.json());
});

//global setup. this test does not use baseURL from my custom reqContext in beforeAll hook. it uses baseURL from playwright.config.ts file. this is just to show that you can use baseURL from config file as well.
test("API Testing Get Practice 5", async ({ request }) => {

    const resp1 = await request.get("/booking?firstname=John&lastname=Smith");
    console.log(await resp1.json());
});

//global setup. this test does not use baseURL from my custom reqContext in beforeAll hook. it uses baseURL from playwright.config.ts file. this is just to show that you can use baseURL from config file as well.
test("API Testing Get Practice 6", async ({ request }) => {

    const resp1 = await request.get("/booking", {
        params: {
            firstname: "John",
            lastname: "Smith"
        }
    });

    console.log(await resp1.json());
    // expect(resp1.status()).toBe(200)
    expect(resp1.ok()).toBeTruthy()
});


//global setup. this test does not use baseURL from my custom reqContext in beforeAll hook. it uses baseURL from playwright.config.ts file. this is just to show that you can use baseURL from config file as well.
test("API Testing Get Practice 7", async ({ request }) => {

    const resp1 = await request.get("/booking/1092");

    console.log(await resp1.json());

    expect(await resp1.json()).toMatchObject({
        "firstname": "Josh",
        "lastname": "Allen",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "super bowls"
    })
});

//check piece of data
test("API Testing Get Practice 8", async ({ request }) => {

    const resp1 = await reqContext.get("/booking/1092");
    const data = await resp1.json();

    console.log(data);
    expect(data).toMatchObject({
        "firstname": "Josh",
        "lastname": "Allen"
    })

    expect(data.firstname).toEqual("Josh");
});


// Dispose of the API request context after all tests finish.
// If we don't dispose of it, its resources may remain allocated longer than necessary.
// This helps release resources and ensures proper cleanup.

test.afterAll(async () => {
    await reqContext.dispose();
});


