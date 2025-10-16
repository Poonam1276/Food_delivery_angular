import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeliveryAgentService } from '../../../services/delivery-agent.service';  
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './agent-details.html',
  styleUrl: './agent-details.css'
})
export class AgentDetails {
  form: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private deliveryAgentService: DeliveryAgentService) {
    const userId = localStorage.getItem('userId') || '';
    this.form = this.fb.group({
      userId: [userId],
      address: [''],
      document: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ document: file });
  }

  submit() {
    const formData = new FormData();
    formData.append('UserId', this.form.get('userId')?.value);
    formData.append('Address', this.form.get('address')?.value);
    formData.append('DocumentUrl', this.form.get('document')?.value);

    this.deliveryAgentService.submitAgentDetails(formData).subscribe({
      next: () => this.successMessage = 'Details submitted successfully!',
      error: () => this.errorMessage = 'Submission failed. Please try again.'
    });
  }
}