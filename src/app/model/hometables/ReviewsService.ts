import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { ReviewDetails } from "./ReviewsDetail";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService{
    urlExtension = '/review';
    constructor(private http: HttpClient){}
        getReviewsByAppointment(id:Number):Observable<ReviewDetails[]>{
            return this.http.get<ReviewDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}/reviews`);
        }

        createReview(review: ReviewDetails) : Observable<ReviewDetails>{
            const headers = new HttpHeaders().set('Content-Type', 'application/json'); //il corpo della richiesta sarà in jSon
            return this.http.post<ReviewDetails>(`${HttpConfig.apiUrl}${this.urlExtension}`, review,{headers});

        }
}