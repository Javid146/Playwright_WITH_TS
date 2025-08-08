import { expect, test } from "@playwright/test";


/* While order is not strictly guaranteed by default, putting all steps in the same describe block ensures:
beforeAll() runs first.
Then, the tests inside the block run in the order you wrote them (unless parallelized) */

test.describe("Booking lifecycle with token-based auth", () => {
    let tokenValue: string;
    let bookingId: number;

    test.beforeAll("Get Auth Token", async ({ request }) => {
        const respToken = await request.post("https://restful-booker.herokuapp.com/auth", {
            data: {
                "username": "admin",
                "password": "password123"
            }
        });
        tokenValue = (await respToken.json()).token;
    });

    test("Create booking", async ({ request }) => {
        const bookingResponse = await request.post("https://restful-booker.herokuapp.com/booking", {
            data: {
                "firstname": "Test",
                "lastname": "User",
                "totalprice": 123,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-01-01",
                    "checkout": "2025-01-02"
                },
                "additionalneeds": "None"
            }
        });

        const responseJson = await bookingResponse.json();
        bookingId = responseJson.bookingid;

        console.log("Booking created:", responseJson);
        expect(bookingResponse.status()).toBe(200);
    });

    test("Update booking using token auth", async ({ request }) => {
        const resPut = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${tokenValue}`
            },
            data: {
                "firstname": "Wish",
                "lastname": "Brown",
                "totalprice": 11,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        });

        const responseJSON = await resPut.json();
        console.log("Updated booking:", responseJSON);
        expect(resPut.status()).toBe(200);
    });

    test("Delete booking using token auth", async ({ request }) => {
        const respDelete = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${tokenValue}`
            }
        });

        expect(respDelete.status()).toBe(201);
        console.log("Booking deleted.");
    });
});
