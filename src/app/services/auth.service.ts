import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7004/api/User'; 

  constructor(private http: HttpClient) {}
  
private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  isLoggedIn$ = this.loggedIn.asObservable();

  login(token: string) {
    localStorage.setItem('authToken', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, userData);
  }
}