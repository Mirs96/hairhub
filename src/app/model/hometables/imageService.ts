import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class ImageService {
  private apiUrl = 'https://example.com/api/images'; // Cambia con il tuo URL API

  constructor(private http: HttpClient) {}

  getImages(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}