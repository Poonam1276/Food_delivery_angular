import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
 selector: 'app-search-bar',
 standalone:true,
 imports:[FormsModule,CommonModule],
 templateUrl: './search-bar.html',
})
export class SearchBarComponent {
@Input() pinCode: string ='';
@Input() city!: string;
@Input() menuItem!: string;
@Input() restaurant!: string;
@Input() category!: string;
 @Output() searchEvent = new EventEmitter<any>();
 onSearch() {
   if (!this.pinCode) {
     alert('Pin code is mandatory!');
     return;
   }
   this.searchEvent.emit({
     pinCode: this.pinCode,
     city: this.city,
     menuItem: this.menuItem,
     restaurant: this.restaurant,
     category: this.category
   });
 }
}
