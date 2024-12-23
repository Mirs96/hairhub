import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Swiper} from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { SalonCarouselComponent } from "../../components/salon-carousel/salon-carousel.component";


@Component({
  selector: 'app-main-salon',
  imports: [RouterLink, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule, SalonCarouselComponent],
  templateUrl: './main-salon.component.html',
  styleUrl: './main-salon.component.css'
})
export class MainSalonComponent implements OnInit{
  
  
  
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
