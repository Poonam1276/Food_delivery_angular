import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';


 
@Component({
  selector: 'app-home',
  imports:[FormsModule, CommonModule, RouterModule, NavbarComponent],
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  pinCode!: string;

  constructor(private router: Router, private menuService: MenuService) {}

goToMenu() {
 if (!this.pinCode) {
   alert('Please enter PIN code');
   return;
 }
 this.menuService.getMenuItems(this.pinCode.trim()).subscribe({
   next: (res: any) => {
     console.log('Full API Response:', res);
     // Extract the actual list of menu items
     const menuData = res && res['$values'] ? res['$values'] : [];
     if (menuData.length > 0) {
       // valid PIN → navigate to menu page
       localStorage.setItem('pinCode', this.pinCode.trim());
       this.router.navigate(['/menu'], { queryParams: { pin: this.pinCode.trim() } });
     } else {
       alert('Incorrect PIN code or no restaurant found');
     }
   },
   error: (err) => {
     console.error('API Error:', err);
     alert('Error fetching menu items');
   }
 });
}
}