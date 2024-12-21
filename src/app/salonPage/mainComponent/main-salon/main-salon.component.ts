import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SelectServiceComponent } from '../../components/select-service/select-service.component';
import { CheckoutTableComponent } from '../../components/checkout-table/checkout-table.component';


@Component({
  selector: 'app-main-salon',
  imports: [RouterLink, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule, SelectServiceComponent,CheckoutTableComponent],
  templateUrl: './main-salon.component.html',
  styleUrl: './main-salon.component.css'
  
})
export class MainSalonComponent {
}
