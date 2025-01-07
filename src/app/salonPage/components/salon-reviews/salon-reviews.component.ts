import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-salon-reviews',
  imports: [MatGridListModule],
  templateUrl: './salon-reviews.component.html',
  styleUrl: './salon-reviews.component.css'
})
export class SalonReviewsComponent {
  tiles: Tile[] = [
    { text: 'Table 1', cols: 2, rows: 2, color: 'lightblue' },  // Prima tabella (larga e alta 2 righe)
    { text: 'Table 2', cols: 2, rows: 4, color: 'lightgreen' }, // Seconda tabella (alta 4 righe, a destra della prima)
  ];
}
