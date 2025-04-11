import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ComentariosService } from '../../Services/comentarios.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  libroId!: number;

  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private comentariosService: ComentariosService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.libroId = parseInt(params.get('libroId') || '0');
    });

    console.log('mostrar id libro / autor:', this.libroId);

    this.authForm = this.formBuilder.group({
      comentarios: ['', Validators.required],
      idUsuario: parseInt(localStorage.getItem('id') || '0'),
      idLibro: this.libroId || 0,
    });
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.authForm.invalid) {
      this.error = 'Error en la creacion de nuevo comentario.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.comentariosService.nuevoComentario(this.authForm.value).subscribe({
      next: (response: any) => {
        console.log('Comentario creado exitosamente', response);
        this.router.navigate(['librosdetalle'], {
          queryParams: { id: this.libroId },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error?.message || 'Error al crear el comentario';
        this.loading = false;
      },
    });
  }
}
