// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
 
// @Component({
//   selector: 'app-admin-dashboard',
//   imports:[CommonModule],
//   templateUrl: './customer-dashboard.html',
//   styleUrls: ['./customer-dashboard.css'],
// })
// export class CustomerDashboard {
//   selectedItem: string = '';
 
//   menuItems = [
//     { label: 'Verify Restaurant', icon: 'bi bi-check2-square' },
//     { label: 'Verify Delivery Agent', icon: 'bi bi-person-check' },
//     { label: 'Update Profile', icon: 'bi bi-person-gear' },
//     { label: 'See All Menu Items', icon: 'bi bi-card-list' },
//     { label: 'See Graph', icon: 'bi bi-bar-chart' },
//     { label: 'See All Restaurants', icon: 'bi bi-shop' },
//   ];
 
//   selectMenu(label: string) {
//     this.selectedItem = label;
//   }
// }
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
 selector: 'app-customer-dashboard',
 imports:[CommonModule],
 templateUrl: './customer-dashboard.html',
 styleUrls: ['./customer-dashboard.css']
})
export class CustomerDashboard {
 selectedItem: string = '';
 menuItems = [
   { label: 'See All Menu Items', icon: 'bi bi-card-list' },
   { label: 'Order History', icon: 'bi bi-receipt-cutoff' },
   { label: 'Update Profile', icon: 'bi bi-person-gear' },
   { label: 'Track Order', icon: 'bi bi-truck' }
 ];
 selectItem(label: string) {
   this.selectedItem = label;
 }
 logout() {
   localStorage.removeItem('authToken');
   alert('You have been logged out successfully.');
   window.location.href = '/login';
 }
}