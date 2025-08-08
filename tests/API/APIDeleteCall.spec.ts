import { test, expect } from "@playwright/test";

//baseURL is initiated in config file
//delete booking
test("Delete Call For API Testing", async ({ request }) => {
    const respDelete = await request.delete("/booking/2", {
        headers: {
            Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
    });
    expect(respDelete.status()).toBe(201);

    const respDelText = await respDelete.text();
    console.log(respDelText);
    expect(respDelText).toEqual("Created");

    //try to get deleted booking
    const respGet = await request.get("https://restful-booker.herokuapp.com/booking/2");
    console.log(respGet.status());
    expect(respGet.status()).toBe(404);
});
