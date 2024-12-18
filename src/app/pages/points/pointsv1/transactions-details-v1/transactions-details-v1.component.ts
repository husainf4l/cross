import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { v1Transactions, v1UserRecord, wallet } from '../../services/models/pointsv1.model';
import { V1Service } from '../../services/v1.service';

@Component({
  selector: 'app-transactions-details-v1',
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-details-v1.component.html',
  styleUrl: './transactions-details-v1.component.css'
})
export class TransactionsDetailsv1Component implements OnInit {

  transactionId!: string;
  UserUid!: string;
  redemImage: string = 'https://firebasestorage.googleapis.com/v0/b/pointsv1.appspot.com/o/%D8%AD%D8%B1%D9%83%D8%A7%D8%AA%2Finvoices.jpg?alt=media&token=5e1c8d26-4603-4398-a504-2d4059c1b731'
  transaction: v1Transactions | undefined;
  updatedPoints: number | undefined;
  isLoading = false;
  margoSales: number = 0; // Initialize Margo Points
  papayaSales: number = 0; // Initialize Papaya Points
  lavaSales: number = 0; // Initialize Lava Points
  redemPoints: number = 0;
  notes: string = "";
  invRef: string = '';
  updateMessage: string = ''; // Message displayed after update
  user: v1UserRecord | undefined;
  constructor(private route: ActivatedRoute, private v1Service: V1Service, private router: Router, private location: Location) { }
  isEditingBracket = false; // Track editing state
  editedBracket: number | undefined;

  redeemWallet: wallet[] | undefined

  ngOnInit(): void {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId') || '';
    this.UserUid = this.route.snapshot.paramMap.get('UserUid') || '';

    this.fetchTransactionDetails();
  }



  fetchTransactionDetails(): void {
    this.isLoading = true;

    this.v1Service.getUserById(this.UserUid).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error("Error fetching user details:", err);
      },
    });


    this.v1Service.getTransactionById(this.transactionId, this.UserUid).subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.isLoading = false;
        if (transaction.adsUrl == this.redemImage) {
          this.v1Service.getUserWallet(this.UserUid).subscribe({
            next: (wallet) => {
              this.redeemWallet = wallet;
            }
          })
        }
      },
      error: (err) => {
        console.error("Error fetching transaction details:", err);
        this.isLoading = false;
      },
    });


  }




  startEditingBracket(): void {
    this.isEditingBracket = true;
    this.editedBracket = this.user?.bracket;
  }

  saveBracket(): void {
    if (this.editedBracket == null || this.editedBracket === this.user?.bracket) {
      this.isEditingBracket = false; // Exit editing mode if no changes
      return;
    }

    // Ensure the value is a number
    const updatedBracket = Number(this.editedBracket);

    if (isNaN(updatedBracket)) {
      alert('Invalid bracket value. Please enter a valid number.');
      return;
    }

    const data = {
      UserUid: this.user?.UserUid || '',
      bracket: updatedBracket,
    };

    this.v1Service.updateUserBracket(data).subscribe({
      next: () => {
        if (this.user) {
          this.user.bracket = updatedBracket; // Update local user data
        }
        this.isEditingBracket = false; // Exit editing mode
        console.log('Bracket updated successfully.');
      },
      error: (err) => {
        console.error('Error updating bracket:', err);
        alert('Failed to update bracket. Please try again.');
        this.isEditingBracket = false;
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
      UserUid: this.user?.UserUid || '',
      userName: this.user?.UserName || '',
      posName: this.user?.posName || '',
    };

    console.log('Updated Points:', data);

    this.isLoading = true;
    this.v1Service.updateUserPoints(this.transactionId, data).subscribe({
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
      UserUid: this.user?.UserUid || '',
      transactionId: this.transactionId || '',
      points: this.redemPoints || 0,
      currentPoints: this.user?.points || 0,
    };

    this.v1Service.redeemAdd(data).subscribe({
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