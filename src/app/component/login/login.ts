import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LoginService } from '../../services/login.service';
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
 
=======
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

>>>>>>> 3d102429375c0c146c8055fa677e902fe1f050ab
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
<<<<<<< HEAD
 
  constructor(private loginService: LoginService) {}
 
=======
  returnUrl: string = '/';
  constructor(private loginService: LoginService,
     private authService: AuthService,
  private router: Router,
  private route: ActivatedRoute
) {}



ngOnInit() {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/menu';
}


>>>>>>> 3d102429375c0c146c8055fa677e902fe1f050ab
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
      this.message = res.message || 'OTP verified successfully!';
      
      const user: any = jwtDecode(res.token);
      console.log("Decoded user:", user);
localStorage.setItem('userId', user.id); // ✅ Store userId for dashboard use

<<<<<<< HEAD
      const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      const role = user[roleClaim]?.toLowerCase();

      if (!role) {
        this.message = 'Role not found in token. Cannot redirect.';
        return;
      }

      console.log("User role:", role);

      switch (role) {
        case 'admin':
          window.location.href = '/admin-dashboard';
          break;
        case 'customer':
          window.location.href = '/customer-dashboard';
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
=======
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
>>>>>>> 3d102429375c0c146c8055fa677e902fe1f050ab
    },
    error: (err: any) => {
      this.message =
        typeof err.error === 'string'
          ? err.error
          : 'OTP verification failed. Please try again.';
    }
  });
}
<<<<<<< HEAD

=======
>>>>>>> 3d102429375c0c146c8055fa677e902fe1f050ab
}