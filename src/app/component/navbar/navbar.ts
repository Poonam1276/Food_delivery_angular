import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
 cartCount = 2; // example dynamic count, can be fetched from cart service
 constructor(private router: Router) {}
}
