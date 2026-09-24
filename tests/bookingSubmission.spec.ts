import { test, expect } from '@playwright/test';
import { APIOperations } from '../src/api/APIOperations';
import { TokenManager } from '../utils/TokenManager';
import { Booking } from '../src/models/booking.model';


test('Test 1: Successfull Booking submission  ', async ({ request }) => {
  
    const token = await TokenManager.generateNewToken();
    const api = new APIOperations(request);

    let id = 10;
    const response = await api.post({
        firstname: "Sally",
        lastname: "Brown",
        totalprice: 855,
        depositpaid: false,
        bookingdates: {
            checkin: "2018-11-07",
            checkout: "2018-11-07"
        },
        additionalneeds: "Breakfast"
    });

    const responseBody = await response.json();
    console.log(await response.json());

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody.bookingid).not.toBe(null);
    expect(responseBody).toHaveProperty("booking.firstname");
    expect(responseBody).toHaveProperty("booking.lastname");
    expect(responseBody).toHaveProperty("booking.totalprice");
    expect(responseBody).toHaveProperty("booking.depositpaid");
    expect(responseBody).toHaveProperty("booking.bookingdates.checkin");
    expect(responseBody).toHaveProperty("booking.bookingdates.checkout");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

});