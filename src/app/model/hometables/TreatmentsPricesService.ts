import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { TreatmentsPriceDetails } from "./TreatmentsPricesDetails";


@Injectable({
    providedIn: 'root'
})
export class TreatmentsPriceService {
    urlExtension = '/salon';
    constructor(private http: HttpClient){}
    getSalonsTreatmentsPrices(id:Number):Observable<TreatmentsPriceDetails[]>{
        return this.http.get<TreatmentsPriceDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}/treatments`);
    }
}