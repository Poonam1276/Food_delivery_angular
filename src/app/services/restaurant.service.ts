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

// restaurant-order-view.dto.ts
export interface OrderedItemDto {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface RestaurantOrderViewDto {
  orderId: number;
  customerName: string;
  orderedItems: OrderedItemDto[];
  grandTotal: number;
  orderDateTime: string;
  status: string;
  deliveryAgentName: string;
}


export class UpdateOrderStatusDto {
  orderId!: number;
  newStatus!: string;
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
getRestaurantProfile(): Observable<RestaurantIDDto> {
  const token = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.get<RestaurantIDDto>('https://localhost:7004/api/Restaurant/profile', { headers });
}

  // ✅ Update restaurant profile
  updateRestaurant(data: RestaurantIDDto): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.put('https://localhost:7004/api/Restaurant/update', data, { headers });
}




 getOrdersForRestaurant(): Observable<RestaurantOrderViewDto[]> {
    const token = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };

    return this.http.get<RestaurantOrderViewDto[]>('https://localhost:7004/api/Order/restaurant-orders', { headers });
  }


updateOrderStatus(dto: UpdateOrderStatusDto): Observable<any> {
  const token = localStorage.getItem('authToken');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.put('https://localhost:7004/api/Order/update-status', dto, { headers });
}


}
