import { Component } from '@angular/core';
import { TopsalonComponent } from '../topsalon/topsalon.component';
import { RouterModule } from '@angular/router';
import { SwiperCarouselComponent } from '../carousel/carousel.component';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-home',
  imports: [TopsalonComponent,RouterModule, SwiperCarouselComponent, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
