import { test, expect } from "@playwright/test";

test("Fetch and Validate Response Header", async ({ request }) => {
    const getResponse = await request.get("/booking/1");
    const headersValue = getResponse.headers();
    console.log(headersValue);
    expect(headersValue.server).toEqual("Heroku");

    //it means value of key "x-powered-by" equal to "Express"
    expect(headersValue["x-powered-by"]).toEqual("Express");

    console.log("****************************************************************************");
    console.log("headersArray()")
    console.log("****************************************************************************");
    const headersArrayValues = getResponse.headersArray();
    console.log("headersArray: " + JSON.stringify(headersArrayValues));
    expect(headersArrayValues.length).toBe(10);

    console.log("****************************************************************************");
    console.log("HEADERS WITH FOR LOOP")
    console.log("****************************************************************************");

    headersArrayValues.forEach((header) => {
        //header key and value
        console.log(header.name + ":::" + header.value);
        //all headers
        // console.log(header)
    });
});
