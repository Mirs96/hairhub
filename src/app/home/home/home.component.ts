import { Component, OnInit, Inject } from '@angular/core';
import { TopsalonComponent } from '../topsalon/topsalon.component';
import { RouterModule } from '@angular/router';
import { SwiperCarouselComponent } from '../carousel/carousel.component';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog'; // Import per il dialog

@Component({
  selector: 'app-home',
  imports: [
    TopsalonComponent,
    RouterModule,
    SwiperCarouselComponent,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatIconModule,
    LoginComponent,
    RegisterComponent,
    DialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  isAuthenticated: boolean = false;
  showLogin = false; // Variabile per controllare la visibilità del LoginComponent
  showRegister = false; // Variabile per controllare la visibilità del RegisterComponent
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  // Funzione per aprire il dialog di login
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '800px',  // Imposta la larghezza a 800px
      data: {} // Puoi passare dati al dialog se necessario
    });

    

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo chiuso', result);
      // Gestisci azioni dopo la chiusura del dialog
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      minWidth: '300px',
      data: {} // Puoi passare dati al dialog se necessario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo registrazione chiuso', result);
    });
  }

  toggleRegister(): void {
    this.showRegister = !this.showRegister;
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      minWidth: '300px',
      data: {
        // Aggiungi eventuali dati che desideri passare al dialog
      }
    });
  }

  toggleLogin(): void {
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
