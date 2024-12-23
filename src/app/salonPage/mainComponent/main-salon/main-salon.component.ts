import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-main-salon',
  imports: [RouterLink, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule],
  templateUrl: './main-salon.component.html',
  styleUrl: './main-salon.component.css'
  
})
export class MainSalonComponent {
}
