import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,  RouterModule],
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
 
  constructor(private authService: AuthService) {}
 
  onSubmit() {
    this.authService.signup(this.user).subscribe({
      next: (response) => {
        this.message = response.message || 'Registration successful!';
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
 