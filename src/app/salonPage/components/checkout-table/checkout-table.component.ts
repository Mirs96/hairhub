import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { TreatmentsPriceDetails } from '../../../model/hometables/TreatmentsPricesDetails';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatListItem } from '@angular/material/list';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-table',
  imports: [CdkDrag,MatListModule, MatDividerModule,MatIcon,CommonModule],
  templateUrl: './checkout-table.component.html',
  styleUrl: './checkout-table.component.css',
})
export class CheckoutTableComponent implements OnChanges{
  
  @Input() selectedTreatments: TreatmentsPriceDetails[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTreatments']) {
      console.log('Trattamenti aggiornati:', this.selectedTreatments);
    }
  }

  get total(): number {
    return this.selectedTreatments.reduce((sum, treatment) => sum + treatment.price, 0);
    
  }

  removeTreatment(id: number): void {
    const updatedTreatments = this.selectedTreatments.filter(treatment => treatment.id !== id);
    this.selectedTreatments = [...updatedTreatments]; // Nuova istanza dell'array
    this.cdRef.detectChanges(); // Forza la rilevazione dei cambiamenti
  }

}
