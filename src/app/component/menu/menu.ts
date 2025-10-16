import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { SearchBarComponent } from '../search-bar/search-bar';
@Component({
 selector: 'app-menu',
 standalone:true,
 imports:[CommonModule,FormsModule,Navbar,SearchBarComponent],
 templateUrl: './menu.html',
})
export class MenuComponent implements OnInit {
 pinCode: string = '';
 menuItems: any[] = [];
 constructor(private route: ActivatedRoute, private menuService: MenuService) {}
 ngOnInit() {
   this.route.queryParams.subscribe(params => {
     this.pinCode = params['pin'] || '';
     if (this.pinCode) {
       this.fetchMenuItems(this.pinCode);
     }
   });
 }
 fetchMenuItems(pin: string) {
   this.menuService.getMenuItems(pin).subscribe({
     next: (res: any) => {
       this.menuItems = res['$values'] || [];
     },
     error: (err) => console.error(err),
   });
 }
 // This will run when SearchBar emits new search values
 onSearchUpdated(searchData: any) {
   console.log('SearchBar Data:', searchData);
   this.pinCode = searchData.pinCode;
   this.fetchMenuItems(this.pinCode);
 }
}