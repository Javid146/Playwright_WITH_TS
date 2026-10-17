import { test, expect } from "@playwright/test";

test("Fetch and Validate Response Header", async ({ request }) => {
    const getResponse = await request.get("/booking/1");
    const headersValue = getResponse.headers();
    console.log(headersValue);
    expect(headersValue.server).toEqual("Heroku");

    /*
    it means value of key "x-powered-by" equal to "Express".
    Normally, you can access an object property using dot notation: headersValue.contentType.
    But "x-powered-by" contains hyphens (-), so you cannot write: headersValue.x-powered-by // ❌
    JavaScript interprets the hyphen as a minus operator. Therefore, you use bracket notation: headersValue["x-powered-by"]  ✅

    headers():
    returns an object containing all the response headers as key-value pairs. Example:
    {
    'content-type': 'application/json',
    'cache-control': 'no-cache',
    }

    headersArray():
    returns an array of objects, each object contains name and value of header. Example:
    [
    { name: 'Content-Type', value: 'application/json' },
    { name: 'Cache-Control', value: 'no-cache' },
    ]
    */
    expect(headersValue["x-powered-by"]).toEqual("Express");

    console.log("****************************************************************************");
    console.log("headersArray()")
    console.log("****************************************************************************");
    const headersArrayValues = getResponse.headersArray();
    /*stringify() converts object or array to string. it is useful for logging purpose. otherwise it will print [object Object]
    if you use console.log("headersArray: " + headersArrayValues) because + concatenates string and object. so it will convert object to string using toString() method which returns [object Object] for any object.
    If you use console.log("headersArray: " + headersArrayValues.toString()) it will also print [object Object] because toString() method returns [object Object] for any object.
    if you use console.log("headersArray: ", headersArrayValues) it will print array of objects in a readable format. Comma shows that console.log() is taking multiple arguments. It will print first argument as string and second argument as object. so it will print array of objects in a readable format.
    If you use console.log("headersArray: " + JSON.stringify(headersArrayValues)) it will convert object to string using JSON.stringify() method which returns string representation of object. */

    */
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
