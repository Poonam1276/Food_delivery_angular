// src/app/core/services/restaurant.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // To get the user token

// Define a model for the restaurant data
export interface RestaurantDetails {
  // Initial Data (Read-Only)
  name: string;
  email: string;
  phone: string;
  // Completion Data (Editable)
  address: string | null;
  pincode: string | null;
  fssaiId: string | null;
  tradeId: string | null;
  // Files are handled separately for upload
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  
  // 🚨 IMPORTANT: Replace with your actual .NET Web API endpoint for restaurants
  private readonly apiUrl = 'https://localhost:7001/api/restaurant'; 

  /**
   * Fetches the current restaurant's details from the backend.
   */
  getRestaurantDetails(): Observable<RestaurantDetails> {
    // Note: Authentication (JWT token) needs to be handled, usually via an HTTP Interceptor (Next step!)
    return this.http.get<RestaurantDetails>(`${this.apiUrl}/details`);
  }

  /**
   * Submits the updated details (completion data) to the backend.
   * Note: File uploads usually require FormData, which is not shown here for simplicity.
   */
  updateRestaurantDetails(data: any): Observable<any> {
    // You would typically use FormData to include file objects (Fssai Image, Trade Licence Image)
    return this.http.post(`${this.apiUrl}/update-details`, data);
  }
}