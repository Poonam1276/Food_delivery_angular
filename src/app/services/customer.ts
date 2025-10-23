import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface OrderHistoryDto {
  orderId: number;
  restaurantName: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  showDetails?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private apiUrl = 'https://localhost:7004/api/User';

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}`, userData);
  }
getOrderHistory(): Observable<{ $id: string; $values: OrderHistoryDto[] }> {
  return this.http.get<{ $id: string; $values: OrderHistoryDto[] }>('https://localhost:7004/api/Order/history');
}

trackOrder(orderId: number) {
  return this.http.get<any>(`https://localhost:7004/api/Order/track/${orderId}`);
}
}