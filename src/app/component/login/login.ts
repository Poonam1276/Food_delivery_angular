import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LoginService } from '../../services/login.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  returnUrl: string = '/';
  constructor(private loginService: LoginService,
     private authService: AuthService,
  private router: Router,
  private route: ActivatedRoute
) {}



ngOnInit() {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/menu';
}


  requestOtp() {
    this.loginService.requestOtp(this.email).subscribe({
      next: (res: any) => {
        this.otpRequested = true;
        this.message = typeof res === 'string'
          ? res
          : res.message || 'OTP sent successfully.';
      },
      
error: (err: any) => {
  console.error('OTP Request Error:', err);
  this.message = err.error?.toString() || err.message || 'Failed to send OTP. Please try again.';
}

    });
  }

 verifyOtp() {
  this.loginService.verifyOtp(this.email, this.otp).subscribe({
    next: (res: any) => {
      localStorage.setItem('authToken', res.token);
      this.authService.login(res.token); // ✅ notify navbar
      this.message = res.message || 'OTP verified successfully!';

      const role = res.role?.toLowerCase(); // assuming role is returned in response
      switch (role) {
        case 'admin':
          window.location.href = '/admin';
          break;
        case 'customer':
          const pinCode = localStorage.getItem('pinCode') || '';
          this.router.navigate(['/menu'], {
            queryParams: { pin: pinCode }
          });
          break;
        case 'restaurant':
          window.location.href = '/dashboard';
          break;
        case 'delivery agent':
          window.location.href = '/delivery-dashboard';
          break;
        default:
          this.message = 'Unknown role. Cannot redirect.';
      }
    },
    error: (err: any) => {
      this.message =
        typeof err.error === 'string'
          ? err.error
          : 'OTP verification failed. Please try again.';
    }
  });
}
}