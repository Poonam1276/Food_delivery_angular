import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewOrders } from '../view-orders/view-orders';
import { DeliveryPolicy } from '../delivery-policy/delivery-policy';
import { AgentDetails } from '../agent-details/agent-details'; 

@Component({
  selector: 'app-delivery-agent-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AgentDetails,
    ViewOrders,
    DeliveryPolicy
  ],
  templateUrl: './delivery-agent-dashboard.html',
  styleUrls: ['./delivery-agent-dashboard.css']
})
export class DeliveryAgentDashboard {
  selectedSection: string = 'view-orders';
  agentName: string = 'Delivery Agent';

  constructor() {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.agentName = payload.name || this.agentName;
      } catch (error) {
        console.warn('Invalid token format');
      }
    }
  }

  setSection(section: string): void {
    this.selectedSection = section;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
}