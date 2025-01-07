import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-salon-reviews',
  imports: [MatGridListModule,MatCardModule,MatListModule,MatDividerModule],
  templateUrl: './salon-reviews.component.html',
  styleUrl: './salon-reviews.component.css'
})
export class SalonReviewsComponent {
 
}
