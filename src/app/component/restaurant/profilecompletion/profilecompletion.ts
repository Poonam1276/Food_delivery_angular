// src/app/component/restaurant/profilecompletion/profilecompletion.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // 👈 Added Router
import { RestaurantService } from '../../../services/restaurant.service'; // 👈 Switched to RestaurantService
 
@Component({
  selector: 'app-restaurant-profile-completion', // 👈 Updated selector
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './profilecompletion.html',
  styleUrl: './profilecompletion.css' // Assuming the CSS file is renamed or shared
})
export class ProfileCompletion { // Component name remains ProfileCompletion
  form: FormGroup;
  successMessage = '';
  errorMessage = '';
 
  constructor(
    private fb: FormBuilder, 
    private restaurantService: RestaurantService, // 👈 Switched to RestaurantService
    private router: Router // 👈 Injected Router
) {
    // Use the correct key used during signup

 const userId = Number(localStorage.getItem('currentUserId') || localStorage.getItem('userId') || '0');
    this.form = this.fb.group({
      userId: [userId], // Should be present from signup
      address: [''], 
      pinCode: [''], // Added basic validation
      fssaiId: [''], 
      tradeId: [''], 
      fssaiImage: [null], // Stores the File object
      tradelicenseImage: [null] // Stores the File object
    });
  }
 
  // 🚨 FIX: Corrected signature and logic for two file inputs
  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      // Update the specific form control with the File object
      this.form.get(controlName)?.setValue(file);
      // Mark as touched to show validation state
      this.form.get(controlName)?.updateValueAndValidity();
    }
  }
 
 submit(): void {
  if (this.form.invalid) {
    this.errorMessage = 'Please complete all required fields correctly.';
    return;
  }

  const formData = new FormData();
  const formValue = this.form.value;

  formData.append('UserId', formValue.userId.toString());
  formData.append('Address', formValue.address);
  formData.append('PinCode', Number(formValue.pinCode).toString());
  formData.append('FssaiId', formValue.fssaiId);
  formData.append('TradeId', formValue.tradeId);

  const fssaiFile = formValue.fssaiImage as File;
  const tradeFile = formValue.tradelicenseImage as File;

  if (fssaiFile) {
    formData.append('FssaiImage', fssaiFile, fssaiFile.name);
  }
  if (tradeFile) {
    formData.append('TradelicenseImage', tradeFile, tradeFile.name);
  }

  // ✅ Debug log
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  this.restaurantService.submitRestaurantDetails(formData).subscribe({
    next: () => {
      this.successMessage = 'Details submitted successfully! You can now log in.';
      this.errorMessage = '';
      localStorage.clear();
      this.router.navigate(['/login']);
    },
    error: (err: any) => {
      console.error('Submission error:', err);
      if (err.status === 400 && err.error?.errors) {
        const validationErrors = Object.values(err.error.errors).flat().join('; ');
        this.errorMessage = `Validation Failed: ${validationErrors}`;
      } else {
        this.errorMessage = 'Submission failed. Please check your data and try again.';
      }
      this.successMessage = '';
    }
  });
}
}