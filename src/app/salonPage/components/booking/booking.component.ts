import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BarberDetails } from '../../../model/hometables/barberDetails';
import { SalonService } from '../../../model/hometables/SalonService';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AvailableDates } from '../../../model/bookingAppointment/availableDates';
import { AppointmentService } from '../../../model/bookingAppointment/appointment.service';
import { TreatmentsPriceDetails } from '../../../model/hometables/TreatmentsPricesDetails';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import moment from 'moment-timezone';
import { MatMenu } from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl} from '@angular/forms';


@Component({
  selector: 'app-booking',
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatTimepickerModule, FormsModule, MatSelectModule,MatMenuModule,MatInputModule,MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  barbers!: BarberDetails[];
  barber!: BarberDetails;
  id!: number;
  salonId!: number;
  barberId!: number;
  bookingMonths = 1;
  selectedTreatments!: TreatmentsPriceDetails[];
  selectedDate!: Date;
  bookingForm: FormGroup;
  barberChoice!: number;
  value!: string;
  availableDates!: Date[];
  availableTimes: string[] = [];
  timeOptions: { value: string, viewValue: string }[] = []; // Array per le opzioni del select

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, selectedTreatments: TreatmentsPriceDetails[] }, private salonService: SalonService, private route: ActivatedRoute, private appointmentService: AppointmentService, private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      barberId: [''],
      date: [''],
      time: ['',Validators.required]
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
            this.availableDates = response.dates.map((dateString: string) => {
              // Converti ogni stringa di data in un oggetto Date
              console.log(dateString);
              return new Date(dateString);

            });
            console.log('Date disponibili:', this.availableDates);
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
    if (barberId && date) {
      const localDate = moment(date).tz("Europe/Rome", true).startOf('day');
      const dateString = localDate.format("YYYY-MM-DD");
      console.log("Data locale (formattata)", dateString);
  
      this.appointmentService.getAvailableTimes(barberId, dateString, this.bookingMonths).subscribe({
        next: (times) => {
          console.log("Orari Disponibili", times);
  
          // Ensure `times` is an array before mapping
          if (!Array.isArray(times)) {
            console.error("Unexpected data format from getAvailableTimes. Expected an array of times.");
            return; // Exit early if the data format is unexpected
          }
  
          this.availableTimes = times;
  
          // Map times to timeOptions object with value and viewValue
          this.timeOptions = times.map(time => ({ value: time, viewValue: time }));
          console.log("timeOptions", this.timeOptions);
  
          this.bookingForm.get('time')?.enable(); // Enable the time field only after successful mapping
        },
        error: (err) => {
          console.log("Errore durante il recupero degli orari disponibili", err);
        }
      });
    } else {
      console.log("Data o Barbiere non validi");
    } // Missing closing curly brace added here
  }

  isDateAvailable = (date: Date | null): boolean => {
    if (!date || !this.availableDates || this.availableDates.length === 0) {
      return false;
    }
  
    const isAvailable = this.availableDates.some(availableDate => {
      if(typeof availableDate === 'string'){
        availableDate = new Date(availableDate);
      }

      if(!(availableDate instanceof Date) || isNaN(availableDate.getTime())) {
        console.error('availableDate non è un oggetto Date valido:', availableDate);
        return false;
      }
      
      return availableDate.getFullYear() === date.getFullYear() &&
              availableDate.getMonth() === date.getMonth() &&
             availableDate.getDate() === date.getDate();
    });
    return isAvailable;
  }

  onSubmitBarberSelection(): void {
    console.log('Barbiere selezionato:', this.barberId);
    console.log('Data selezionata:', this.selectedDate);
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    const date = event.value;
    if(date){
    this.selectedDate = date;
    this.fetchAvailableTimes(this.barberId, date);
    console.log('Data selezionata:', date);
    } else{
      console.log("Data non valida");
    }
  }

  onSubmit() {
    this.barberChoice = this.bookingForm.value.barberId;
    console.log(this.barberChoice);
  }

}

