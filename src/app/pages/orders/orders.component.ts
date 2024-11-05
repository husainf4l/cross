// orders.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class OrdersComponent {
  constructor(private router: Router) { }

  orders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2024-11-05', status: 'Shipped', total: 120.99 },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2024-11-04', status: 'Pending', total: 75.49 },
    { id: 'ORD-003', customer: 'Ali Saleh', date: '2024-11-03', status: 'Delivered', total: 200.00 },
    { id: 'ORD-004', customer: 'Sara Kamel', date: '2024-11-02', status: 'Canceled', total: 50.25 },
  ];

  navigateToOrder(orderId: string) {
    this.router.navigate([`/order/edit/${orderId}`]);
  }
}
