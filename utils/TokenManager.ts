//This file contains the function to generate the token
import { APIRequest, request } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 💡 Load the specific .env.dev file
dotenv.config({ path: path.resolve(__dirname, '.env.stage') });

export class TokenManager {
  private static token: string | null = null;
  private static expiresAt: number = 0;

  static async generateNewToken(): Promise<string|null> {
   
    // 💡 ALWAYS await request.newContext() to resolve it into an APIRequestContext
    const authContext = await request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com'
    });

    // ✅ Now '.post' is natively available on the resolved authContext instance
    const response = await authContext.post('/auth', {
      data: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    if (!response.ok()) {
      throw new Error(`❌ Auth failed: ${response.status()}`);
    }

    const responseBody = await response.json();
    this.token = responseBody.token; 
    this.expiresAt = Date.now() + ((responseBody.expires_in || 3600) * 1000);

    // Clean up context to prevent memory leaks
    await authContext.dispose();

    return TokenManager.token;
  }
}
