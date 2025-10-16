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
}