import { expect, test } from '@playwright/test';

test('API Testing - PUT Call 1', async ({ request }) => {
  const respPut = await request.put('/booking/1', {
    headers: {
      Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
      'Content-Type': 'application/json'
    },
    data: {
      firstname: 'Wish',
      lastname: 'Infinite',
      totalprice: 999,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Pan Cakes'
    }
  });

  const jsonresp = await respPut.json();

  //Assert
  console.log(jsonresp);
  expect(respPut.status()).toBe(200)
  expect(respPut.statusText()).toBe("OK")
  expect(respPut.ok()).toBeTruthy()
  
  expect(jsonresp).toMatchObject({
      firstname: 'Wish',
      lastname: 'Infinite',
      totalprice: 999,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Pan Cakes'
    })

    expect(jsonresp.firstname).toEqual("Wish")
});
