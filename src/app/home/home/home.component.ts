import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
import { MatDialog, MatDialogModule} from '@angular/material/dialog'; // Import per il dialog
import {jwtDecode} from 'jwt-decode';
import { SidenavComponent } from '../../Sidenav/sidenav/sidenav.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
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
    SidenavComponent,
    MatDrawerContainer,
    MatDrawer,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  @ViewChild('drawer') drawer!: MatDrawer; // Riferimento alla sidenav

  isAuthenticated: boolean = false;
  showLogin = false; // Variabile per controllare la visibilità del LoginComponent
  showRegister = false; // Variabile per controllare la visibilità del RegisterComponent
  userProfile: any = null;  // Variabile per salvare il profilo dell'utente
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  // Funzione per aprire il dialog di login
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
        width: '800px',
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('Dialogo chiuso', result);

        if (result && result.success) {
          console.log('Login riuscito, token:', result.token); // Verifica il token che ritorna
          localStorage.setItem('jwtToken', result.token); // Salva il token
          this.isAuthenticated = true; // Imposta l'autenticazione su true
          this.checkAuthentication();  // Verifica lo stato dell'autenticazione
          console.log('Utente autenticato dopo il login:', this.isAuthenticated);
        } else {
          console.log('Login fallito o dialogo chiuso senza login');
          this.isAuthenticated = false;
          this.checkAuthentication();
        }
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


  toggleLogin(): void {
    this.showLogin = !this.showLogin; // Cambia lo stato della visibilità
    console.log('Login visibility:', this.showLogin);  // Per debug
    console.log(this.isAuthenticated);
  }

  goHome(): void {
    console.log('Go home');
  }

  checkAuthentication() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.isAuthenticated = true;
      try {
        // Decodifica il token
        const decodedToken: any = jwtDecode(token);
        console.log('Token decodificato:', decodedToken); // Mostra il contenuto del token
        this.userProfile = decodedToken; // Salva il profilo dell'utente
      } catch (error) {
        console.error('Errore nella decodifica del token', error);
      }
    } else {
      this.isAuthenticated = false;
    }
  }


  logout() {
    console.log('logout in corso...');
    localStorage.removeItem('jwtToken');
    this.isAuthenticated = false; // Rimuove il flag di autenticazione
    this.checkAuthentication();
    console.log('Stato dopo il logout:', this.isAuthenticated);
    
  }

  openSidenav() {
    if (this.drawer) {
      this.drawer.open(); // Apre la sidenav
    } else {
      console.error('Sidenav non trovata!');
    }
  }

  closeSidenav() {
    if (this.drawer) {
      this.drawer.close(); // Chiude la sidenav
    }
  }
  
}
