import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewDetails } from '../../../model/hometables/ReviewsDetail';
import { ReviewsService } from '../../../model/hometables/ReviewsService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-dialog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent implements OnInit {
  reviewForm!: FormGroup;
  appointmentId!: number;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: { appointmentId: number }, private reviewService: ReviewsService, private dialogRef: MatDialogRef<ReviewDialogComponent>) { }

  ngOnInit(): void {
    this.appointmentId = this.data.appointmentId;
    console.log("appid:", this.appointmentId);
    // Inizializzazione del FormGroup con i relativi controlli
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    });
  }

  // Metodo di submit del form
  onSubmit(): void {
    if (this.reviewForm.valid) {
      const reviewData: ReviewDetails = {
        id: 0,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        date: new Date().toISOString().split('T')[0],  // Utilizzo della data corrente
        appointmentId: this.appointmentId,  // L'ID dell'appuntamento passato
      };
      console.log('Recensione inviata:', reviewData);

      // Chiamata al servizio per inviare i dati (esempio)
      // this.reviewService.submitReview(reviewData);
      this.reviewService.createReview(reviewData).subscribe({
        next: response =>
          console.log("Successo nella rec"),
        error: err => console.log(err)
      });
      this.dialogRef.close();
    } else {
      console.log('Il form non è valido');
    }
  }
}
