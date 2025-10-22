import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RestaurantIDDto {
  restaurantId?: number;
  userId: number;
  address?: string;
  fssaiId?: string;
  pinCode?: number;
  fssaiImage?: string;
  tradelicenseImage?: string;
  tradeId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://localhost:7004/api/Restaurant';

  constructor(private http: HttpClient) {}

  // ✅ Submit restaurant details (multipart/form-data)
  submitRestaurantDetails(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, formData);
  }

  // ✅ Get restaurant profile by userId
 getRestaurantByUserId(userId: number): Observable<any> {
  return this.http.get(`https://localhost:7004/api/Restaurant/getByUserId/${userId}`);
}


  // ✅ Update restaurant profile
  updateRestaurant(data: any): Observable<any> {
  return this.http.put(`https://localhost:7004/api/Restaurant/restaurant/update`, data);
}
}
