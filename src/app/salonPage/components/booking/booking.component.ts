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


@Component({
  selector: 'app-booking',
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
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
barberId: number | null = null;
bookingMonths = 1;
selectedTreatments!: TreatmentsPriceDetails[];
selectedDate!: Date;

constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, selectedTreatments: TreatmentsPriceDetails[]}, private salonService: SalonService, private route: ActivatedRoute, private appointmentService: AppointmentService){}

  ngOnInit(): void {
    if(this.data && this.data.selectedTreatments){
      this.selectedTreatments = this.data.selectedTreatments;
      console.log('Trattamenti ricevuti dal componente genitore:', this.selectedTreatments);
    }
    this.id = this.data.id;

    this.salonService.getBarbersBySalonId(this.id).subscribe({
      next: barbers => {this.barbers = barbers, console.log(barbers), console.log(this.id)},
      error: err => console.log(err)
    });
    
    this.salonService.getBarbersBySalon(this.id).subscribe({
      next:b => {
        this.barbers = b;
        if(this.barberId){
          this.fetchAvailableDates();
        }
      },
      error: err=> console.log(err)
     });
    }


    fetchAvailableDates():void{
      if(this.barberId &&  this.selectedTreatments.length > 0) {
      this.appointmentService.getAvailableDates(this.barberId, this.bookingMonths, this.selectedTreatments.length).subscribe({
      next:(response)=> {
        console.log('Risposta API:', response);
        if(response && response.dates){
        this.dates = response.dates.map((dateString: string) => {
           // Converti ogni stringa di data in un oggetto Date
           console.log(dateString);
           return new Date(dateString);

      });
      console.log('Date disponibili:', this.dates);
    } else{
      console.log('Nessuna data disponibile');
    }
    },
      error: err => console.log(err),
      
    });
  } else{
    console.log('Errore: uno o più parametri non sono definiti correttamente');
  }
}

  onBarberSelected(barberId: number) : void{
    this.barberId = barberId;
    console.log("id barbiere", barberId);
    this.fetchAvailableDates();
  }

  onBookingMonthsChanged(months: number): void {
    this.bookingMonths = months;
    this.fetchAvailableDates();  // Ricarica le date disponibili con il nuovo numero di mesi
  }

  onSubmitBarberSelection(): void {
    console.log('Barbiere selezionato:', this.barberId);
    console.log('Data selezionata:', this.selectedDate);
  }
 
}

