import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { UsuariosService } from '../../Services/usuarios.service'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 

@Component({
  selector: 'usuarios-inicio',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  standalone: true,
  imports: [
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
  ],  
})

export class UsuariosComponent implements OnInit { 
  subscription: Subscription = new Subscription();
   
  submitted = false;
  loading = false;
  error = '';
  hide = true;  
  authForm!: UntypedFormGroup;
  successMessage = '';
  
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private usuariosService: UsuariosService,   
    ){}

  ngOnInit(): void { 
    this.authForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],      
    });  
  }

  get f() { return this.authForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    this.successMessage = '';

   
    if (this.authForm.invalid) {
      this.error = 'Error en la creacion de nuevo usuario';
      this.loading = false;
      this.successMessage = 'Usuario creado con éxito';
      return;
    } else {  
      this.usuariosService.nuevoUsuario(this.authForm.value).subscribe({
        next: (response: any) => {
       
          this.router.navigate(['login']);
        },
        error: () => {
          this.error = 'Error al crear nuevo usuario';
          this.loading = false;
        }
      });   
    }
  }

  Guardar() {
    console.log("Guardar");
    this.router.navigate(['Login']);
  } 

}
