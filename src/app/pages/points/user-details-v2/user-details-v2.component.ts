import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { V2Service } from '../services/v2.service';
import { v2Transactions, v2UserRecord } from '../services/models/points.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Token } from '@angular/compiler';

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


  constructor(private route: ActivatedRoute, private v2Service: V2Service) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchUserDetails();
    this.fetchUserTransaction();
  }

  fetchUserDetails(): void {
    this.v2Service.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      },
    });
  }

  fetchUserTransaction(): void {
    this.v2Service.getUserTransactions(this.userId).subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = data;
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

  sendMessage() {
    const token = this.user?.fCMToken || "";
    const title = 'Download the new Update';
    const message = 'okay';

    this.v2Service.sendNotification(token, title, message).subscribe({
      next: (response) => {
        console.log('Notification sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending notification:', error);
      },
    });
  }
}
