

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar';
import { SearchBarComponent } from '../search-bar/search-bar';
import { CartService } from '../../services/cart.services';
@Component({
 selector: 'app-menu',
 standalone: true,
 imports: [CommonModule, FormsModule, NavbarComponent, SearchBarComponent],
 templateUrl: './menu.html',
 styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {
 pinCode: string = '';
 menuItems: any[] = [];
 filteredItems: any[] = [];
toastMessage: string = '';
showToast: boolean = false;

 constructor(
   private route: ActivatedRoute,
   private menuService: MenuService,
   private cartService: CartService,
   private router: Router
 ) {}
 ngOnInit() {
   this.route.queryParams.subscribe(params => {
     this.pinCode = params['pin'];
     if (this.pinCode) this.fetchMenuItems(this.pinCode);
   });
 }
 fetchMenuItems(pin: string) {
   this.menuService.getMenuItems(pin).subscribe({
     next: (res: any) => {
       this.menuItems = res['$values'] || [];
       this.filteredItems = [...this.menuItems];
     },
     error: (err) => console.error(err),
   });
 }
addToCart(item: any) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Please log in to add items to cart.');
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url }
    });
    return;
  }

  this.cartService.addToCart(item).subscribe({
    next: (res: any) => {
      this.toastMessage = `${item.name} added to cart successfully!`;
      this.showToast = true;

      // ✅ Update cart count
      const currentCount = this.cartService.getCartCount();
      this.cartService.updateCartCount(currentCount + 1);

      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart.');
    }
  });
}
 // When search filter emits data
onSearchUpdated(searchData: any) {
  if (searchData.type === 'pincode') {
    this.pinCode = searchData.data.pinCode;
    this.fetchMenuItems(this.pinCode);
  } else if (searchData.type === 'filters') {
    const { pinCode, city, menuItem, restaurant, category } = searchData.data;

   
this.menuService.searchByFilters(pinCode, restaurant, menuItem, category, city).subscribe({
  next: (res: any) => {
    this.filteredItems = res['$values'] || [];
  },
  error: (err) => {
    console.error('Error fetching filtered items:', err);
  }
});
  }
}

getImageUrl(path: string): string {
  if (!path) return ''; // handle null or undefined

  // If it's already a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Otherwise, assume it's a relative path from your backend
  return 'https://localhost:7004' + path;
}

openImage(imageUrl: string): void {
  window.open(imageUrl, '_blank');
}

notifyMe(item: any) {
  alert(`${item.name} is currently unavailable. We will notify you once it's back in stock.`);
}


}