import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../model/authService';
import { Router } from '@angular/router';

import { RegisterDto } from '../model/hometables/register-dto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

 constructor(private fb:FormBuilder, private authService:AuthService, private router:Router){}
  ngOnInit(): void {
   this.registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(10)]], // Regex per il numero di telefono
      role: ['', [Validators.required]] // Il campo del ruolo, puoi usare un campo a discesa (select) se necessario
   });
  }

  onSubmit(): void {
    if(this.registerForm.valid){
      const formData: RegisterDto = this.registerForm.value;
      console.log('Dati di registrazione:', formData);

      this.authService.register(formData).subscribe({
        next: response => {
          console.log('Registrazione riuscita',response);
          localStorage.setItem('jwtToken', response.token);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.log(err);
          alert('Registrazione fallita, riprova');
        }
      });
    }else {
        console.log('Form non valido');
      }
  }
}
