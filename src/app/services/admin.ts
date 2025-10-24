import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Restaurant {
  userId: number;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: string;

  submittedRestaurants: submittedRestaurants[];
}

export interface submittedRestaurants{
  address: string;
  fssaiId: string;
  pinCode: number;
  fssaiImage: string;
  tradelicenseImage: string;
  tradeId: string;
  orderCount:number;

}
export interface DeliveryAgent {
  userId: number;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  agentId: number;
  address: string;
  documentUrl: string;
}
export interface TopRestaurant {
  name: string;
  orderCount: number;
  totalEarnings: number;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://localhost:7004/api/Admin';

  constructor(private http: HttpClient) {}

  getUnverifiedRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/unverified/restaurants`);
  }

  getUnverifiedAgents(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/unverified/agents`);
}

  verifyUser(userId: number, role: string): Observable<any> {
    const body = { userId, role };
    return this.http.put(`${this.baseUrl}/verify`, body);
  }

  getAllrestaurant(): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>('https://localhost:7004/api/Restaurant/getAllrestaurants');
}
// getTopRestaurants(topCount: number = 5): Observable<TopRestaurant[]> {
//     return this.http.get<TopRestaurant[]>(`https://localhost:7004/api/Restaurant/top-restaurants?topCount`);
//   }

getTopRestaurants(topCount: number = 5): Observable<TopRestaurant[]> {
  return this.http.get<TopRestaurant[]>(`https://localhost:7004/api/Restaurant/top-restaurants?topCount=${topCount}`);
}

}