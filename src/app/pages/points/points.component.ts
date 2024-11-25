import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-points',
  imports: [RouterOutlet, RouterLink],
  standalone: true,
  templateUrl: './points.component.html',
  styleUrl: './points.component.css'
})
export class PointsComponent {

}
