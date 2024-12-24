import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../model/authService';
import { MatDialogRef } from '@angular/material/dialog'; // Aggiungi questo import per chiudere il dialog

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent> // Riferimento per chiudere il dialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (r) => {
        localStorage.setItem('jwtToken', r.token); // Imposta il token
        this.router.navigate(['/home']); // Vai alla home
        this.dialogRef.close(); // Chiude il dialog
      },
      error: (err) => alert('Login fallito.')
    }); 
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Puoi aggiungere altre funzioni per aprire/chiudere overlay se necessario
}
