import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { v2Transactions } from '../services/models/points.model';
import { V2Service } from '../services/v2.service';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transactions-v2',
  imports: [CommonModule, RouterLink, MatIcon],
  standalone: true,
  templateUrl: './transactions-v2.component.html',
  styleUrl: './transactions-v2.component.css'
})
export class TransactionsV2Component implements OnInit {
  Math = Math;

  transactions: v2Transactions[] = [];
  filteredTransactions: v2Transactions[] = [];
  isLoading = true;


  constructor(private v2Service: V2Service) { }


  ngOnInit(): void {
    this.fetchTransaction();

  }

  filterTransactions(type: number | null) {
    if (type === null) {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter((t) => t.type === type);
    }
  }



  fetchTransaction(): void {
    this.isLoading = true;

    this.v2Service.getTransactions().subscribe({

      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = data;
        this.isLoading = false;

      },
      error: (err) => {
        console.error('Error fetching user transactions:', err); // Updated error message
      },
    });
  }

  private calculateTotalPoints(type: number): number {
    return this.transactions
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + (t.points || 0), 0);
  }

  // Reusable method to calculate the length of transactions for a specific type
  private calculateLength(type: number): number {
    return this.transactions.filter((t) => t.type === type).length;
  }

  // Total points for sales (type 1)
  get totalSalesPoints(): number {
    return this.calculateTotalPoints(1);
  }

  // Length of sales transactions (type 1)
  get salesTransactionsCount(): number {
    return this.calculateLength(1);
  }

  // Total points for redeem (type 2)
  get totalRedeemPoints(): number {
    return this.calculateTotalPoints(2);
  }

  // Length of redeem transactions (type 2)
  get redeemTransactionsCount(): number {
    return this.calculateLength(2);
  }


}
