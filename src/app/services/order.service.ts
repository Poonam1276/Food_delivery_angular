import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

 

  createOrderFromCart(dto: CreateOrderFromCartDto): Observable<OrderResponse> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<OrderResponse>(`${this.baseUrl}/order/create-from-cart`, dto, { headers });
}

getMyAddresses(): Observable<any[]> {
   const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.get<any[]>(`${this.baseUrl}/Address/my-addresses`,{headers});
}

addAddress(dto: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/Address`, dto, { headers });
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
     const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.http.get<BillDto>(`${this.baseUrl}/bill/bill/order/${orderId}`,{headers});
  }
  
}