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



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://localhost:7004/api/Admin';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUnverifiedRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/unverified/restaurants`, {
      headers: this.getAuthHeaders()
    });
  }

  getUnverifiedAgents(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/unverified/agents`, {
    headers: this.getAuthHeaders()
  });
}

  verifyUser(userId: number, role: string): Observable<any> {
    const body = { userId, role };
    return this.http.put(`${this.baseUrl}/verify`, body, {
      headers: this.getAuthHeaders()
    });
  }

  getAllrestaurant():Observable<any> {
    return this.http.get(`https://localhost:7004/api/Restaurant/getAllrestaurants`);
  }
}