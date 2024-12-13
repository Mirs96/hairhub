import { Component } from '@angular/core';
import { Salon } from '../../model/hometables/Salon';
import { SalonService } from '../../model/hometables/SalonService';

@Component({
  selector: 'app-topsaloon',
  imports: [],
  templateUrl: './topsalon.component.html',
  styleUrl: './topsalon.component.css'
})
export class TopsalonComponent {
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
