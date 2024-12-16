
import { Salon } from '../../model/hometables/Salon';
import { SalonService } from '../../model/hometables/SalonService';
import {MatGridListModule} from '@angular/material/grid-list';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-topsaloon',
  imports: [MatGridListModule,MatChipsModule,MatCardModule,MatProgressBarModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './topsalon.component.html',
  styleUrl: './topsalon.component.css'
})
export class TopsalonComponent {

  longText = ``;

  topSalons!: Salon[];
  topSalonsByCut!:Salon[];
  topSalonsByBeard!:Salon[];
  //injection💉
  constructor(private salonService: SalonService) {
  }
  
  ngOnInit(): void {
    this.topSalons = this.salonService.getTopSalons();
    this.topSalonsByCut = this.salonService.getTopSalons();
    this.topSalonsByBeard = this.salonService.getTopSalons();
  }
  

}
