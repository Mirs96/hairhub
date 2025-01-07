
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentsPriceService } from '../../../model/hometables/TreatmentsPricesService';
import { TreatmentsPriceDetails } from '../../../model/hometables/TreatmentsPricesDetails';


@Component({
  selector: 'app-select-service',
  imports: [MatListModule, MatDividerModule],
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectServiceComponent implements OnInit { 
    salonsPricesAndTreatments!: TreatmentsPriceDetails[];
    selectedTreatments: TreatmentsPriceDetails[] = [];
    
    

    constructor(private treatmentsPricesService : TreatmentsPriceService, private route: ActivatedRoute,private cdr: ChangeDetectorRef){};

  ngOnInit(): void {
    var id = Number(this.route.snapshot.paramMap.get("id"));
    console.log(id);
    this.treatmentsPricesService.getSalonsTreatmentsPrices(id).subscribe({
      next: ts => {this.salonsPricesAndTreatments = ts; this.cdr.detectChanges();},
      error: err => console.log(err),
    });
    
  }

  @Output()
   addTreatment = new EventEmitter<TreatmentsPriceDetails>();

  addToCheckout(treatment: TreatmentsPriceDetails) {
      this.addTreatment.emit(treatment); // Emette l'evento solo per i nuovi trattamenti
  }

}
