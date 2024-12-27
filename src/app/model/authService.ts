import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HttpConfig } from "../config/http-config";

import { LoginDto } from "./hometables/login-dto";
import { TokenResponse } from "./hometables/token-response";
import { RegisterDto } from "./hometables/register-dto";
import { UserProfile } from "./hometables/userProfile";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    urlExtension = '/auth';
    constructor(private http:HttpClient) {}

    login(login:LoginDto):Observable<TokenResponse> { //ritornerà il token per il login
        const headers = new HttpHeaders({
            'Content-Type':'application/json'
        }); //settare il giusto content type
        return this.http.post<TokenResponse>(`${HttpConfig.apiUrl}${this.urlExtension}/login`, login, {headers});
    }
    register(register:RegisterDto): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${HttpConfig.apiUrl}${this.urlExtension}/register`,register);
    }
   
}
