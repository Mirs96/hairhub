
import { Salon } from '../../model/hometables/Salon';
import { SalonService } from '../../model/hometables/SalonService';
import {MatGridListModule} from '@angular/material/grid-list';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SalonDetails } from '../../model/hometables/SalonDetails';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith, switchMap } from 'rxjs';
import {MatAutocompleteModule, MatOption} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-topsaloon',
  imports: [MatGridListModule,MatChipsModule,MatCardModule,MatProgressBarModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule,ReactiveFormsModule,AsyncPipe,FormsModule,MatOption],
  templateUrl: './topsalon.component.html',
  styleUrl: './topsalon.component.css'
})
export class TopsalonComponent implements OnInit {
  
  topSalon!: SalonDetails[];
  topSalonByCut!: SalonDetails[];
  topSalonByBeard!: SalonDetails[];
  control: FormControl<string | null | SalonDetails[]> = new FormControl('');
  salons!: SalonDetails[];
  filteredSalons!: Observable<SalonDetails[]>;

  constructor(private salonService : SalonService){}


  ngOnInit() {
    // Inizializza il filtro sui saloni
    this.filteredSalons = this.control.valueChanges.pipe(
      startWith(''), // Inizializza con una stringa vuota
      switchMap(value => {
        // Se non c'è valore (valore vuoto), ottieni tutti i saloni
        if (!value) {
          return this.salonService.getSalons();
        }
        // Se c'è un valore, ottieni i saloni filtrati
        return this.salonService.getSalonsByName((<string>value));
      }),
      map(salons => salons) // Passa direttamente i saloni ottenuti
    );

    // Carica gli altri saloni top
    this.salonService.getTopSalons().subscribe({
      next: ts => this.topSalon = ts,
      error: err => console.log(err)     
    });
    this.salonService.getTopSalonsByCut().subscribe({
      next: ts => this.topSalonByCut = ts,
      error: err => console.log(err)     
    });
    this.salonService.getTopSalonsByBeard().subscribe({
      next: ts => this.topSalonByBeard = ts,
      error: err => console.log(err)     
    });
  }

  // Metodo per il filtro
  private _filter(value: string): SalonDetails[] {
    const filterValue = this._normalizeValue(value); // normalizeValue trasforma la stringa in un formato semplcie (toglie gli spazi e la rende minuscola)
    return this.salons.filter(salon => this._normalizeValue(salon.name).includes(filterValue));
  }

  // Metodo per normalizzare il valore, rimuovendo gli spazi e convertendo in minuscolo
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, ''); 
  }

  displaySalonName(salon: SalonDetails): string {
    return salon ? salon.name : '';  // Restituisce il nome del salone
  }

  onSubmit(form: any) {
    if (this.control.valid) {
      const formValue = this.control.value;
      this.salonService.getSalonById((<SalonDetails[]>formValue)[0].id)
      console.log('Valore inserito:', formValue);

    } else {
      alert('Per favore inserisci un valore valido!');
    }
  }
  

}
