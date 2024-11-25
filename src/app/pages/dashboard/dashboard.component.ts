import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatListModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  salesSummary = {
    skinior: { revenue: 120000, orders: 250, products: 80 },
    toppik: { revenue: 95000, orders: 200, products: 60 },
  };
  pointsSummary = {
    totalPoints: 500000,
    activeUsers: 1000,
    recentRedemptions: 40,
  };

  // Demo Data for Top Products
  topProducts = [
    { name: 'Skinior Serum', category: 'Skin Care', sales: 120 },
    { name: 'Toppik Hair Fibers', category: 'Hair Care', sales: 95 },
    { name: 'Skinior Face Wash', category: 'Skin Care', sales: 80 },
    { name: 'Toppik Shampoo', category: 'Hair Care', sales: 70 },
  ];

  // Demo Data for Top Users
  topUsers = [
    { name: 'John Doe', points: 15000, redemptions: 8 },
    { name: 'Jane Smith', points: 13000, redemptions: 6 },
    { name: 'Ali Saleh', points: 10000, redemptions: 5 },
  ];

  // Demo Data for Recent Activities
  activities = [
    { user: 'John Doe', action: 'Purchased Skinior Serum', date: '2024-11-06' },
    { user: 'Jane Smith', action: 'Redeemed 1000 Points', date: '2024-11-05' },
    { user: 'Ali Saleh', action: 'Purchased Toppik Shampoo', date: '2024-11-04' },
    { user: 'Sara Kamel', action: 'Earned 500 Points', date: '2024-11-03' },
  ];

}
