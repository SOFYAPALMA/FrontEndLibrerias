import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LibrosService } from '../../Services/libros.service';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Libros } from '../../Models/Libros';


@Component({
  selector: 'libros-inicio',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    RouterModule

  ],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {
  
  private librosService = inject(LibrosService);
  public listaLibros: MatTableDataSource<Libros> = new MatTableDataSource<Libros>();
  public displayedColumns: string[] = [

    'id',
    'nombre',
  ];
   
  submitted = false;
  loading = false;
  error = '';
  hide = true;  
  
  constructor(private router: Router){}

  ngOnInit(): void {
    this.listadoLibros();

    console.log('S1', this.listaLibros);
  }

  listadoLibros() {
    
    this.librosService.lista().subscribe({
      next: (res) => {
        console.log('S1', this.listaLibros);
        console.log(res);
        if (res && res.data) {
          this.listaLibros.data = res.data; 
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  Ir() {
    console.log("Ir");
    this.router.navigate(['/comentarios']);
  }

}
