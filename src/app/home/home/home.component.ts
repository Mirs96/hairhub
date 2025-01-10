import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { TopsalonComponent } from '../topsalon/topsalon.component';
import { RouterModule } from '@angular/router';
import { SwiperCarouselComponent } from '../carousel/carousel.component';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { SidenavComponent } from '../../Sidenav/sidenav/sidenav.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { UserService } from '../../model/hometables/userService';
import { AppointmentService } from '../../model/bookingAppointment/appointment.service';
import { AppointmentDetail } from '../../model/hometables/AppointmentDetail';
import { TreatmentDto } from '../../model/hometables/TreatmentDto';
import { ReviewsService } from '../../model/hometables/ReviewsService';
import { jwtDecode } from 'jwt-decode';
import { ReviewDialogComponent } from '../dialogForm/review-dialog/review-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    TopsalonComponent,
    RouterModule,
    SwiperCarouselComponent,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
    MatDrawerContainer,
    MatDrawer,
    CommonModule,
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer; // Riferimento alla sidenav

  futureAppointments: AppointmentDetail[] = [];
  pastAppointments: AppointmentDetail[] = [];
  isLoggedIn = false;
  isAuthenticated: boolean = false;
  showLogin = false; // Variabile per controllare la visibilità del LoginComponent
  showRegister = false; // Variabile per controllare la visibilità del RegisterComponent
  userProfile: any = null; // Variabile per salvare il profilo dell'utente

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private reviewsService: ReviewsService,
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();

    this.userService.loggedIn$.subscribe({
      next: (s) => (this.isLoggedIn = s),
      error: (err) => console.log(err),
    });

    const userIdStr = this.userService.getUserIdFromToken();
    const userId = userIdStr ? parseInt(userIdStr) : null;
    console.log('userId:', userId);

    if (userId != null) {
      this.appointmentService.getFutureAppointments(userId).subscribe({
        next: (appointments) => {
          console.log('Future appointments:', appointments);
          appointments.forEach((appointment: AppointmentDetail) => {
            if (appointment.status === 'Cancelled') {
              this.pastAppointments.push(appointment);
            } else {
              this.futureAppointments.push(appointment);
            }
          });
        },
        error: (err) => console.log(err),
      });

      this.appointmentService.getPastAppointments(userId).subscribe({
        next: (appointments) => {
          console.log('Past appointments:', appointments);
          this.pastAppointments = this.pastAppointments.concat(appointments);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.log('User is not authenticated or invalid userId');
    }
  }

  checkAuthentication() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.isAuthenticated = true;
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        this.userProfile = decodedToken; // Save user profile
      } catch (error) {
        console.error('Error decoding token', error);
      }
    } else {
      this.isAuthenticated = false;
    }
  }

  canReview(appointment: AppointmentDetail): boolean {
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);

    // Verifica se la data dell'appuntamento è passata e se è possibile fare una recensione
    if (appointment.status !== 'Cancelled' && currentDate > appointmentDate) {
      return true;
    }
    return false;
  }

  openReviewDialog(appointment: AppointmentDetail): void {
    if (this.canReview(appointment)) {
      const dialogRef = this.dialog.open(ReviewDialogComponent, {
        width: '400px',
        data: { appointmentId: appointment.id },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Recensione aggiunta:', result);
        }
      });
    } else {
      console.log('Non puoi fare una recensione per questo appuntamento.');
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialogo chiuso', result);
      if (result && result.success) {
        localStorage.setItem('jwtToken', result.token); // Save token
        this.isAuthenticated = true;
        this.checkAuthentication();
      } else {
        this.isAuthenticated = false;
        this.checkAuthentication();
      }
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialogo registrazione chiuso', result);
    });
  }

  toggleRegister(): void {
    this.showRegister = !this.showRegister;
  }

  toggleLogin(): void {
    this.showLogin = !this.showLogin;
  }

  logout() {
    console.log('Logout in corso...');
    localStorage.removeItem('jwtToken');
    this.isAuthenticated = false;
    this.checkAuthentication();
  }

  openSidenav() {
    if (this.drawer) {
      this.drawer.open();
    } else {
      console.error('Sidenav non trovata!');
    }
  }

  closeSidenav() {
    if (this.drawer) {
      this.drawer.close();
    }
  }

  calculateTotalPrice(futureAppointment: AppointmentDetail): number {
    return futureAppointment.treatments
      .map((t) => t.price)
      .reduce((total: number, price: number) => total + price, 0);
  }

  deleteAppointment(appointmentId: number): void {
    const appointmentToDelete = this.futureAppointments.find(
      (a) => a.id === appointmentId
    );

    if (appointmentToDelete) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe({
        next: () => {
          console.log(`Appuntamento con ID ${appointmentId} eliminato.`);
          appointmentToDelete.status = 'Cancelled';
          this.futureAppointments = this.futureAppointments.filter(
            (a) => a.id !== appointmentId
          );

          if (appointmentToDelete.status === 'Cancelled') {
            this.pastAppointments = [...this.pastAppointments, appointmentToDelete];
          }

          this.appRef.tick();
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione dell\'appuntamento:', err);
        },
      });
    } else {
      console.log('Appuntamento non trovato nei futureAppointments');
    }
  }
}
