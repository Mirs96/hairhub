import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ReviewsService } from '../../../model/hometables/ReviewsService';
import { ReviewDetails } from '../../../model/hometables/ReviewsDetail';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  imports: [MatFormField,MatDialogContent,MatDialogModule,MatLabel,MatSelect,MatOption,FormsModule],
  templateUrl: './review-Dialog.component.html',
  styleUrls: ['./review-Dialog.component.css']
})
export class ReviewFormComponent {

  rating: number = 5; // Default valore di rating
  comment: string = ''; // Commento vuoto di default
  appointmentId: number;

  constructor(
    public dialogRef: MatDialogRef<ReviewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  // Dati passati al dialogo (come l'ID dell'appuntamento)
    private reviewsService: ReviewsService
  ) {
    this.appointmentId = data.appointmentId;  // Otteniamo l'ID dell'appuntamento
  }

  onNoClick(): void {
    this.dialogRef.close();  // Chiude il dialogo senza salvare
  }

  onSubmit(): void {
    const review: ReviewDetails = {
      appointmentId: this.appointmentId,
      rating: this.rating,
      comment: this.comment,
      id: this.appointmentId,
      date: Date.now().toString()
    };

    // Invia la recensione al backend tramite il servizio
    this.reviewsService.createReview(review).subscribe({
      next: (response) => {
        console.log('Recensione creata con successo:', response);
        this.dialogRef.close(true);  // Chiude il dialogo e invia un successo
      },
      error: (error) => {
        console.error('Errore nella creazione della recensione:', error);
        this.dialogRef.close(false);  // Chiude il dialogo senza successo
      }
    });
  }
}