// src/app/features/onboarding/profile-completion/profile-completion.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-profile-completion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profilecompletion.html',
  styleUrls: ['./profilecompletion.css']
})
export class ProfileCompletion implements OnInit {
  private restaurantService = inject(RestaurantService);
  private router = inject(Router);

  // Model to capture the new details
  completionData = {
    address: '',
    pincode: '',
    fssaiId: '',
    tradeId: '',
    description: ''
  };

  fssaiImage: File | null = null;
  tradeLicenseImage: File | null = null;
  loading: boolean = false;

  ngOnInit(): void {
    // Optional: Fetch existing incomplete data if needed
  }

  onFileChange(event: any, field: 'fssai' | 'trade'): void {
    const file = event.target.files[0];
    if (file) {
      if (field === 'fssai') {
        this.fssaiImage = file;
      } else {
        this.tradeLicenseImage = file;
      }
    }
  }

  onSubmitDetails(): void {
    this.loading = true;
    
    // 1. Create FormData object
    const formData = new FormData();
    
    // Append text fields
    Object.keys(this.completionData).forEach(key => {
        formData.append(key, (this.completionData as any)[key]);
    });

    // Append files
    if (this.fssaiImage) formData.append('fssaiImage', this.fssaiImage, this.fssaiImage.name);
    if (this.tradeLicenseImage) formData.append('tradeLicenseImage', this.tradeLicenseImage, this.tradeLicenseImage.name);

    // 2. Call the service to submit
    this.restaurantService.updateRestaurantDetails(formData).subscribe({
        next: () => {
            this.loading = false;
            alert('Profile details completed successfully! Redirecting to dashboard.');
            // Redirect to the main dashboard after successful submission
            this.router.navigate(['/dashboard/restaurant']); 
        },
        error: (err) => {
            this.loading = false;
            console.error('Error submitting details:', err);
            alert('Failed to submit details. Please try again.');
        }
    });
  }
}