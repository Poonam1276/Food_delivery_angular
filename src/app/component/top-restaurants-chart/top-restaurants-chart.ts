

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService, TopRestaurant } from '../../services/admin';;
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
Chart.register(...registerables);
 
@Component({
  selector: 'app-top-restaurants-chart',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './top-restaurants-chart.html',
  styleUrl: './top-restaurants-chart.css'
})
export class TopRestaurantsChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart | null;
  topRestaurants: TopRestaurant[] = [];
  loading = false;
  showEarnings = false; // toggle to show earnings dataset instead
  chartType: 'bar' | 'pie' = 'bar';
  private sub: Subscription | null = null;
 
  constructor(private topService: AdminService) {
    this.chart = null;
  }
 
  ngOnInit(): void {
    this.loadTopRestaurants();
  }
 
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
 
  // loadTopRestaurants(topCount: number = 5) {
  //   this.loading = true;
  //   this.sub = this.topService.getTopRestaurants(topCount).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.topRestaurants = data;
  //       this.renderChart();
  //       this.loading = false;

  //     },
  //     error: (err) => {
  //       console.error('Error fetching top restaurants:', err);
  //       this.loading = false;
  //     }
  //   });
  // }
  loadTopRestaurants(topCount: number = 5) {
  this.loading = true;
  this.sub = this.topService.getTopRestaurants(topCount).subscribe({
    next: (data: any) => {
      console.log('Raw API response:', data);
      this.topRestaurants = data.$values ?? []; // safely extract array
      setTimeout(() => this.renderChart(), 0);  // ensure canvas is ready
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching top restaurants:', err);
      this.loading = false;
    }
  });
}
 
  toggleChartType() {
    this.chartType = this.chartType === 'bar' ? 'pie' : 'bar';
    this.renderChart();
  }
 
  toggleDataset() {
    this.showEarnings = !this.showEarnings;
    this.renderChart();
  }
 
  private renderChart() {
    if (!this.chartCanvas) return;
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
 
    // destroy existing
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
 
    const labels = this.topRestaurants.map(r => r.name);
    const data = this.showEarnings
      ? this.topRestaurants.map(r => r.totalEarnings)
      : this.topRestaurants.map(r => r.orderCount);
 
    const labelTitle = this.showEarnings ? 'Total Earnings (₹)' : 'Order Count';
 
    const dataset = {
      label: labelTitle,
      data,
      backgroundColor: [
        '#FC8019', '#FFB74D', '#FFD180', '#FF8A65', '#FF7043', '#FFCC80', '#FFE0B2'
      ],
      borderColor: '#ffffff',
      borderWidth: 1
    };
 
    const config: any = {
      type: this.chartType,
      data: { labels, datasets: [dataset] },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12 } },
          title: {
            display: true,
            text: 'Top Restaurants',
            color: '#FC8019',
            font: { size: 16, weight: '600' }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const val = context.raw;
                if (this.showEarnings) return `₹ ${val}`;
                return `${val} orders`;
              }
            }
          }
        },
        scales: this.chartType === 'bar' ? { y: { beginAtZero: true } } : {}
      }
    };
 
    this.chart = new Chart(ctx, config);
  }
}
 