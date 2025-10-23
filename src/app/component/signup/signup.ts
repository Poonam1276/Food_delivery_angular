import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    role: ''
  };

  message: string = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 onSubmit() {
  this.authService.signup(this.user).subscribe({
    next: (response) => {
      this.message = response.message || 'Registration successful!';

      localStorage.setItem('userId', response.userId.toString());

      if (this.user.role === 'Restaurant') {
        this.router.navigate(['/profilecompletion'], {
          queryParams: {
            name: this.user.name,
            email: this.user.email
          }
        });
      }
      if (this.user.role === 'DeliveryAgent') {
          this.router.navigate(['/delivery-agent-details'], {
            queryParams: {
              name: this.user.name,
              email: this.user.email
            }
          });
        }
    },
    error: (error) => {
      if (error.status === 409) {
        this.message = error.error;
      } else {
        this.message = 'An error occurred during registration.';
      }
    }
  });
}

}