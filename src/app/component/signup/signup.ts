import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
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
    const apiUrl = 'https://localhost:7004/api/user/register';

    this.http.post(apiUrl, this.user).subscribe({
      next: (response: any) => {
        this.message = response.message || 'Registration successful!';
      },
     
    });
  }
}