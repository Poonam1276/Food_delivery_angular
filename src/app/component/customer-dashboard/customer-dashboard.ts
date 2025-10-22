import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
@Component({
 selector: 'app-customer-dashboard',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './customer-dashboard.html',
 styleUrls: ['./customer-dashboard.css']
})
export class CustomerDashboard {
 selectedItem: string = '';
 orderStatus: string = 'Preparing'; // Possible values: 'Preparing', 'Out for Delivery', 'Delivered'
 menuItems = [
   { label: 'See All Menu Items', icon: 'bi bi-card-list' },
   { label: 'Order History', icon: 'bi bi-receipt-cutoff' },
   { label: 'Update Profile', icon: 'bi bi-person-gear' },
   { label: 'Track Order', icon: 'bi bi-truck' }
 ];
 user: any = {
   name: '',
   email: '',
   phone: '',
   role: ''
 };
 constructor(private router: Router, private http: HttpClient) {}

selectItem(label: string) {
  this.selectedItem = label;
 
  if (label === 'See All Menu Items') {
    this.router.navigate(['/menu']); // ✅ Redirect to menu page
    return;
  }
if (label === 'Track Order') {
  this.orderStatus = 'Preparing'; // Reset to initial status
  setTimeout(() => this.orderStatus = 'Out for Delivery', 3000);
  setTimeout(() => this.orderStatus = 'Delivered', 6000);
}
  if (label === 'Update Profile') {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id; // or decodedToken.userId if you used a custom claim

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get(`https://localhost:7004/api/User/${userId}`, { headers }).subscribe({
        next: (res: any) => {
          this.user = {
            name: res.name,
            email: res.email,
            phone: res.phone,
            role: res.role
          };
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
          alert('Unable to load your profile details.');
        }
      });
    } else {
      alert('User not logged in.');
      this.router.navigate(['/login']);
    }
  }
}
updateProfile() {
  const token = localStorage.getItem('authToken');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id;

    if (!userId) {
      alert('User ID not found in token.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.put(`https://localhost:7004/api/User/update/${userId}`, this.user, { headers }).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: () => alert('Failed to update profile.')
    });
  } else {
    alert('You must be logged in to update profile.');
  }
}
 logout() {
   localStorage.removeItem('authToken');
   alert('You have been logged out successfully.');
   this.router.navigate(['/login']);
 }
}