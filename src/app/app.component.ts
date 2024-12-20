import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { SwiperCarouselComponent } from "./home/carousel/carousel.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

const THUMBUP_ICON =
  `
  <?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
 viewBox="0 0 32 32" xml:space="preserve">
  <style type="text/css">
  .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  </style>
  <path d="M28,25c0.9-1.2,1.6-2.5,2.1-3.9c0-0.1,0.1-0.2,0.1-0.4c0.1-0.2,0.1-0.5,0.2-0.7c0.1-0.2,0.1-0.4,0.2-0.6
c0-0.2,0.1-0.4,0.1-0.6c0.1-0.3,0.1-0.6,0.1-0.8c0-0.2,0-0.3,0.1-0.5c0-0.5,0.1-0.9,0.1-1.4c0-8.3-6.7-15-15-15S1,7.7,1,16
c0,0.5,0,0.9,0.1,1.4c0,0.2,0,0.3,0.1,0.5c0,0.3,0.1,0.6,0.1,0.8c0,0.2,0.1,0.4,0.1,0.6c0,0.2,0.1,0.4,0.2,0.6
c0.1,0.2,0.1,0.5,0.2,0.7c0,0.1,0.1,0.2,0.1,0.4C2.4,22.5,3.1,23.8,4,25v0l0,0c2.7,3.6,7.1,6,12,6S25.2,28.6,28,25L28,25L28,25z
 M16,29c-4.6,0-8.6-2.4-10.9-6c1.6-2.6,4.1-4.5,7.1-5.4C10.8,16.5,10,14.8,10,13c0-3.3,2.7-6,6-6s6,2.7,6,6c0,1.8-0.8,3.5-2.1,4.6
c2.9,0.9,5.4,2.9,7.1,5.4C24.6,26.6,20.6,29,16,29z"/>
</svg>
`;


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, SwiperCarouselComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hairHub';
  isMenuOpen = false;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconLiteral('thumbs-up', this.sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
  }


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
}

export class AppModule{}

/* export class IconSvgExample {
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
  }
} */