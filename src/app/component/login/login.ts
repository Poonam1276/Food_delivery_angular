
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  otp: string = '';
  otpRequested: boolean = false;
  message: string = '';

  constructor(private http: HttpClient) {}

  requestOtp() {
  const apiUrl = 'https://localhost:7004/api/User/login-request';

  this.http.post(apiUrl, { email: this.email }).subscribe({
    next: (res: any) => {
      this.otpRequested = true;

      // Fix: extract message from response
      this.message = typeof res === 'string' ? res : res.message || 'OTP sent successfully.';
    },
    error: (err) => {
      this.message = typeof err.error === 'string' ? err.error : 'Failed to send OTP.';
    }
  });
}

  verifyOtp() {
    const apiUrl = 'https://localhost:7004/api/user/verify-otp';
    this.http.post(apiUrl, { email: this.email, otp: this.otp }).subscribe({
      next: (res: any) => {
        this.message = res.message;
        localStorage.setItem('authToken', res.token); // Store JWT token
        // Optionally redirect to dashboard
      },
      error: (err) => {
        this.message = err.error || 'OTP verification failed.';
      }
    });
  }
}
