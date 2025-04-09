import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LibrosService } from '../../Services/libros.service';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Usuarios } from '../../Models/Usuarios';
import { UsuariosService } from '../../Services/usuarios.service';


@Component({
  selector: 'usuarios-inicio',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    RouterModule

  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  
  private usuariosService = inject(UsuariosService);
  public listaUsuarios: MatTableDataSource<Usuarios> = new MatTableDataSource<Usuarios>();
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

    console.log('S1', this.listaUsuarios);
  }

  listadoLibros() {
    
    this.usuariosService.lista().subscribe({
      next: (res) => {
        console.log('S1', this.listaUsuarios);
        console.log(res);
        if (res && res.data) {
          this.listaUsuarios.data = res.data; 
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
