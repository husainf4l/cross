import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../services/models/interfaces.model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'] // Corrected 'styleUrls' here
})
export class EditOrderComponent implements OnInit {
  orderId!: string;
  orderData!: Order;

  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!;
    this.fetchOrderData(this.orderId);
  }

  fetchOrderData(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe(order => {
      this.orderData = order;
    });
  }



  saveChanges(): void {
    const orderEdit: any = { notes: this.orderData.notes, status: this.orderData.status }
    this.orderService.updateOrder(this.orderId, orderEdit).subscribe(() => {
      console.log('Order saved:', this.orderData);
      this.router.navigate(['/orders']);
    });
  }
}
