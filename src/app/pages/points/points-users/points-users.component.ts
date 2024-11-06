import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointsService } from '../../../services/points.service';
import { from, map, Observable } from 'rxjs';
import { UserRecord } from '../../../services/models/firebase.model';



@Component({
  selector: 'app-points-users',
  templateUrl: './points-users.component.html',
  styleUrls: ['./points-users.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PointsUsersComponent implements OnInit {
  users: UserRecord[] = [];



  constructor(private router: Router, private pointService: PointsService) { }


  ngOnInit(): void {
    this.fetchUsers();

  }

  fetchUsers(): void {
    this.pointService.getUsersOnce().then((users) => {
      this.users = users;
    });
  }


  navigateToOrder(Id: string) {
  }
}
