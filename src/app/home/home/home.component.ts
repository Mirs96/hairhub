import { Component, OnInit } from '@angular/core';
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
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-home',
  imports: [TopsalonComponent,RouterModule, SwiperCarouselComponent, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule,LoginComponent,RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    this.checkAuthentication();
  }


  isAuthenticated: boolean = false;
  showLogin = false; //variabile per controllare la visibilità del loginComponent
  showRegister = false; //variabile per controllare la visibilità del RegisterComponent

  toggleRegister(): void{
    this.showRegister = !this.showRegister;
    
  }


  toggleLogin(): void{
    this.showLogin = !this.showLogin; // Cambia lo stato della visibilità
    console.log('Login visibility:', this.showLogin);  // Per debug
  }

  goHome(): void {
    console.log('Go home');
  }

  checkAuthentication() {
    const token = localStorage.getItem('jwtToken');
    this.isAuthenticated = token !== null; // Se c'è un token, l'utente è autenticato
  }
    logout() {
      localStorage.removeItem('jwtToken');
      this.isAuthenticated = false; // Rimuove il flag di autenticazione
    }

 
}

