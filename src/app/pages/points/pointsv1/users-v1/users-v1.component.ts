import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { v1UserRecord } from '../../services/models/pointsv1.model';
import { V1Service } from '../../services/v1.service';

@Component({
  selector: 'app-users-v1',
  imports: [CommonModule, RouterLink, MatIconModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './users-v1.component.html',
  styleUrl: './users-v1.component.css'
})
export class Usersv1Component implements OnInit {
  users: v1UserRecord[] = [];
  isLoading = true;
  debug = false

  constructor(private router: Router, private v1Service: V1Service, private route: ActivatedRoute) { }



  ngOnInit(): void {

    this.fetchUsers();
    this.route.queryParams.subscribe(params => {
      this.debug = params['debug'] === 'true';
    });
  }



  fetchUsers(): void {
    this.isLoading = true;

    this.v1Service.getUsers().subscribe({
      next: (data: v1UserRecord[]) => {
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
