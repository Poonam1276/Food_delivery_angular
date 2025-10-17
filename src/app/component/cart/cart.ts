// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router} from '@angular/router';
// import { CartService, CartItem, CartGroup, CartResponse } from '../../services/cart.services';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.html',
//   styleUrls: ['./cart.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class CartComponent implements OnInit {
//   cartItems: {
//     restaurantId: number;
//     restaurantName: string;
//     totalAmount: number;
//     items: CartItem[];
//     expanded?: boolean;
//   }[] = [];

//   total: number = 0;
//   couponCode: string = 'AXP5Ty';
//   MYcartId :number = 0;
  

//   constructor(private cartService: CartService, private router :Router) {}

//   ngOnInit() {
//     this.loadCart();
//   }

//   loadCart() {
//     this.cartService.getCustomerCart().subscribe({
//       next: (response: CartResponse) => {
//         const carts = response?.$values || [];

//         this.cartItems = carts.map((cart: CartGroup) => ({
          

//           // ✅ Assign cartId from the first cart group (assuming one cart per customer)
//           if(!this.MYcartId){
//           this.MycartId  = cart.cartId;
//           }
//           return{
//           restaurantId: cart.restaurantId,
//           restaurantName: cart.restaurantName,
//           totalAmount: cart.totalAmount,
//           items: cart.items?.$values || [],
//           expanded: false
//         })).filter(cart => cart.items.length > 0);

//         this.calculateTotal();
//       },
//       error: err => {
//         console.error('Error fetching cart:', err);
//       }
//     });
//   }

//   calculateTotal() {
//     this.total = this.cartItems.reduce((sum, cart) => {
//       return sum + cart.items.reduce((subSum, item) => subSum + (item.price * item.quantity), 0);
//     }, 0);
//   }

//   toggleDropdown(cart: any) {
//     cart.expanded = !cart.expanded;
//   }

//   removeItem(cart: any, item: CartItem) {
//     this.cartService.removeItem(item.cartItemId).subscribe({
//       next: () => {
//         cart.items = cart.items.filter((i:any) => i.cartItemId !== item.cartItemId);
//         this.calculateTotal();
//       },
//       error: err => {
//         console.error('Failed to remove item:', err);
//         alert('Could not remove item from cart.');
//       }
//     });
//   }

//   increaseQuantity(item: CartItem) {
//     const newQuantity = item.quantity + 1;
//     this.cartService.updateQuantity(item.cartItemId, newQuantity).subscribe({
//       next: () => {
//         item.quantity = newQuantity;
//         this.calculateTotal();
//       },
//       error: err => {
//         console.error('Failed to increase quantity:', err);
//         alert('Could not update quantity.');
//       }
//     });
//   }

//   decreaseQuantity(item: CartItem) {
//     if (item.quantity > 1) {
//       const newQuantity = item.quantity - 1;
//       this.cartService.updateQuantity(item.cartItemId, newQuantity).subscribe({
//         next: () => {
//           item.quantity = newQuantity;
//           this.calculateTotal();
//         },
//         error: err => {
//           console.error('Failed to decrease quantity:', err);
//           alert('Could not update quantity.');
//         }
//       });
//     }
//   }

//   applyCoupon() {
//     alert(`Coupon "${this.couponCode}" applied successfully!`);
//     this.couponCode = '';
//   }

//   checkout() {
//     const cartId = this.cartId;
//     this.router.navigate(['/order'], { queryParams: { cartId } });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem, CartGroup, CartResponse } from '../../services/cart.services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  standalone: true,
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
  cartId: number = 0; // ✅ Added cartId

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCustomerCart().subscribe({
      next: (response: CartResponse) => {
        const carts = response?.$values || [];

        this.cartItems = carts.map((cart: CartGroup) => {
          // ✅ Assign cartId from the first cart group (assuming one cart per customer)
          if (!this.cartId) {
            this.cartId = cart.cartId;
          }

          return {
            cartId : cart.cartId,
            restaurantId: cart.restaurantId,
            restaurantName: cart.restaurantName,
            totalAmount: cart.totalAmount,
            items: cart.items?.$values || [],
            expanded: false
          };
        }).filter(cart => cart.items.length > 0);

        this.calculateTotal();
      },
      error: err => {
        console.error('Error fetching cart:', err);
      }
    });
  }

 calculateTotal() {
  this.total = 0;

  this.cartItems.forEach(cart => {
    cart.totalAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.total += cart.totalAmount;
  });
}
  toggleDropdown(cart: any) {
    cart.expanded = !cart.expanded;
  }

  removeItem(cart: any, item: CartItem) {
    this.cartService.removeItem(item.cartItemId).subscribe({
      next: () => {
        cart.items = cart.items.filter((i: any) => i.cartItemId !== item.cartItemId);
        this.calculateTotal();
      },
      error: err => {
        console.error('Failed to remove item:', err);
        alert('Could not remove item from cart.');
      }
    });
  }

  increaseQuantity(item: CartItem) {
    const newQuantity = item.quantity + 1;
    this.cartService.updateQuantity(item.cartItemId, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotal();
      },
      error: err => {
        console.error('Failed to increase quantity:', err);
        alert('Could not update quantity.');
      }
    });
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.cartService.updateQuantity(item.cartItemId, newQuantity).subscribe({
        next: () => {
          item.quantity = newQuantity;
          this.calculateTotal();
        },
        error: err => {
          console.error('Failed to decrease quantity:', err);
          alert('Could not update quantity.');
        }
      });
    }
  }

  applyCoupon() {
    alert(`Coupon "${this.couponCode}" applied successfully!`);
    this.couponCode = '';
  }

  checkout() {
    if (!this.cartId) {
      alert('Cart ID not found. Please try again.');
      return;
    }

    this.router.navigate(['/order'], { queryParams: { cartId: this.cartId } });
  }
}
