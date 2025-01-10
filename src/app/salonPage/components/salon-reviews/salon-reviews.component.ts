import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReviewDetails } from '../../../model/hometables/ReviewsDetail';
import { ReviewsService } from '../../../model/hometables/ReviewsService';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-salon-reviews',
  imports: [MatGridListModule,MatCardModule,MatListModule,MatDividerModule],
  templateUrl: './salon-reviews.component.html',
  styleUrl: './salon-reviews.component.css'
})
export class SalonReviewsComponent implements OnInit {
    salonsReviews!: ReviewDetails[];
    filteredReviews!: ReviewDetails[];
    stars: number[] = [1, 2, 3, 4, 5];
    selectedRating: number = 0;

    constructor(private reviewsService : ReviewsService,private route: ActivatedRoute){}

    ngOnInit(): void {
        var id = Number(this.route.snapshot.paramMap.get("id"));
        this.reviewsService.getReviewsByAppointment(id).subscribe({
            next: rs =>{
                this.salonsReviews = rs;
                this.filteredReviews = rs;
            },
            error: err => console.log(err),
        });
    }

    calculateDaysDifference(dateString: string): number {
      const inputDate = new Date(dateString);
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate.getTime() - inputDate.getTime();
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      return Math.floor(differenceInMilliseconds / millisecondsPerDay);
    }

    filterByRating(rating: number) {
      this.selectedRating = rating;
      if (rating === 0) {
          this.filteredReviews = this.salonsReviews; // Mostra tutte le recensioni se la valutazione è 0
      } else {
          this.filteredReviews = this.salonsReviews.filter(review => review.rating === rating);
      }
  }

  changeCursor(cursorType: string) {
    document.body.style.cursor = cursorType;
  }

}

