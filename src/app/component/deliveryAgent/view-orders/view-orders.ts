import { Component, OnInit } from '@angular/core';
import { DeliveryAgentService } from '../../../services/delivery-agent.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-orders.html',
  styleUrls: ['./view-orders.css']
})
export class ViewOrders implements OnInit {
  ordersYetToDeliver: any[] = [];
  deliveredOrders: any[] = [];
  activeSection: 'pending' | 'delivered' = 'pending'; // default section

  constructor(private deliveryService: DeliveryAgentService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.deliveryService.getOrdersForAgent().subscribe({
      next: (data) => {
        this.ordersYetToDeliver = data.filter(order => order.status !== 'Delivered');
        this.deliveredOrders = data.filter(order => order.status === 'Delivered');
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  }

  markDelivered(orderId: number): void {
    this.deliveryService.markOrderAsDelivered(orderId).subscribe({
      next: () => {
        alert(`Order #${orderId} marked as delivered.`);
        this.loadOrders(); 
        this.activeSection = 'delivered'; 
      },
      error: (err) => {
        console.error('Failed to mark order as delivered:', err);
        alert('Failed to update order status.');
      }
    });
  }
}