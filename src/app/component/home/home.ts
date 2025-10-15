import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports:[FormsModule, CommonModule, RouterModule],
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