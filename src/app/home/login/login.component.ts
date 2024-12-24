import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../model/authService';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showOverlay:boolean = false;
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  onSubmit() {
    console.log("onSubmit");
    this.authService.login(this.loginForm.value).subscribe({
      next: r => { //token
        //andiamo a inserire nel local storage il token
        //var globale che esiste perchè lavoriamo con un browser come document o window
        //funziona come una mappa, chiavi e valori sono stringhe
        localStorage.setItem('jwtToken', r.token); //setta il token (r = ogg response)
        this.router.navigate(['/home']); //andiamo nella pagina
      },
      error: err => alert('login failed.')
    }); 
  }
// Aggiungi una funzione per mostrare l'overlay se necessario
openOverlay(): void {
  this.showOverlay = true; // Mostra l'overlay
}

// Aggiungi una funzione per nascondere l'overlay manualmente, se necessario
closeOverlay(): void {
  this.showOverlay = false; // Nascondi l'overlay
}

}
