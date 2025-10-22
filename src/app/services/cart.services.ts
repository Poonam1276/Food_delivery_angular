import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CartItem {
  cartItemId: number; // ✅ used for update/remove
  itemId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  foodImage: string;
}

export interface CartGroup {
  cartId: number;
  customerId: number;
  restaurantId: number;
  restaurantName: string;
  totalAmount: number;
  items: {
    $id: string;
    $values: CartItem[];
  };
}

export interface CartResponse {
  $id: string;
  $values: CartGroup[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://localhost:7004/api/Cart';
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  constructor(private http: HttpClient) {}

 
 addToCart(item: any): Observable<any> {
    const payload = {
      itemId: item.itemId || item.id,
      quantity: 1
    };

    return this.http.post(`${this.baseUrl}/add`, payload);
  }


 getCartCount() {
   return this.cartCount.value;
 }
 clearCart() {
   this.cartItems = [];
   this.cartCount.next(0);
 }
  getCustomerCart(): Observable<CartResponse> {

    return this.http.get<CartResponse>(`${this.baseUrl}/customer-carts`);
  }

  removeItem(cartItemId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/remove-item/${cartItemId}`);
  }
// , { headers , responseType:'text' as 'json'}
  updateQuantity(cartItemId: number, quantity: number): Observable<any> {

  const body = {
    cartItemId: cartItemId,
    quantity: quantity
  };

  return this.http.put(`${this.baseUrl}/update-quantity`, body);
}

 updateCartCount(count: number) {
    this.cartCount.next(count);
  }

}