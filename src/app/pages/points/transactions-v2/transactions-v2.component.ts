import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { v2Transactions } from '../services/models/points.model';
import { V2Service } from '../services/v2.service';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-v2',
  imports: [CommonModule, RouterLink, MatIcon, FormsModule],
  templateUrl: './transactions-v2.component.html',
  styleUrl: './transactions-v2.component.css',
})
export class TransactionsV2Component implements OnInit {
  Math = Math;
  limit: number = 20;
  transactions: v2Transactions[] = [];
  filteredTransactions: v2Transactions[] = [];
  isLoading: boolean = true;
  showingUnchecked: boolean = false;

  constructor(private v2Service: V2Service) { }

  ngOnInit(): void {
    this.fetchTransaction();
  }

  fetchTransaction(): void {
    this.isLoading = true;

    this.v2Service.getTransactions(this.limit, this.showingUnchecked).subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = [...data];
        this.isLoading = false;

        console.log('Fetched transactions successfully:', data.length);
      },
      error: (err) => {
        this.isLoading = false;

        console.error('Error fetching transactions:', err);
        alert('Failed to fetch transactions. Please try again later.');
      },
    });
  }


  setLimit(value: number): void {
    this.limit = value;
    this.fetchTransaction();
  }

  filterTransactions(type: number | null): void {
    this.filteredTransactions = type === null
      ? [...this.transactions]
      : this.transactions.filter((t) => t.type === type);
  }


  toggleUnchecked(): void {
    this.fetchTransaction();

  }


}