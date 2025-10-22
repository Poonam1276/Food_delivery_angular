import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentService {
  private apiUrl = 'https://localhost:7004/api/Delivery';

  private agentId: number = 0;
  private userId: number = 0;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } | {} {
    const token = localStorage.getItem('authToken');
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

 
  submitAgentDetails(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, formData);
  }


  updateAgentProfile(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/delivery-agent/update`, formData);
  }

  setAgentInfo(agentId: number, userId: number): void {
    this.agentId = agentId;
    this.userId = userId;
  }

  getAgentId(): number {
    return this.agentId;
  }

  getUserId(): number {
    return this.userId;
  }

  getOrdersForAgent(): Observable<any[]> {
  return this.http.get<any>(`${this.apiUrl}/orders/agentId`, this.getAuthHeaders()).pipe(
    map(response => response?.$values ?? []) 
  );
}

  markOrderAsDelivered(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/mark-delivered/${orderId}`, {}, this.getAuthHeaders());
  }

  logout(): void {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
}