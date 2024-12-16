import { Component, AfterViewInit, OnInit, Injectable,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageService} from '../model/hometables/imageService'; // Modifica il percorso se necessario
import { HttpClient } from '@angular/common/http';
import { Swiper } from 'swiper';



@Component({
  selector: 'app-swiper-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
@Injectable({
  providedIn: 'root'
})



export class SwiperCarouselComponent implements OnInit, AfterViewInit {
  images: string[] = [];
  loading = false;
  error = false;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.loading = true;

    this.imageService.getImages().subscribe({
      next: (data: string[]) => {
        this.images = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      loop: true
    });
  }
}