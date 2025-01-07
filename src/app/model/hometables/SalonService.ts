import { Injectable } from "@angular/core";
import { SalonDetails } from "./SalonDetails";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { BarberDetails } from "./barberDetails";

@Injectable({
    providedIn: 'root'
})
export class SalonService {
    urlExtension = '/salon';
    constructor(private http: HttpClient){}
    getTopSalons():Observable<SalonDetails[]>{
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/bestSalons`)
    }
    getTopSalonsByCut():Observable<SalonDetails[]>{
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/bestSalons?type=1`)
    }
    getTopSalonsByBeard():Observable<SalonDetails[]>{
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/bestSalons?type=2`)
    }
    getSalons():Observable<SalonDetails[]>{
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`)
    }
    getSalonsByName(name: string): Observable<SalonDetails[]> {
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}?name=${name}`);
      }
    getSalonById(id: number):Observable<SalonDetails>{
        return this.http.get<SalonDetails>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}`);
    }  
    getBarbersBySalon(salonId: number):Observable<BarberDetails[]> {
        return this.http.get<BarberDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/${salonId}/barbers`);
      }
    getBarbersBySalonId(id: number):Observable<BarberDetails[]>{
        return this.http.get<BarberDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}/barbers`);
    }
}
