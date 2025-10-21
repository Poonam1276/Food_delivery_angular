import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant.service';
import { MenuItemService, MenuItemViewDto } from '../../../services/menuitem.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './restaurant-dashboard.html',
  styleUrls: ['./restaurant-dashboard.css']
})
export class RestaurantDashboard implements OnInit {
  selectedItem = 'Welcome';
  menuItems = [
    { label: 'Welcome', icon: 'bi bi-house' },
    { label: 'Profile', icon: 'bi bi-person' },
    { label: 'Manage Menu', icon: 'bi bi-list' },
    { label: 'Logout', icon: 'bi bi-box-arrow-right' }
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

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private menuItemService: MenuItemService
  ) {}

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    if (!userIdString || isNaN(Number(userIdString))) {
      this.message = 'User ID not found. Please login again.';
      return;
    }

    const userId = Number(userIdString);

    this.form = this.fb.group({
      restaurantId: [0],
      userId: [userId],
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

    this.restaurantService.getRestaurantByUserId(userId).subscribe({
      next: (data) => {
        this.form.patchValue({
          restaurantId: data.restaurantId,
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
    if (label === 'Logout') {
      localStorage.clear();
      window.location.href = '/login';
    } else {
      this.selectedItem = label;
    }
  }

updateProfile(): void {
  const restaurantId = this.form.get('restaurantId')?.value;

  if (!restaurantId || restaurantId === 0) {
    this.message = 'Invalid restaurant ID. Cannot update profile.';
    return;
  }

  const dto = {
    restaurantId: restaurantId,
    userId: this.form.get('userId')?.value,
    address: this.form.get('address')?.value,
    fssaiId: this.form.get('fssaiId')?.value,
    pinCode: this.form.get('pinCode')?.value,
    tradeId: this.form.get('tradeId')?.value,
    fssaiImage: this.form.get('fssaiImage')?.value,
    tradelicenseImage: this.form.get('tradelicenseImage')?.value
  };

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
        console.log("Loaded menu items:", this.menuItemsList);
      },
      error: () => {
        console.error("Failed to load menu items.");
        this.menuItemsList = [];
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

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.menuItemService.deleteItem(id).subscribe(() => {
        this.loadMenuItems();
      });
    }
  }
}
