import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../config/http-config';
import { AppointmentDto } from '../hometables/AppointmentDto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private urlExtension= '/appointment';

  constructor(private http:HttpClient){}

  getAvailableDates(barberId: number,bookingMonths: number, numberOfTreatments: number): Observable<any> {
    let params = new HttpParams()
    .set('bookingMonths', bookingMonths)
    .set('numberOfTreatments', numberOfTreatments);
  
  return this.http.get(`${HttpConfig.apiUrl}/${this.urlExtension}/${barberId}/available-dates`, { params });
}

getAvailableTimes(barberId: number, date: string, numberOfTreatments: number): Observable<any> {
  let params = new HttpParams()
    .set('date', date)
    .set('numberOfTreatments', numberOfTreatments);

    return this.http.get(`${HttpConfig.apiUrl}/${this.urlExtension}/${barberId}/available-times`, { params });
}

createAppointment(appointmentDto: AppointmentDto): Observable<any>{
  const headers = new HttpHeaders().set('Content-Type', 'application/json'); //il corpo della richiesta sarà in jSon
  return this.http.post(`${HttpConfig.apiUrl}/${this.urlExtension}`,{headers});

}

}
