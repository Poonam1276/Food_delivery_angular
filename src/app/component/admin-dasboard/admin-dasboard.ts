
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, Restaurant, DeliveryAgent } from '../../services/admin';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dasboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dasboard.html',
  styleUrls: ['./admin-dasboard.css']
})
export class AdminDasboard implements OnInit {
  selectedItem: string = '';

  menuItems = [
    { label: 'Verify Restaurant', icon: 'bi bi-check2-square' },
    { label: 'Verify Delivery Agent', icon: 'bi bi-person-check' },
    { label: 'See Delivery Agents', icon: 'bi bi-person-gear' },
    { label: 'See All Restaurants', icon: 'bi bi-shop' },
    { label: 'See Graph', icon: 'bi bi-bar-chart' },
    
  ];

  unverifiedRestaurants: Restaurant[] = [];
  unverifiedAgents: DeliveryAgent[] = [];
  loading: boolean = false;

  constructor(private router: Router,private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUnverifiedRestaurants();
    this.loadUnverifiedAgents();
    this.loadAllRestaurants();
  }

  selectMenu(label: string): void {
  this.selectedItem = label;
  if (label === 'Verify Restaurant') {
    this.loadUnverifiedRestaurants();
  } else if (label === 'Verify Delivery Agent') {
    this.loadUnverifiedAgents();
  }
  else if(label === 'See All Restaurants'){
    this.loadAllRestaurants();
  }
}

loadUnverifiedRestaurants(): void {
  this.loading = true;
  this.adminService.getUnverifiedRestaurants().subscribe({
    next: (data: any) => {
      console.log('Raw restaurant data:', data);
      // this.unverifiedRestaurants = data.$values || [];
      this.unverifiedRestaurants = (data.$values || []).map((restaurant: any) => ({
  ...restaurant,
  submittedRestaurants: restaurant.submittedRestaurants?.$values || []
}));
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading restaurants:', err);
      this.loading = false;
    }
  });
}

loadUnverifiedAgents(): void {
  this.loading = true;
  this.adminService.getUnverifiedAgents().subscribe({
    next: (data: any) => {
      console.log('Raw agent data:', data);

      // Extract $values safely
      if (data && Array.isArray(data['$values'])) {
        this.unverifiedAgents = data['$values'];
      } else {
        console.error('Expected $values to be an array, but got:', data['$values']);
        this.unverifiedAgents = [];
      }

      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading agents:', err);
      this.loading = false;
    }
  });
}
openImage(imageUrl: string): void {
  window.open(imageUrl, '_blank');
}


  verifyRestaurant(userId: number): void {
    this.adminService.verifyUser(userId, 'Restaurant').subscribe({
      next: () => {
        alert(`Restaurant with ID ${userId} verified.`);
        this.loadUnverifiedRestaurants();
      },
      error: (err) => {
        console.error('Verification failed:', err);
        alert('Verification failed.');
      }
    });
  }

  verifyAgent(userId: number): void {
    this.adminService.verifyUser(userId, 'DeliveryAgent').subscribe({
      next: () => {
        console.log(userId);
        alert(`Delivery Agent with ID ${userId} verified.`);
        this.loadUnverifiedAgents();
      },
      error: (err) => {
        console.error('Verification failed:', err);
        alert('Verification failed.');
      }
    });
  }
  loadAllRestaurants():void{
    this.loading = true;
    this.adminService.getAllrestaurant().subscribe({
      next: (data: any) => {
      console.log('Raw restaurant data:', data);
      // this.unverifiedRestaurants = data.$values || [];
      this.unverifiedRestaurants = (data.$values || []).map((restaurant: any) => ({
  ...restaurant,
  submittedRestaurants: restaurant.submittedRestaurants?.$values || [],
}));
this.unverifiedRestaurants.sort((a: any, b: any) => {
        // Assuming each restaurant has at least one submittedRestaurant
        const aCount = a.submittedRestaurants?.[0]?.orderCount || 0;
        const bCount = b.submittedRestaurants?.[0]?.orderCount || 0;
        return bCount - aCount; // ascending order (lowest first)
      });
      this.loading = false;
    },
    error: (err:any) => {
      console.error('Error loading restaurants:', err);
      this.loading = false;
    }
    })
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


  
  logout() {
   localStorage.removeItem('authToken');
   alert('You have been logged out successfully.');
   this.router.navigate(['/login']);
 }
}