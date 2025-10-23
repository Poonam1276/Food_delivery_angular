import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService, RestaurantIDDto, RestaurantOrderViewDto,UpdateOrderStatusDto} from '../../../services/restaurant.service';
import { MenuItemService, MenuItemViewDto } from '../../../services/menuitem.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule ],
  templateUrl: './restaurant-dashboard.html',
  styleUrls: ['./restaurant-dashboard.css']
})
export class RestaurantDashboard implements OnInit {
  selectedItem: string = '';
  menuItems = [
    { label: 'Profile', icon: 'bi bi-person' },
    { label: 'Manage Menu', icon: 'bi bi-list' },
    { label: 'View Orders', icon: 'bi bi-receipt' }
  
  ];

  form!: FormGroup;
  menuForm!: FormGroup;
  message = '';
  showAddModal = false;
  categories = ['Beverages', 'Main Course', 'Desserts', 'Snacks', 'Salads'];
  menuItemsList: MenuItemViewDto[] = [];
  selectedFile: File | null = null;
  editingItem: MenuItemViewDto | null = null;
  isEditMode = false;
  foodImage?: File;
ordersList: RestaurantOrderViewDto[] = [];
selectedOrder: RestaurantOrderViewDto | null = null;
 
filterStatus: string = '';
filterDate: string = '';
filterMonth: string = '';
filterItemName: string = '';

statusOptions: string[] = ['Order Placed', 'Preparing Order', 'Out for delivery', 'Delivered'];


months = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' }
];



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private menuItemService: MenuItemService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      restaurantId: [0],
      userId: [0],
      address: [''],
      fssaiId: [''],
      pinCode: [null],
      tradeId: [''],
      fssaiImage: [''],
      tradelicenseImage: ['']
    });

    this.menuForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      isAvailable: [true],
      category: ['']
    });

    this.loadProfile();
    this.loadOrders();
  }

    loadProfile(): void {
    this.restaurantService.getRestaurantProfile().subscribe({
      next: (data: RestaurantIDDto) => {
        this.form.patchValue({
          restaurantId: data.restaurantId,
          userId: data.userId,
          address: data.address,
          fssaiId: data.fssaiId,
          pinCode: data.pinCode,
          tradeId: data.tradeId,
          fssaiImage: data.fssaiImage,
          tradelicenseImage: data.tradelicenseImage
        });

        this.loadMenuItems();
      },
      error: () => {
        this.message = 'Failed to load profile.';
      }
    });
  }

  selectMenu(label: string): void {
    this.selectedItem = label;

    if (label === 'Logout') {
      localStorage.clear();
      this.router.navigate(['/login']);
    }

   
    }
  

  updateProfile(): void {
    const dto: RestaurantIDDto = this.form.value;

    this.restaurantService.updateRestaurant(dto).subscribe({
      next: () => {
        this.message = 'Profile updated successfully!';
      },
      error: () => {
        this.message = 'Update failed. Please try again.';
      }
    });
  }

  loadMenuItems(): void {
    const restaurantId = this.form.get('restaurantId')?.value;

    this.menuItemService.getItemsByRestaurant(restaurantId).subscribe({
      next: (response: any) => {
        this.menuItemsList = Array.isArray(response.$values) ? response.$values : [];
      },
      error: () => {
        this.menuItemsList = [];
      }
    });
  }

 
loadOrders(): void {
  this.restaurantService.getOrdersForRestaurant().subscribe({
    next: (response: any) => {
      const rawOrders = Array.isArray(response.$values) ? response.$values : [];

      // Transform orderedItems.$values into a plain array
      this.ordersList = rawOrders.map((order: any) => ({
        ...order,
        orderedItems: Array.isArray(order.orderedItems?.$values)
          ? order.orderedItems.$values
          : []
      }));
    },
    error: () => {
      console.error('Failed to load orders.');
    }
  });
}


openOrderDetails(order: RestaurantOrderViewDto): void {
  this.selectedOrder = order;
}

closeOrderDetails(): void {
  this.selectedOrder = null;
}



get filteredOrders(): RestaurantOrderViewDto[] {
  return this.ordersList.filter(order => {
    const orderDate = new Date(order.orderDateTime);

    const matchesStatus = this.filterStatus ? order.status === this.filterStatus : true;
    const matchesDate = this.filterDate ? orderDate.toISOString().split('T')[0] === this.filterDate : true;
    const matchesMonth = this.filterMonth ? (orderDate.getMonth() + 1).toString().padStart(2, '0') === this.filterMonth : true;
    const matchesItem = this.filterItemName
      ? order.orderedItems.some(item => item.itemName.toLowerCase().includes(this.filterItemName.toLowerCase()))
      : true;
      
return matchesStatus && matchesDate && matchesMonth && matchesItem;
  });
}


clearFilters(): void {
  this.filterStatus = '';
  this.filterDate = '';
  this.filterMonth = '';
  this.filterItemName = '';
}

get orderStats(): { totalOrders: number; totalQuantity: number } {
  let totalOrders = this.filteredOrders.length;
  let totalQuantity = 0;

  if (this.filterItemName) {
    this.filteredOrders.forEach(order => {
      order.orderedItems.forEach(item => {
        if (item.itemName.toLowerCase().includes(this.filterItemName.toLowerCase())) {
          totalQuantity += item.quantity;
        }
      });
    });
  }

  return { totalOrders, totalQuantity };
}



onStatusChange(order: RestaurantOrderViewDto, newStatus: string): void {
  if (newStatus === order.status) return;

  const dto: UpdateOrderStatusDto = {
    orderId: order.orderId,
    newStatus: newStatus
  };

  this.restaurantService.updateOrderStatus(dto).subscribe({
    next: () => {
      order.status = newStatus;
    },
    error: () => {
      alert('Failed to update status. Please try again.');
    }
  });
}

  resetModal(): void {
    this.showAddModal = false;
    this.menuForm.reset();
    this.selectedFile = null;
    this.editingItem = null;
    this.isEditMode = false;
  }

  openAddModal(): void {
    this.resetModal();
    this.showAddModal = true;
    this.isEditMode = false;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addMenuItem(): void {
    const formValue = this.menuForm.value;

    if (this.isEditMode && this.editingItem) {
      const dto = {
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        isAvailable: formValue.isAvailable,
        category: formValue.category
      };

      this.menuItemService.updateItem(this.editingItem.itemId, dto).subscribe({
        next: () => {
          this.resetModal();
          this.loadMenuItems();
        },
        error: () => {
          alert('Failed to update menu item.');
        }
      });
    } else {
      const dto = {
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        isAvailable: formValue.isAvailable,
        category: formValue.category,
        foodImage: this.selectedFile ?? undefined
      };

      this.menuItemService.addItem(dto).subscribe({
        next: () => {
          this.resetModal();
          this.loadMenuItems();
        },
        error: () => {
          alert('Failed to add menu item.');
        }
      });
    }
  }

  editItem(item: MenuItemViewDto): void {
    this.editingItem = item;
    this.isEditMode = true;
    this.showAddModal = true;

    this.menuForm.patchValue({
      name: item.name,
      description: item.description,
      price: item.price,
      isAvailable: item.isAvailable,
      category: item.category
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    alert('You have been logged out successfully.');
    this.router.navigate(['/login']);
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
}