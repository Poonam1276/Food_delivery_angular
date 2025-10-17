 import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.services';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
 selector: 'app-navbar',
 standalone: true,
 imports: [CommonModule , RouterModule],
 templateUrl: './navbar.html',
 styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
 cartCount = 0;
 
 isLoggedIn = false; // for demo, later link with actual auth

constructor(private cartService: CartService, private authService: AuthService) {}

ngOnInit() {
  this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });

  this.authService.isLoggedIn$.subscribe(status => {
    this.isLoggedIn = status;
  });
}
 logout() {
   localStorage.removeItem('authToken');
   window.location.reload();
 }
} 