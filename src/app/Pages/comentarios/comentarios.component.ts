import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Autores } from '../../Models/Autores';
import { ComentariosService } from '../../Services/comentarios.service';
import { AutoresService } from '../../Services/autores.service';
import { Libros } from '../../Models/Libros';
import { LibrosService } from '../../Services/libros.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
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
export class ComentariosComponent implements OnInit {
  subscription: Subscription = new Subscription();
  authForm!: UntypedFormGroup;

  submitted = false;
  loading = false;
  error = '';
  hide = true;
  autores: Autores[] = [];
  libros: Libros[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private comentariosService: ComentariosService,
    private autoresService: AutoresService,
    private librosService: LibrosService
    
  ) {}

  ngOnInit() {
    this.getAutores();

    this.authForm = this.formBuilder.group({     
      comentarios: ['', Validators.required],
  
    });    
  }

  get f() { return this.authForm.controls; }

  getAutores() {
    this.autoresService.getAutores().subscribe({
      next: (result: any) => {
        console.log('S3', result);
        if (result.success) {
          this.autores = result.data;
          console.log('S5', this.autores);
        } else {
          console.error('Error al cargar los autores:', result.message);
        }
      },
      error: (error: any) => {
        console.error('Error al obtener los datos de autores:', error);
      },
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'Error en la creacion de nuevo comentario.';
      this.loading = false;
      return;
    } else {
      this.comentariosService.obtener(this.authForm.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['/librosdetalle']);
        },
        error: () => {
          this.error = 'Error al crear el producto';
          this.loading = false;
        },
      });
    }
  }

  nuevo() {
    this.router.navigate(['/comentarios']);
  }

  Guardar() {
    console.log('Guardar');
    this.router.navigate(['/librosdetalle']);
  }
}
