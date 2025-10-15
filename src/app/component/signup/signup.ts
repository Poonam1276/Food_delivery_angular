import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.html',
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    role: ''
  };

  message: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'https://localhost:7004/api/User/Register'; // Replace with your actual API URL

    this.http.post(apiUrl, this.user).subscribe({
      next: (response: any) => {
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