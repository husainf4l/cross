import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { v1Transactions, v1UserRecord } from '../../services/models/pointsv1.model';
import { V1Service } from '../../services/v1.service';

@Component({
  selector: 'app-user-details-v1',
  templateUrl: './user-details-v1.component.html',
  styleUrls: ['./user-details-v1.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon,]
})
export class UserDetailsv1Component implements OnInit {
  userId!: string; // Holds the user ID from the route
  user: v1UserRecord | undefined; // Holds the user details
  transactions: v1Transactions[] = [];
  filteredTransactions: v1Transactions[] = [];
  isLoading = true;


  constructor(private route: ActivatedRoute, private v1Service: V1Service) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchUserDetails();
    this.fetchUserTransaction();
  }

  generatePdf() {
    const elementToPrint = document.getElementById('theContent');

    if (!elementToPrint) {
      console.error('Element to print not found');
      return;
    }

    this.isLoading = true;
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4'); // Correct instantiation
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('UserDetails.pdf');
      this.isLoading = false;

    });
  }



  fetchUserDetails(): void {
    this.isLoading = true;

    this.v1Service.getUserById(this.userId).subscribe({
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

    this.v1Service.getUserTransactions(this.userId).subscribe({

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






}
