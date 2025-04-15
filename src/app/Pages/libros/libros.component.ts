import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LibrosService } from '../../Services/libros.service';
import { Libros } from '../../Models/Libros';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule 
  ],
  
  templateUrl:'./libros.component.html',
  styleUrl:'./libros.component.css',
})

export class LibrosComponent implements OnInit, AfterViewInit {
  
  private librosServicio = inject(LibrosService);
  public listaLibros: MatTableDataSource<Libros> = new MatTableDataSource<Libros>();
  public displayedColumns: string[] = [ 
    'nombre',
    'nombreAutor',
    'id'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  snackBar: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.obtenerLibros();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.listaLibros.paginator = this.paginator;
    }
    if (this.sort) {
      this.listaLibros.sort = this.sort;
    }
  }

  obtenerLibros() {
    
    this.librosServicio.lista().subscribe({
      next: (res) => {
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

  ver(name: string) {
    console.log('id', name);
    this.router.navigate(['librosdetalle'], { queryParams: {id: name } });
  }

    
}
