import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AutoresComponent } from './Pages/autores/autores.component';
import { LibrosComponent } from './Pages/libros/libros.component';
import { UsuariosComponent } from './Pages/usuarios/usuarios.component';
import { LoginComponent } from './Pages/login/login.component';
import { ComentariosnComponent } from './Pages/comentarios/comentariosn.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },    
  { path: '', canActivate: [AuthGuard], component: LibrosComponent },
  { path: 'libros', canActivate: [AuthGuard], component: LibrosComponent },
  { path: 'usuarios', canActivate: [AuthGuard], component: UsuariosComponent },
  { path: 'comentarios', canActivate: [AuthGuard], component: ComentariosnComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'libros/:id',
    canActivate: [AuthGuard],
    component: LibrosComponent,
  },
];
