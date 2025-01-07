import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { ReviewsDetail } from "./ReviewsDetail";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService{
    urlExtension = '/review';
    constructor(private http: HttpClient){}
        getReviewsByAppointment(id:Number):Observable<ReviewsDetail[]>{
            return this.http.get<ReviewsDetail[]>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}/review`);
        }
}