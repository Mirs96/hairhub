import { Injectable } from "@angular/core";
import { SalonDetails } from "./SalonDetails";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";

@Injectable({
    providedIn: 'root'
})
export class SalonService {
    urlExtension = '/salon';
    constructor(private http: HttpClient){}
    getTopSalons():Observable<SalonDetails[]>{
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`)
    }
    getTopSalonsByCut():Observable<SalonDetails[]>{
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}?type=1`)
    }
    getTopSalonsByBeard():Observable<SalonDetails[]>{
        return this.http.get<SalonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}?type=2`)
    }
}
