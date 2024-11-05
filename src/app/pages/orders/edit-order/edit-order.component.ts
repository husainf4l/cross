import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent implements OnInit {
  orderId!: string;
  orderData: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!;
    this.fetchOrderData(this.orderId);
  }

  fetchOrderData(orderId: string) {
    const ordersMock = [
      { id: 'ORD-001', customer: 'John Doe', date: '2024-11-05', status: 'Shipped', total: 120.99 },
      { id: 'ORD-002', customer: 'Jane Smith', date: '2024-11-04', status: 'Pending', total: 75.49 },
      { id: 'ORD-003', customer: 'Ali Saleh', date: '2024-11-03', status: 'Delivered', total: 200.00 },
      { id: 'ORD-004', customer: 'Sara Kamel', date: '2024-11-02', status: 'Canceled', total: 50.25 },
    ];

    this.orderData = ordersMock.find(order => order.id === orderId);
  }

}
