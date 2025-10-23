import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CustomerService } from '../../services/customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderHistoryDto } from '../../services/customer'; // or from '../../models/order-history.dto'

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css']
})

export class CustomerDashboard {
  selectedItem: string = '';
  orderStatus: string = 'Preparing';
    orderHistory: OrderHistoryDto[] = [];
trackedOrder: any = null;
inputOrderId: string = '';
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
  constructor(private router: Router, private customerService: CustomerService) {}

  selectItem(label: string) {
    this.selectedItem = label;

    if (label === 'See All Menu Items') {
      this.router.navigate(['/menu']);
      return;
    }


if (label === 'Order History') {
    this.customerService.getOrderHistory().subscribe({
      next: (res) => {
        console.log('Order history response:', res);
        this.orderHistory = res.$values ?? [];
      },
      error: (err) => {
        console.error('Error fetching order history:', err);
        alert('Failed to load order history.');
      }
    });
  }


 if (label === 'Track Order') {
  this.trackedOrder = null;
  this.inputOrderId = '';
  this.orderStatus = '';
}


    if (label === 'Update Profile') {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id;

        this.customerService.getUserById(userId).subscribe({
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

      this.customerService.updateUser(userId, this.user).subscribe({
        next: () => alert('Profile updated successfully!'),
        error: () => alert('Failed to update profile.')
      });
    } else {
      alert('You must be logged in to update profile.');
    }
  }
simulateOrderProgress() {
 this.orderStatus = 'Preparing';
 setTimeout(() => (this.orderStatus = 'Out for Delivery'), 3000);
 setTimeout(() => (this.orderStatus = 'Delivered'), 6000);
}

trackOrderById() {
  const orderId = parseInt(this.inputOrderId);
  if (!orderId || isNaN(orderId)) {
    alert('Please enter a valid Order ID.');
    return;
  }

  this.customerService.trackOrder(orderId).subscribe({
  next: (res: any) => {
    console.log('Track order response:', res);
    this.trackedOrder = res;
    this.orderStatus = res.status;
  },
  error: (err) => {
    console.error('Track order error:', err);
    alert('Order not found or unable to track.');
    this.trackedOrder = null;
  }
});
}
toggleDetails(order: any) {
 order.showDetails = !order.showDetails;
}

ngOnInit() {
  this.customerService.getOrderHistory().subscribe({
    next: (res) => {
      this.orderHistory = res.$values ?? [];
    },
    error: (err) => {
      console.error('Error fetching order history:', err);
    }
  });
}

  logout() {
    localStorage.removeItem('authToken');
    alert('You have been logged out successfully.');
    this.router.navigate(['/login']);
  }
}