import { test, expect } from '@playwright/test';
import { APIOperations } from '../src/api/APIOperations';
import { TokenManager } from '../utils/TokenManager';
import { Booking } from '../src/models/booking.model';


test('Test 1: Booking details for requested id gets retrieved successfully ', async ({ request }) => {
  
    const token = await TokenManager.generateNewToken();
    const api = new APIOperations(request);

    let id = 10;
    const response = await api.get(id);

    const responseBody = await response.json();
    console.log(await response.json());

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

    expect(response.status()).toBe(200);

});