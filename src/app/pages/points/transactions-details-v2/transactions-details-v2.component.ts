import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { v2Transactions, v2UserRecord } from '../services/models/points.model';
import { ActivatedRoute, Router } from '@angular/router';
import { V2Service } from '../services/v2.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-details-v2',
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-details-v2.component.html',
  styleUrl: './transactions-details-v2.component.css'
})
export class TransactionsDetailsV2Component implements OnInit {

  transactionId!: string;
  transaction: v2Transactions | undefined;
  updatedPoints: number | undefined;
  isLoading = true;
  margoSales: number = 0; // Initialize Margo Points
  papayaSales: number = 0; // Initialize Papaya Points
  lavaSales: number = 0; // Initialize Lava Points
  redemPoints: number = 0;
  notes: string = "";
  invRef: string = '';
  updateMessage: string = ''; // Message displayed after update
  user: v2UserRecord | undefined;
  constructor(private route: ActivatedRoute, private v2Service: V2Service, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.transactionId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchTransactionDetails();
  }


  fetchTransactionDetails(): void {
    this.isLoading = true;

    // Fetch transaction details
    this.v2Service.getTransactionById(this.transactionId).subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.isLoading = false;

        // Fetch user details if transaction is valid
        if (transaction?.UserUid) {
          this.v2Service.getUserById(transaction.UserUid).subscribe({
            next: (user) => {
              this.user = user;
            },
            error: (err) => {
              console.error("Error fetching user details:", err);
            },
          });
        }

        // Fetch company transaction details if transaction is checked
        if (transaction?.isChecked) {
          this.fetchCompanyTransactionDetails();
        }
      },
      error: (err) => {
        console.error("Error fetching transaction details:", err);
        this.isLoading = false;
      },
    });
  }
  fetchCompanyTransactionDetails(): void {
    this.v2Service.getCompanyTransactionById(this.transactionId).subscribe({
      next: (data: any) => {
        if (!data || data === "No data") {
          console.log("No data available for this transaction.");
          return;
        }

        // Populate sales data
        console.log(data);
        this.margoSales = data.data.margoSales;
        this.lavaSales = data.data.lavaSales;
        this.papayaSales = data.data.papayaSales;
        this.invRef = data.data.invRef;
      },
      error: (err) => {
        console.error("Error fetching company transaction details:", err);
      },
    });
  }


  updatePoints(): void {
    const data = {
      margoSales: Number(this.margoSales || 0),
      papayaSales: Number(this.papayaSales || 0),
      lavaSales: Number(this.lavaSales || 0),
      totalSales: Number(this.margoSales) + Number(this.papayaSales) + Number(this.lavaSales),
      currentPoints: Number(this.user?.points || 0),
      bracket: Number(this.user?.bracket || 0.08),
      invRef: this.invRef?.toString() || '',
      UserUid: this.transaction?.UserUid || '',
      userName: this.user?.UserName || '',
      posName: this.user?.posName || '',
      fcmToken: this.user?.fCMToken || '',
    };

    console.log('Updated Points:', data);

    this.isLoading = true;
    this.v2Service.updateUserPoints(this.transactionId, data).subscribe({
      next: () => {
        this.updateMessage = `Points successfully updated! Total Sales: ${data.totalSales}`;
        console.log('Points updated successfully on the server.');
        this.location.back();
      },
      error: (err) => {
        console.error('Error updating points on the server:', err);
        this.updateMessage = 'Error updating points on the server';
        this.isLoading = false;
      },
    });
  }

  rejectTransaction(): void {
    // Handle rejection logic here
    console.log('Transaction rejected:', this.notes);

    this.updateMessage = `Transaction rejected with reason: ${this.notes}`;

    this.location.back();

  }

  redeem() {
    const data = {
      UserUid: this.transaction?.UserUid || '',
      fcmToken: this.user?.fCMToken || '',
      transactionId: this.transactionId || '',
      points: this.redemPoints || 0,
      currentPoints: this.user?.points || 0,
    };

    this.v2Service.redeemAdd(data).subscribe({
      next: (response) => {
        console.log('Redeem successful:', response);
        this.location.back();
      },
      error: (err) => {
        console.error('Error during redeem:', err);
        alert('Failed to redeem points. Please try again later.');
      },
    });
  }


  rejectRedem() {
    throw new Error('Method not implemented.');
  }


}