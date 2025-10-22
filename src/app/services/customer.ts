import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  getOrderHistory() {
  return this.http.get<any[]>('/api/order/history');
}

trackOrder(orderId: number) {
  return this.http.get<any>(`/api/order/track/${orderId}`);
}
}