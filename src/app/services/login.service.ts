import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://localhost:7004/api/User';
 
  constructor(private http: HttpClient) {}
 
  requestOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login-request`, { email });
  }
 
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }
}
 