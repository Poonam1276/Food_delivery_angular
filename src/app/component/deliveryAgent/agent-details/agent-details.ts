import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeliveryAgentService } from '../../../services/delivery-agent.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './agent-details.html',
  styleUrl: './agent-details.css'
})
export class AgentDetails {
  @Input() isUpdateMode: boolean = false;
  form: FormGroup;
  successMessage = '';
  errorMessage = '';
  showLoginPrompt = false;

  constructor(private fb: FormBuilder, private deliveryAgentService: DeliveryAgentService) {
    const userId = localStorage.getItem('userId') || '';

    this.form = this.fb.group({
      userId: [userId],
      address: [''],
      document: [null]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.form.patchValue({ document: file });
    }
  }

  submitOrUpdate(): void {
    const formData = new FormData();
    formData.append('UserId', this.form.get('userId')?.value);
    formData.append('Address', this.form.get('address')?.value);
    formData.append('DocumentUrl', this.form.get('document')?.value);

    const request = this.isUpdateMode
      ? this.deliveryAgentService.updateAgentProfile(formData)
      : this.deliveryAgentService.submitAgentDetails(formData);

    request.subscribe({
      next: () => {
        if (this.isUpdateMode) {
          this.successMessage = 'Details updated successfully!';
          this.showLoginPrompt = false;
        } else {
          this.successMessage = 'Details submitted successfully!';
          this.showLoginPrompt = true;
        }
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = this.isUpdateMode
          ? 'Update failed. Please try again.'
          : 'Submission failed. Please try again.';
        this.successMessage = '';
        this.showLoginPrompt = false;
      }
    });
  }
}