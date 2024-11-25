// orders.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order } from '../../services/models/interfaces.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]> | undefined;

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders(): void {
    this.orders$ = this.orderService.getOrders();
  }

  navigateToOrder(orderId: string) {
    this.router.navigate([`/order/edit/${orderId}`]);
  }
}
