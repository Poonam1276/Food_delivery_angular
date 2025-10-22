import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class OrderComponent implements OnInit {
  cartId: number = 0;
  orderId: number | null = null;
  addressId: number = 0;
  bill: any = null;
  step: number = 1;
  addresses: any[] = [];
  showAddAddressForm: boolean = false;
  orderPlaced: boolean = false;

  newAddress: any = {
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: null,
    isDefault: false
  };
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }
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


  toggleAddAddressForm() {
    this.showAddAddressForm = !this.showAddAddressForm;
  }

  confirmOrder() {
    // You can call an API to finalize the order here if needed
    this.orderPlaced = true;
  }
  addAddress() {
    if (
      !this.newAddress.addressLine1 ||
      !this.newAddress.city ||
      !this.newAddress.state ||
      !this.newAddress.pinCode
    ) {
      alert('Please fill all required fields');
      return;
    }

    const payload = {
      addressLine1: this.newAddress.addressLine1,
      addressLine2: this.newAddress.addressLine2,
      landmark: this.newAddress.landmark,
      city: this.newAddress.city,
      state: this.newAddress.state,
      pinCode: this.newAddress.pinCode,
      isDefault: this.newAddress.isDefault || false
    };

    this.orderService.addAddress(payload).subscribe({
      next: (res: any) => {
        alert('Address added successfully!');
        this.addresses.push(res); // or refresh address list from backend
        this.showAddAddressForm = false;
        this.getAddresses();
        this.newAddress = {
          addressLine1: '',
          addressLine2: '',
          landmark: '',
          city: '',
          state: '',
          pinCode: null,
          isDefault: true
        };
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
      error: (err: any) => console.error('Error assigning address:', err)
    });
  }

  assignAgent() {
    if (!this.orderId) return;

    this.orderService.assignAgent(this.orderId).subscribe({
      next: () => {
        this.getBill();
      },
      error: (err: any) => console.error('Error assigning agent:', err)
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