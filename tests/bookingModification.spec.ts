import { test, expect } from '@playwright/test';
import { APIOperations } from '../src/api/APIOperations';
import { TokenManager } from '../utils/TokenManager';
import { Booking } from '../src/models/booking.model';


test('Test 1: Successfull Booking update  ', async ({ request }) => {
  
    const api = new APIOperations(request);

    let id = 12;
    const response = await api.put(id, {
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
  // ✅ Tell TypeScript & Playwright to ensure the response exists
    expect(response).not.toBeNull();

    const responseBody = await response!.json()   
    /*
    Yes, that is exactly what the ! symbol does! In TypeScript, adding an exclamation mark after a variable name is called the Non-Null Assertion Operator.
    By writing response!, you are tellings the TypeScript compiler: "I am 100% sure this variable is not null or undefined right now, so please stop throwing compile-time errors and let me call .json() on it."
    */
    console.log(responseBody);

    expect(response!.status()).toBe(200);
    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody.firstname).toBe("Sally");
    expect(responseBody).toHaveProperty("lastname");
        expect(responseBody.lastname).toBe("Brown");
    expect(responseBody).toHaveProperty("totalprice");
    expect(responseBody.totalprice).toBe(855);
    expect(responseBody).toHaveProperty("depositpaid");
        expect(responseBody.depositpaid).toBe(false);
    expect(responseBody).toHaveProperty("bookingdates.checkin");
        expect(responseBody.bookingdates.checkin).toBe("2018-11-07");
    expect(responseBody).toHaveProperty("bookingdates.checkout");
        expect(responseBody.bookingdates.checkout).toBe("2018-11-07");
    expect(responseBody).toHaveProperty("additionalneeds"); 
        expect(responseBody.additionalneeds).toBe("Breakfast");


});