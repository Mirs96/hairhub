import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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


  constructor(private cdRef: ChangeDetectorRef) {}

  @Input() 
  selectedTreatments!: TreatmentsPriceDetails[];
  @Output()
   treatmentRemoved = new EventEmitter<TreatmentsPriceDetails>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTreatments']) {
      console.log('Trattamenti aggiornati:', this.selectedTreatments);
    }
  }

  get total(): number {
    return this.selectedTreatments.reduce((sum, treatment) => sum + treatment.price, 0);
    
  }
  removeTreatment(id: number): void {
    const index = this.selectedTreatments.findIndex(treatment => treatment.id === id);
    if (index > -1) {
      const removedTreatment = this.selectedTreatments.splice(index, 1)[0];
      this.treatmentRemoved.emit(removedTreatment); // Emette l'evento con il trattamento rimosso
      this.cdRef.detectChanges(); // Forza l'aggiornamento del componente
    }
  }
}
