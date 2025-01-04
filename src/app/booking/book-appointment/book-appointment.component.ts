import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../model/bookingAppointment/appointment.service';
import { SalonService } from '../../model/hometables/SalonService';
import { BarberDetails } from '../../model/hometables/barberDetails';
import { AvailableDates } from '../../model/bookingAppointment/availableDates';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  imports: [],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  barbers!: BarberDetails[];
  dates!: AvailableDates;
  salonId!: number;
  barberId!: number;
  bookingMonths!: number;
  numberOfTreatments!: number;


  constructor(private appointmentService: AppointmentService, private salonService: SalonService, private route: ActivatedRoute){}
  
  
  ngOnInit(): void {
    salonId: this.route.snapshot.params['id'];
    
    this.salonService.getBarbersBySalon(this.salonId).subscribe({
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
    this.appointmentService.getAvailableDates(this.barberId, this.bookingMonths, this.numberOfTreatments).subscribe({
      next:d=> this.dates = d,
      error: err => console.log(err)
    });
  }

  onBarberSelected(barberId: number) : void{
    this.barberId = barberId;
    this.fetchAvailableDates();
  }

  onBookingMonthsChanged(months: number): void {
    this.bookingMonths = months;
    this.fetchAvailableDates();  // Ricarica le date disponibili con il nuovo numero di mesi
  }

  // Metodo per aggiornare il numero di trattamenti
  onNumberOfTreatmentsChanged(treatments: number): void {
    this.numberOfTreatments = treatments;
    this.fetchAvailableDates();  // Ricarica le date disponibili con il nuovo numero di trattamenti
  }
}



  

