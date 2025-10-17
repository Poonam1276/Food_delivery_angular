import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports:[CommonModule,FormsModule],
  templateUrl: './order.html'
})
export class OrderComponent implements OnInit {
  cartId: number = 0;
  orderId: number | null = null;
  addressId: number = 0;
  bill: any = null;
  step: number = 1;
  addresses: any[] = [];
  
newAddress: any = {
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: null,
    isDefault: false
  };


  constructor(private route: ActivatedRoute, private orderService: OrderService) {}



ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {
    this.cartId = Number(params.get('cartId'));
    if (this.cartId) {
      this.createOrder();
    } else {
      console.error('No cartId found in query params');
    }
  });
}

  createOrder() {
  const dto = { cartId: this.cartId };
  console.log(dto);
  this.orderService.createOrderFromCart(dto).subscribe({
    next: (res: any) => {
      this.orderId = res.orderId;
      this.getAddresses(); // ✅ Fetch addresses after order is created
      this.step = 2;
    },
    error: (err: any) => console.error('Error creating order:', err)
  });
}

getAddresses() {
  this.orderService.getMyAddresses().subscribe({
    next: (res: any) => {
      console.log('Raw address response:', res);
      this.addresses = res?.['$values'] || []; // ✅ Use bracket notation to safely access $values
    },
    error: (err) => {
      console.error('Error fetching addresses:', err);
      alert(err.error?.message || 'Failed to load addresses');
    }
  });
}

addAddress() {
    this.orderService.addAddress(this.newAddress).subscribe({
      next: (res: any) => {
        alert('Address added successfully!');
        this.getAddresses(); // Refresh list
        this.newAddress = {}; // Reset form
      },
      error: (err) => {
        console.error('Error adding address:', err);
        alert(err.error?.message || 'Failed to add address');
      }
    });
  }

  assignAddress() {
    if (!this.orderId || !this.addressId) return;

    const dto = {
      orderId: this.orderId,
      addressId: this.addressId
    };

    this.orderService.assignAddress(dto).subscribe({
      next: () => {
        this.assignAgent();
      },
      error: (err:any) => console.error('Error assigning address:', err)
    });
  }

  assignAgent() {
    if (!this.orderId) return;

    this.orderService.assignAgent(this.orderId).subscribe({
      next: () => {
        this.getBill();
      },
      error: (err:any) => console.error('Error assigning agent:', err)
    });
  }

  getBill() {
  if (!this.orderId) return;

  this.orderService.getBill(this.orderId).subscribe({
    next: (res: any) => {
      console.log('Bill response:', res);
      this.bill = res;
      this.bill.items = res.items?.$values || []; // ✅ Extract the array for *ngFor
      this.step = 3;
    },
    error: (err) => {
      console.error('Error fetching bill:', err);
      alert(err.error?.message || 'Failed to fetch bill');
    }
  });
}
}