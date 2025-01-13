import { ChangeDetectorRef, Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
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
import { SalonDetails } from '../../../model/hometables/SalonDetails';
import { SalonService } from '../../../model/hometables/SalonService';
import { Observable, ObservedValueOf } from 'rxjs';
import { SalonReviewsComponent } from "../../components/salon-reviews/salon-reviews.component";
import { UserService } from '../../../model/hometables/userService';
import { NavbarComponent } from '../../../navbar/navbar.component';


@Component({
  selector: 'app-main-salon',
  imports: [RouterLink, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule, SalonCarouselComponent, SelectServiceComponent, CheckoutTableComponent, SalonReviewsComponent, NavbarComponent],
  templateUrl: './main-salon.component.html',
  styleUrl: './main-salon.component.css'
})
export class MainSalonComponent implements OnInit{
   salonDetails!: SalonDetails;
   selectedTreatments: TreatmentsPriceDetails[] = [];
   isLoggedIn = false;

   @Output()
   addTreatment = new EventEmitter<TreatmentsPriceDetails>();

  constructor(private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private salonService: SalonService, private userService: UserService) {}

  addToCheckout(treatment: TreatmentsPriceDetails): void {
    // Verifica se il trattamento è già stato selezionato
    const alreadySelected = this.selectedTreatments.find(
      (selected) => selected.id === treatment.id
    );

    if (!alreadySelected) {
      this.selectedTreatments.push(treatment);  // Aggiungi solo se non è già selezionato
      this.addTreatment.emit(treatment);        // Emette l'evento solo per i nuovi trattamenti
    } else {
      console.log('Trattamento già selezionato:', treatment.name);
    }
  }

  removeTreatmentFromMain(treatment: TreatmentsPriceDetails): void {
    // Rimuove il trattamento anche dall'array selectedTreatments in MainSalonComponent
    const index = this.selectedTreatments.findIndex(
      (t) => t.id === treatment.id
    );
    if (index > -1) {
      this.selectedTreatments.splice(index, 1);
    }
  }
  
  
  ngOnInit(): void {
    //BLOCCO SWIPER
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

    // FINE BLOCCO SWIPER

    var id = this.route.snapshot.params['id'];
    this.salonService.getSalonById(id).subscribe({
      next: ss => this.salonDetails = ss,
      error: err => console.log(err)     
    });

    this.userService.loggedIn$.subscribe({
      next: s => this.isLoggedIn = s,
      error: err => console.log(err)

    });
    this.userService.getUserIdFromToken();

  }


}
