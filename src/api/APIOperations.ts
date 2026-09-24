import { APIRequestContext, APIResponse } from "@playwright/test";
import { Routes } from "./Routes";
import { TokenManager } from '../../utils/TokenManager';

export class APIOperations {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) { 
        this.request = request; 
    }

    // POST API
    async post(payload: any, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.request.post(Routes.createBookingURL, { 
            data: payload, 
            headers: { ...headers }
        });
    }

    // GET API
    async get(id: string | number | null, headers?: Record<string, string>): Promise<APIResponse> {
        if (id != null) {
            return await this.request.get(Routes.getBookingByIDURL(id), { 
                headers: { ...headers }
            });
        } else {
            return await this.request.get(Routes.getBookingsURL, { 
                headers: { ...headers }
            });
        }
    }
   
    // PUT API
    async put(id: string | number, payload: any, headers?: Record<string, string>): Promise<APIResponse | null> {
        const token = await TokenManager.generateNewToken();

        if (id != null) {
            return await this.request.put(Routes.updateBookingURL(id), {    
                headers: { 
                ...headers,
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json' 
                }, 
                data: payload
            });
        } else {
            console.log("❌ No ID provided for updating booking");
            return null;
        }
    }

    // DELETE API - Removed 'url: string'
    async delete(id: string | number, headers?: Record<string, string>): Promise<APIResponse> {
        const token = await TokenManager.generateNewToken();
         console.log(token);

        return await this.request.delete(Routes.deleteBookingURL(id), {
            headers: { 
                ...headers,
                'Cookie': `token=${token}`
            }
        });
    }
}
