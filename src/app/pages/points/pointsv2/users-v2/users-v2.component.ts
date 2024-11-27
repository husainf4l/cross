import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { V2Service } from '../../services/v2.service';
import { v2UserRecord } from '../../services/models/pointsv2.model';

@Component({
  selector: 'app-users-v2',
  imports: [CommonModule, RouterLink, MatIconModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './users-v2.component.html',
  styleUrl: './users-v2.component.css'
})
export class UsersV2Component implements OnInit {
  users: v2UserRecord[] = [];
  isLoading = true;
  constructor(private router: Router, private v2Service: V2Service) { }


  ngOnInit(): void {

    this.fetchUsers();

  }



  fetchUsers(): void {
    this.isLoading = true;

    this.v2Service.getUsers().subscribe({
      next: (data: v2UserRecord[]) => {
        this.users = data;
        this.isLoading = false;

      },
      error: (err) => {
        console.error('Error fetching users:', err); // Handle errors
      }
    });
  }

  navigateToOrder(Id: string) {
  }
}
