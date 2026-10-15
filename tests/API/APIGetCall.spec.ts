import { test, request, expect, APIRequestContext } from '@playwright/test';

let reqContext: APIRequestContext;

/*  You can't use `request` directly with baseURL or headers.
 The `request` object is stateless and doesn't retain baseURL or headers.
 Use `request.newContext()` to create a reusable context with baseURL and shared headers */
test.beforeAll('Before All', async () => {

    reqContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            Accept: "application/json"
        }
    });
})


test("API Testing Get Practice 1", async ({ request }) => {
    // Direct GET request using full URL
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

//global setup
test("API Testing Get Practice 3", async ({ request }) => {

    const resp1 = await request.get("/booking");
    console.log(await resp1.json());
});

//global setup
test("API Testing Get Practice 4", async ({ request }) => {

    const resp1 = await request.get("/booking/95");
    console.log(await resp1.json());
});

//global setup
test("API Testing Get Practice 5", async ({ request }) => {

    const resp1 = await request.get("/booking?firstname=John&lastname=Smith");
    console.log(await resp1.json());
});

//global setup
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


//check whole data
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

    const resp1 = await request.get("/booking/1092");
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


/*
1. request.get(url) — Quick and Simple:
✅ Best for one-off requests
✅ You pass the full URL each time (e.g. https://site.com/endpoint)
❌ No session, headers, or cookies retained across calls

2. request.newContext() — Reusable, Stateful, Configurable:
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
