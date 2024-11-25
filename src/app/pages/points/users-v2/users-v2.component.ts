import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { v2UserRecord } from '../services/models/points.model';
import { V2Service } from '../services/v2.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-v2',
  imports: [CommonModule, RouterLink, MatIconModule],
  standalone: true,
  templateUrl: './users-v2.component.html',
  styleUrl: './users-v2.component.css'
})
export class UsersV2Component implements OnInit {
  users: v2UserRecord[] = [];

  constructor(private router: Router, private v2Service: V2Service) { }


  ngOnInit(): void {

    this.fetchUsers();

  }

  fetchUsers(): void {
    this.v2Service.getUsers().subscribe({
      next: (data: v2UserRecord[]) => {
        this.users = data; // Assign the fetched data to the `users` array
      },
      error: (err) => {
        console.error('Error fetching users:', err); // Handle errors
      }
    });
  }

  navigateToOrder(Id: string) {
  }
}
