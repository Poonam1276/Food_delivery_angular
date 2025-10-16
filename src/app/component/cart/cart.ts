
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.services';

interface CartItem {
  itemId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  foodImage: string;
}

interface CartGroup {
  cartId: number;
  customerId: number;
  restaurantId: number;
  restaurantName: string;
  totalAmount: number;
  items: {
    $id: string;
    $values: CartItem[];
  };
}

interface CartResponse {
  $id: string;
  $values: CartGroup[];
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
 
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cartItems: {
    restaurantId: number;
    restaurantName: string;
    totalAmount: number;
    items: CartItem[];
    expanded?: boolean;
  }[] = [];

  total: number = 0;
  couponCode: string = 'AXP5Ty';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
  this.cartService.getCustomerCart().subscribe({
    next: (response:CartResponse) => {
      const carts = response?.$values || [];

      this.cartItems = carts.map((cart:any): typeof this.cartItems[number] => ({
        restaurantId: cart.restaurantId,
        restaurantName: cart.restaurantName,
        totalAmount: cart.totalAmount,
        items: cart.items?.$values || [],
        expanded: false
      })).filter((cart:any) => cart.items.length > 0);

      this.calculateTotal();
    },
    error: (err) => {
      console.error('Error fetching cart:', err);
    }
  });
}

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, cart) => {
      return sum + cart.items.reduce((subSum, item) => subSum + (item.price * item.quantity), 0);
    }, 0);
  }

  toggleDropdown(cart: any) {
    cart.expanded = !cart.expanded;
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.calculateTotal();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
    }
  }

  removeItem(cart: any, item: CartItem) {
    cart.items = cart.items.filter((i:any)=> i.itemId !== item.itemId);
    this.calculateTotal();
  }

  applyCoupon() {
    alert(`Coupon "${this.couponCode}" applied successfully!`);
    this.couponCode = '';
  }

  checkout() {
    alert('Proceeding to checkout...');
  }
}