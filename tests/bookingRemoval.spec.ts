import { test, expect } from '@playwright/test';
import { APIOperations } from '../src/api/APIOperations';
import { TokenManager } from '../utils/TokenManager';
import { Booking } from '../src/models/booking.model';


test('Test 1: Successfull Booking removal  ', async ({ request }) => {
  
    const api = new APIOperations(request);

    let id = 13;
    const response = await api.delete(id);
    const responseBody = await response.text();
    console.log(responseBody);

    expect(response.status()).toBe(201);

});