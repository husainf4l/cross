import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { V2Service } from '../services/v2.service';
import { v2Transactions, v2UserRecord } from '../services/models/points.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-details-v2',
  templateUrl: './user-details-v2.component.html',
  styleUrls: ['./user-details-v2.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon]
})
export class UserDetailsV2Component implements OnInit {
  userId!: string; // Holds the user ID from the route
  user: v2UserRecord | undefined; // Holds the user details
  transactions: v2Transactions[] = [];
  filteredTransactions: v2Transactions[] = [];
  isLoading = true;


  constructor(private route: ActivatedRoute, private v2Service: V2Service) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchUserDetails();
    this.fetchUserTransaction();
  }

  fetchUserDetails(): void {
    this.isLoading = true;

    this.v2Service.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;

      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      },
    });
  }

  fetchUserTransaction(): void {
    this.isLoading = true;

    this.v2Service.getUserTransactions(this.userId).subscribe({

      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = data;
        this.isLoading = false;
        this.calculateBalances();

      },
      error: (err) => {
        console.error('Error fetching user transactions:', err); // Updated error message
      },
    });
  }

  filterTransactions(type: number | null) {
    if (type === null) {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter((t) => t.type === type);
    }
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

  calculateBalances() {
    let runningBalance = 0;

    // Reverse for calculation and then reverse back
    this.filteredTransactions = this.filteredTransactions
      .slice() // Create a shallow copy to avoid mutating the original array
      .reverse() // Reverse to start calculation from oldest to newest
      .map(transaction => {
        runningBalance += transaction.points;
        return { ...transaction, balance: runningBalance };
      })
      .reverse(); // Reverse back to maintain original order (newest first)
  }

  printPage(): void {
    window.print();
  }


}
