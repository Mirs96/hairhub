import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReviewsDetail } from '../../../model/hometables/ReviewsDetail';
import { ReviewsService } from '../../../model/hometables/ReviewsService';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-salon-reviews',
  imports: [MatGridListModule,MatCardModule,MatListModule,MatDividerModule],
  templateUrl: './salon-reviews.component.html',
  styleUrl: './salon-reviews.component.css'
})
export class SalonReviewsComponent implements OnInit {
    salonsReviews!: ReviewsDetail[];

    constructor(private reviewsService : ReviewsService,private route: ActivatedRoute){}

    ngOnInit(): void {
        var id = Number(this.route.snapshot.paramMap.get("id"));
        this.reviewsService.getReviewsByAppointment(id).subscribe({
            next: rs => this.salonsReviews = rs,
            error: err => console.log(err),
        });
    }
}
