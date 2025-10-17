import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  baseUrl = 'https://localhost:7004/api/MenuItem/search-by-pincode';

  constructor(private http: HttpClient) {}

  getMenuItems(pinCode: string): Observable<any> {
    const params = new HttpParams().set('pinCode', pinCode);
    return this.http.get(this.baseUrl, {params} );
  }
  searchByFilters(
  pinCode: string,
  restaurantName?: string,
  itemName?: string,
  category?: string,
  city?: string
): Observable<any> {
  let params = new HttpParams().set('pinCode', pinCode);
  if (restaurantName) params = params.set('restaurantName', restaurantName);
  if (itemName) params = params.set('itemName', itemName);
  if (category) params = params.set('category', category);
  if (city) params = params.set('city', city);

  return this.http.get('https://localhost:7004/api/MenuItem/search-by-filters', { params });
}

}