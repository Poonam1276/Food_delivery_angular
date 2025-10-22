import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CreateOrderFromCartDto {
  cartId: number;
}

interface AssignAddressToOrderDto {
  orderId: number;
  addressId: number;
}

interface OrderedItemDto {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

interface BillDto {
  agentName: string;
  restaurantName: string;
  distanceKm: number;
  estimatedTimeMinutes: number;
  deliveryCharge: number;
  items: OrderedItemDto[];
  itemsTotal: number;
  grandTotal: number;
}

interface OrderResponse {
  orderId: number;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://localhost:7004/api';

  constructor(private http: HttpClient) { }



  createOrderFromCart(dto: CreateOrderFromCartDto): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.baseUrl}/order/create-from-cart`, dto);
  }

  getMyAddresses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Address/my-addresses`);
  }

  addAddress(dto: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Address`, dto);
  }

  assignAddress(dto: AssignAddressToOrderDto): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/order/assign-address`, dto);
  }

  assignAgent(orderId: number): Observable<{ message: string; agentId: number; agentName: string }> {
    return this.http.put<{ message: string; agentId: number; agentName: string }>(
      `${this.baseUrl}/order/assign-agent/${orderId}`, {}
    );
  }

  getBill(orderId: number): Observable<BillDto> {
    return this.http.get<BillDto>(`${this.baseUrl}/bill/bill/order/${orderId}`);
  }

}