import { Component } from '@angular/core';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  pincode: string = '';
 
  searchRestaurants() {
    if (this.pincode.trim()) {
      alert(`Searching restaurants near PIN: ${this.pincode}`);
      // Add your navigation or API logic here
    } else {
      alert('Please enter a valid PIN code.');
    }
  }
}