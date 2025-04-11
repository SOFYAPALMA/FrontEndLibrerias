import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LibrosDetalleService } from '../../Services/librosdetalle.service';
import { Libros } from '../../Models/Libros';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Comentarios } from '../../Models/Comentarios';

@Component({
  selector: 'app-librosdetalle',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    CommonModule,    
    //MatPaginator,
  ],

  templateUrl: './librosdetalle.component.html',
  styleUrl: './librosdetalle.component.css',
})
export class LibrosDetalleComponent implements OnInit {
  private librosdetalleServicio = inject(LibrosDetalleService);
  public librosid: Libros | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  libros: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID obtenido:', id);
      if (id) {
        this.obtenerLibroid(id);
      } else {
        console.log('ID no encontrado');
      }
    });
  }

  obtenerLibroid(id: string) {
    this.librosdetalleServicio.obtener(id).subscribe({
      next: (res) => {
        console.log('Respuesta API:', res);
        console.log('Respuesta API 2:', res.data);

        if (res.success) {
          this.librosid = this.parseToLibro(res.data);
          console.log('Respuesta 2:', this.librosid);
        } else {
          console.log('S2 Libro no encontrado');
      }
    },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  parseToLibro(data: any): Libros {
    return {
      id: +data.id,
      nombre: data.nombre || 'Sin título',
      categoria: data.categoria || 'Sin categoría',
      descripcion: data.descripcion || 'Sin descripción',
      nombreautor: data.nombreAutor || 'Autor desconocido',
      idAutor: data.idAutor,
      comentarios: data.comentarios 
    };
  }

  ver(id: number) {
    this.router.navigate(['comentarios'], { queryParams: { id: id ?? '0'  } });
  }

  retornar() {
    this.router.navigate(['libros'], { queryParams: { 
    } });
  }

  onSubmit() {
    if (this.libros.valid) {
      console.log(this.libros.value);
    }
  }
  verComentarios(libroId: number, autorId: number) {
    this.router.navigate(['comentarios', { libroId, autorId }]);
  }
  
  nuevoComentario() {
    if (this.librosid?.id) {
    this.router.navigate(['comentarios'], { 
      queryParams: { 
        libroId: this.librosid.id,
        idAutor: this.librosid.idAutor 
      }
    });
  } else {
    console.error('No se pudo obtener el ID del libro');
  }
}
}
