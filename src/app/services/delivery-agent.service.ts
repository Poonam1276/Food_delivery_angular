import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentService {
  
  private apiUrl = 'https://localhost:7004/api/Delivery'; 

  constructor(private http: HttpClient) {}

  submitAgentDetails(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, formData);
  }
}