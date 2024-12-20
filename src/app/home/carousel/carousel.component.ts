import { Component, AfterViewInit, OnInit, Injectable,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageService} from '../../model/hometables/imageService'; 
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';




@Component({
  selector: 'app-swiper-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
@Injectable({
  providedIn: 'root'
})



export class SwiperCarouselComponent   {
  images: string[] = [];
  loading = false;
  error = false;

  isWinterCarouselVisible: boolean = true;

  showWinterCarousel(): void {
    this.isWinterCarouselVisible = true;
  }

  showSummerCarousel(): void {
    this.isWinterCarouselVisible = false;
  }

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

}