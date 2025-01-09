import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  showFiller = false;
}
