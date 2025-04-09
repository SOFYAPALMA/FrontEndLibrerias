
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { Router } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';           
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';  
import { AuthService } from '../../Services/login.service';
import { RespuestaAPI } from '../../Models/RespuestaAPI';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule 
  ],
})

export class LoginComponent implements OnInit {
  subscription: Subscription = new Subscription();
  authForm!: UntypedFormGroup;
 
  submitted = false;
  loading = false;
  error = '';
  hide = true;  


  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], 
    });
  }


  get f() { return this.authForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

   
    if (this.authForm.invalid) {
      this.error = 'Usuario y/o contraseña invalida';
      this.loading = false;
      return;
    } else {  
      this.authService.iniciarSesion(this.authForm.value).subscribe({
        next: (response: RespuestaAPI) => {
          if(response.success)
          {
            console.log('Login exitoso', response.data);
            localStorage.setItem('jwt', response.data.toString());
            this.router.navigate(['/libros']);
          }
          else
          {
            this.error = 'Usuario y/o contraseña incorrectos';
            this.loading = false;
          }
        },
        error: () => {
          this.error = 'Usuario y/o contraseña incorrectos';
          this.loading = false;
        }
      });   
    }
  }

  Ir() {
    console.log("Ir");
    this.router.navigate(['/libros']);
  }
}

