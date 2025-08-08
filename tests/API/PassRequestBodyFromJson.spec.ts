import { test, expect } from '@playwright/test';
import * as apidata from "../../testData/apiData.json";

test('API Testing - Pass Request body from JSON For Post Call', async ({ request }) => {
    const respPost = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: apidata.postcalldata //apidata comes from json file
    });

    //Assert
    const respJson = await respPost.json();
    console.log(respJson)
    expect(respJson.booking).toMatchObject(apidata.postcalldata);
    expect(respJson.booking.firstname).toEqual(apidata.postcalldata.firstname)
});


test("API Testing - Pass Request Payload from JSON for Put Call", async ({ request }) => {
    const respPut = await request.put("https://restful-booker.herokuapp.com/booking/1", {
        headers: {
            Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data: apidata.putcalldata
    });

    const respPutJson = await respPut.json();
    expect(respPutJson).toMatchObject(apidata.putcalldata)
});
