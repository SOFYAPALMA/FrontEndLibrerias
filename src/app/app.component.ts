import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { AuthService } from './Services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatCardModule,
      MatPaginatorModule,
      MatTableModule,
      MatButtonModule,
      MatSortModule,
      MatIconModule,
      MatSnackBarModule,
      MatDialogModule ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEndLibrerias'; 
  
  constructor(
      private router: Router,
      private dialog: MatDialog,
      private authService: AuthService,
      private snackBar: MatSnackBar
    ) { }
    
  logout() {

    console.log("Se cierra sesion");
    
    this.authService.logout(); // Llama el servicio de logout
    this.snackBar.open('Sesión cerrada correctamente', 'Cerrar', {
      duration: 3000
    });
    this.router.navigate(['/login']);
  }
}
