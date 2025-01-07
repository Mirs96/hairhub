import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BarberDetails } from '../../../model/hometables/BarberDetails';
import { SalonService } from '../../../model/hometables/SalonService';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number}, private salonService: SalonService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.data.id;
    console.log(this.id);
    this.salonService.getBarbersBySalonId(this.id).subscribe({
      next: barbers => {this.barbers = barbers, console.log(barbers), console.log(this.id)},
      error: err => console.log(err)
    });
    
  }
}
