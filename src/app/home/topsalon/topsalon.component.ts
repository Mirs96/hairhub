
import { Salon } from '../../model/hometables/Salon';
import { SalonService } from '../../model/hometables/SalonService';
import {MatGridListModule} from '@angular/material/grid-list';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SalonDetails } from '../../model/hometables/SalonDetails';

@Component({
  selector: 'app-topsaloon',
  imports: [MatGridListModule,MatChipsModule,MatCardModule,MatProgressBarModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './topsalon.component.html',
  styleUrl: './topsalon.component.css'
})
export class TopsalonComponent implements OnInit {
  
  topSalon!: SalonDetails[];
  topSalonByCut!: SalonDetails[];
  topSalonByBeard!: SalonDetails[];

  constructor(private salonService : SalonService){}

  ngOnInit(): void {
    this.salonService.getTopSalons().subscribe({
      next: ts => this.topSalon = ts,
      error: err => console.log(err)     
    });
    this.salonService.getTopSalonsByCut().subscribe({
      next: ts => this.topSalonByCut = ts,
      error: err => console.log(err)     
    });
    this.salonService.getTopSalonsByBeard().subscribe({
      next: ts => this.topSalonByBeard = ts,
      error: err => console.log(err)     
    });
  }

}
