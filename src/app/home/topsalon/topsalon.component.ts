
import { Salon } from '../../model/hometables/Salon';
import { SalonService } from '../../model/hometables/SalonService';
import {MatGridListModule} from '@angular/material/grid-list';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-topsaloon',
  imports: [MatGridListModule,MatChipsModule,MatCardModule,MatProgressBarModule],
  templateUrl: './topsalon.component.html',
  styleUrl: './topsalon.component.css'
})
export class TopsalonComponent {

  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

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
