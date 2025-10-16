
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface CartItem {
//   CartItemId:number;
//   itemId: number;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   category: string;
//   foodImage: string;
// }

// export interface CartGroup {
//   cartId: number;
//   customerId: number;
//   restaurantId: number;
//   restaurantName: string;
//   totalAmount: number;
//   items: {
//     $id: string;
//     $values: CartItem[];
//   };
// }

// export interface CartResponse {
//   $id: string;
//   $values: CartGroup[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private baseUrl = 'https://localhost:7004/api/Cart';

//   constructor(private http: HttpClient) {}

//   getCustomerCart(): Observable<CartResponse> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     return this.http.get<CartResponse>(`${this.baseUrl}/customer-carts`, { headers });
//   }

//   removeItem(cartItemId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     return this.http.delete(`${this.baseUrl}/remove-item/${cartItemId}`, { headers });
//   }

//  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
//   const token = localStorage.getItem('authToken');
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${token}`
//   });

//   const body = {
//     cartItemId: cartItemId,
//     quantity: quantity
//   };

//   return this.http.put(`${this.baseUrl}/update-quantity`, body, { headers });
// }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getCustomerCart(): Observable<CartResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<CartResponse>(`${this.baseUrl}/customer-carts`, { headers });
  }

  removeItem(cartItemId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.baseUrl}/remove-item/${cartItemId}`, { headers , responseType:'text' as 'json'});
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  const body = {
    cartItemId: cartItemId,
    quantity: quantity
  };

  return this.http.put(`${this.baseUrl}/update-quantity`, body, { headers,responseType:'text' as 'json' });
}
}