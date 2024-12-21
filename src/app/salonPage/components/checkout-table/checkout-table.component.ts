import { Component } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-checkout-table',
  imports: [CdkDrag],
  templateUrl: './checkout-table.component.html',
  styleUrl: './checkout-table.component.css'
})
export class CheckoutTableComponent {
    
}
