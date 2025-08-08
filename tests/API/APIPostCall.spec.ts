import { expect, test } from "@playwright/test";

test("API Testing - Post Call 1", async ({ request }) => {
    const resp1 = await request.post("/booking", {
        data: {
            firstname: "Jim",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        }
    });

    const jsonResp1 = await resp1.json();

    //Assert
    console.log(jsonResp1);
    expect(resp1.status()).toBe(200)
    expect(resp1.statusText()).toBe("OK")
    expect(resp1.ok()).toBeTruthy()
    expect(jsonResp1.booking).toMatchObject({
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        }
    })

    expect(jsonResp1.booking.firstname).toEqual("Jim")
});

