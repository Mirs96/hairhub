import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SelectServiceComponent } from '../../components/select-service/select-service.component';
import { CheckoutTableComponent } from '../../components/checkout-table/checkout-table.component';
import { TreatmentsPriceDetails } from '../../../model/hometables/TreatmentsPricesDetails';
import { Swiper} from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { SalonCarouselComponent } from "../../components/salon-carousel/salon-carousel.component";

@Component({
  selector: 'app-main-salon',
  imports: [RouterLink, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule, SalonCarouselComponent, SelectServiceComponent, CheckoutTableComponent],
  templateUrl: './main-salon.component.html',
  styleUrl: './main-salon.component.css'
})
export class MainSalonComponent implements OnInit{
  @Input() selectedTreatments: TreatmentsPriceDetails[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  addToCheckout(treatment: TreatmentsPriceDetails) {
    this.selectedTreatments.push(treatment);  // Aggiunge il trattamento alla lista
    this.cdRef.detectChanges(); // Forza la rilevazione dei cambiamenti
  }
  
  
  ngOnInit(): void {
    const swiperOptions: SwiperOptions = {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    const swiper = new Swiper('.swiper', swiperOptions);
    }

}
