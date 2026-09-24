
export const Routes = {

    // This file contains all the routes or API endpoints that are used in the application

 // Keep these as relative endpoints. Playwright handles the base prefix.
    createBookingURL: "/booking",
    getBookingsURL: "/booking",
    
    // ✅ Fixed to inject the real id dynamically
    getBookingByIDURL: (id: string | number) => `/booking/${id}`,
    deleteBookingURL: (id: string | number) => `/booking/${id}`,
    updateBookingURL: (id: string | number) => `/booking/${id}`,
    
}