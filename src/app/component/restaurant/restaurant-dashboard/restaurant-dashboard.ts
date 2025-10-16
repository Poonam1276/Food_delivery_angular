// src/app/features/dashboards/restaurant/restaurant-dashboard.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Import FormsModule for binding
import { AuthService } from '../../../services/auth.service';
import { RestaurantService,RestaurantDetails } from '../../../services/restaurant.service'; // Import the new Service

@Component({
  selector: 'app-restaurant-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is here
  templateUrl: './restaurant-dashboard.html',
  styleUrls: ['./restaurant-dashboard.css']
})
export class RestaurantDashboards implements OnInit {
  authService = inject(AuthService);
  restaurantService = inject(RestaurantService);

  // Model to hold the data fetched from the API and the data entered in the form
  restaurantData: RestaurantDetails = {
    name: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...',
    address: null,
    pincode: null,
    fssaiId: null,
    tradeId: null
  };
  
  // Variables to hold uploaded files
  fssaiImage: File | null = null;
  tradeLicenseImage: File | null = null;

  ngOnInit(): void {
    // 🚨 In a real app, this would fetch data from the API
    // this.fetchRestaurantDetails(); 

    // Simulation for immediate testing (remove this when connecting to backend)
    setTimeout(() => {
        this.restaurantData = {
          name: 'The Great Bistro (Fetched)',
          email: 'resto@example.com',
          phone: '(999) 888-7777',
          address: '456 Oak St.', // Existing data will be pre-filled
          pincode: '90001',
          fssaiId: '10120230000XXX',
          tradeId: 'TL2023-XXXX'
        };
    }, 500);
  }

  fetchRestaurantDetails(): void {
    this.restaurantService.getRestaurantDetails().subscribe({
        next: (data) => {
            this.restaurantData = data;
        },
        error: (err) => {
            console.error('Error fetching restaurant details:', err);
            // Handle error (e.g., show message)
        }
    });
  }

  onSubmitDetails(): void {
    // 1. Create a FormData object to handle text fields and files
    const formData = new FormData();
    
    // Append all text fields
    Object.keys(this.restaurantData).forEach(key => {
        formData.append(key, (this.restaurantData as any)[key]);
    });

    // Append files
    if (this.fssaiImage) formData.append('fssaiImage', this.fssaiImage, this.fssaiImage.name);
    if (this.tradeLicenseImage) formData.append('tradeLicenseImage', this.tradeLicenseImage, this.tradeLicenseImage.name);

    // 2. Call the service to submit
    this.restaurantService.updateRestaurantDetails(formData).subscribe({
        next: () => {
            alert('Restaurant details updated successfully!');
        },
        error: (err) => {
            console.error('Error updating restaurant details:', err);
            alert('Failed to update details. Check console.');
        }
    });
  }
}