import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!;
    this.fetchOrderData(this.orderId);
  }

  fetchOrderData(orderId: string) {
    // Sample mock data; in a real app, fetch from API
    this.orderData = {
      id: orderId,
      customer: 'John Doe',
      date: '2024-11-05',
      status: 'Shipped',
      shippingAddress: '123 Main St, Springfield, USA',
      products: [
        { name: 'Skinior Serum', quantity: 2, price: 29.99 },
        { name: 'Toppik Hair Fiber', quantity: 1, price: 24.99 },
      ],
      notes: 'Customer requested gift packaging.',
    };
  }

  calculateTotal(): number {
    return this.orderData.products.reduce((total: number, product: any) => {
      return total + product.price * product.quantity;
    }, 0);
  }

  saveChanges() {
    this.router.navigate([`/orders`]);

    console.log('Order saved:', this.orderData);

  }


}
