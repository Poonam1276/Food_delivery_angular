import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LoginService } from '../../services/login.service';
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  otp: string = '';
  otpRequested: boolean = false;
  message: string = '';
 
  constructor(private loginService: LoginService) {}
 
  requestOtp() {
    this.loginService.requestOtp(this.email).subscribe({
      next: (res: any) => {
        this.otpRequested = true;
        this.message = typeof res === 'string'
          ? res
          : res.message || 'OTP sent successfully.';
      },
      error: (err:any) => {
        this.message =
          typeof err.error === 'string'
            ? err.error
            : 'Failed to send OTP. Please try again.';
      }
    });
  }
 
  verifyOtp() {
    this.loginService.verifyOtp(this.email, this.otp).subscribe({
      next: (res: any) => {
        localStorage.setItem('authToken', res.token);
        this.message = res.message || 'OTP verified successfully!';
        // Optionally redirect to dashboard here
      },
      error: (err:any) => {
        this.message =
          typeof err.error === 'string'
            ? err.error
            : 'OTP verification failed. Please try again.';
      }
    });
  }
}