import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SelectServiceComponent } from '../../components/select-service/select-service.component';
import { CheckoutTableComponent } from '../../components/checkout-table/checkout-table.component';
import { TreatmentsPriceDetails } from '../../../model/hometables/TreatmentsPricesDetails';


@Component({
  selector: 'app-main-salon',
  imports: [RouterLink, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatIconModule, SelectServiceComponent,CheckoutTableComponent],
  templateUrl: './main-salon.component.html',
  styleUrl: './main-salon.component.css'
  
})
export class MainSalonComponent {
   selectedTreatments: TreatmentsPriceDetails[] = [];

   @Output()
   addTreatment = new EventEmitter<TreatmentsPriceDetails>();

  constructor(private cdRef: ChangeDetectorRef) {}

  addToCheckout(treatment: TreatmentsPriceDetails): void {
    // Verifica se il trattamento è già stato selezionato
    const alreadySelected = this.selectedTreatments.find(
      (selected) => selected.id === treatment.id
    );

    if (!alreadySelected) {
      this.selectedTreatments.push(treatment);  // Aggiungi solo se non è già selezionato
      this.addTreatment.emit(treatment);        // Emette l'evento solo per i nuovi trattamenti
    } else {
      console.log('Trattamento già selezionato:', treatment.name);
    }
  }

  removeTreatmentFromMain(treatment: TreatmentsPriceDetails): void {
    // Rimuove il trattamento anche dall'array selectedTreatments in MainSalonComponent
    const index = this.selectedTreatments.findIndex(
      (t) => t.id === treatment.id
    );
    if (index > -1) {
      this.selectedTreatments.splice(index, 1);
    }
  }
}
