// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface CartItem {
//   cartItemId: number;
//   itemId: number;
//   itemName: string;
//   itemPrice: number;
//   quantity: number;
// }

// export interface CartResponse {
//   cartId: number;
//   userId: number;
//   restaurantId: number;
//   items: CartItem[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private baseUrl = 'https://localhost:7004/api/Cart';

//   constructor(private http: HttpClient) {}

//   // getCustomerCart(): Observable<CartResponse> {
//   //   const token = localStorage.getItem('authToken');
//   //   const headers = new HttpHeaders({
//   //     Authorization: `Bearer ${token}`

//   //   });
//   //   console.log(headers);
//   //   console.log('Authorization Header:', headers.get('Authorization'));

//   //   return this.http.get<CartResponse>(`${this.baseUrl}/customer-cart`, { headers });
//   // }
//   getCustomerCart(): Observable<CartResponse> {
//   const token = localStorage.getItem('authToken');
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${token}`
//   });

//   return this.http.get<CartResponse>(`${this.baseUrl}/customer-cart`, { headers });
// }


//   removeItem(cartItemId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });
//     console.log(headers);

//     return this.http.delete(`${this.baseUrl}/remove-item/${cartItemId}`, { headers });
//   }

//   updateQuantity(cartItemId: number, quantity: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     return this.http.put(`${this.baseUrl}/update-quantity/${cartItemId}`, { quantity }, { headers });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
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

    return this.http.get<CartResponse>(`${this.baseUrl}/customer-cart`, { headers });
  }

  removeItem(cartItemId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.baseUrl}/remove-item/${cartItemId}`, { headers });
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.baseUrl}/update-quantity/${cartItemId}`, { quantity }, { headers });
  }
}
