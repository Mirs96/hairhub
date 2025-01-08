import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BarberDetails } from '../../../model/hometables/barberDetails';
import { SalonService } from '../../../model/hometables/SalonService';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AvailableDates } from '../../../model/bookingAppointment/availableDates';
import { AppointmentService } from '../../../model/bookingAppointment/appointment.service';
import { TreatmentsPriceDetails } from '../../../model/hometables/TreatmentsPricesDetails';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';




@Component({
  selector: 'app-booking',
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatTimepickerModule, FormsModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  barbers!: BarberDetails[];
  barber!: BarberDetails;
  id!: number;
  dates!: Date[];
  salonId!: number;
  barberId!: number;
  bookingMonths = 1;
  selectedTreatments!: TreatmentsPriceDetails[];
  selectedDate!: Date;
  bookingForm: FormGroup;
  barberChoice!: number;
  value!: Date;
  availableDates!: Date[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, selectedTreatments: TreatmentsPriceDetails[] }, private salonService: SalonService, private route: ActivatedRoute, private appointmentService: AppointmentService, private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      barberId: [''],
      date: [''],
      time: ['']
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.selectedTreatments) {
      this.selectedTreatments = this.data.selectedTreatments;
      console.log('Trattamenti ricevuti dal componente genitore:', this.selectedTreatments);
    }
    this.id = this.data.id;

    this.salonService.getBarbersBySalonId(this.id).subscribe({
      next: barbers => { this.barbers = barbers, console.log(barbers), console.log(this.id) },
      error: err => console.log(err)
    });

    this.bookingForm.get('barberId')?.valueChanges.subscribe({
      next: (barberId: number) => {
        this.barberId = barberId;
        this.fetchAvailableDates(barberId);
        console.log('Barbiere selezionato:', barberId);

      },
      error: err => console.log(err)
    });


  }

  fetchAvailableDates(barberId: number): void {

    if (this.barberId && this.selectedTreatments.length > 0) {
      this.appointmentService.getAvailableDates(this.barberId, this.bookingMonths, this.selectedTreatments.length).subscribe({
        next: (response) => {
          console.log('Risposta API:', response);
          if (response && response.dates) {
            this.dates = response.dates.map((dateString: string) => {
              // Converti ogni stringa di data in un oggetto Date
              console.log(dateString);
              return new Date(dateString);

            });
            console.log('Date disponibili:', this.dates);
          } else {
            console.log('Nessuna data disponibile');
          }
        },
        error: err => console.log(err),

      });
    } else {
      console.log('Errore: uno o più parametri non sono definiti correttamente');
    }
  }

  fetchAvailableTimes(barberId: number, date: Date): void {
    console.log("Data", date);

  }

  isDateAvailable = (date: Date): string => {
    const isAvailable = this.availableDates.some(availableDate => {
      return availableDate.getFullYear() === date.getFullYear() &&
             availableDate.getMonth() === date.getMonth() &&
             availableDate.getDate() === date.getDate();
    });
    return isAvailable ? '' : 'mat-calendar-body-cell-disabled';
  }

  onSubmitBarberSelection(): void {
    console.log('Barbiere selezionato:', this.barberId);
    console.log('Data selezionata:', this.selectedDate);
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.fetchAvailableTimes(this.barberId, date);
    console.log('Data selezionata:', date);
  }

  onSubmit() {
    this.barberChoice = this.bookingForm.value.barberId;
    console.log(this.barberChoice);
  }

}

