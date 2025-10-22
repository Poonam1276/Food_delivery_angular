import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
 selector: 'app-search-bar',
 standalone:true,
 imports:[FormsModule,CommonModule],
 templateUrl: './search-bar.html',
 styleUrls: ['./search-bar.css']
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

  const hasOtherFilters = this.city || this.menuItem || this.restaurant || this.category;

  if (hasOtherFilters) {
    const searchData = {
      pinCode: this.pinCode,
      city: this.city,
      menuItem: this.menuItem,
      restaurant: this.restaurant,
      category: this.category
    };

    console.log('Search triggered with:', searchData);

    this.searchEvent.emit({
      type: 'filters',
      data: searchData
    });
  } else {
    console.log('Search triggered with only pinCode:', this.pinCode);

    this.searchEvent.emit({
      type: 'pincode',
      data: {
        pinCode: this.pinCode
      }
    });
  }
}
}
