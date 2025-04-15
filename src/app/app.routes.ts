import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LibrosComponent } from './Pages/libros/libros.component';
import { UsuariosComponent } from './Pages/usuarios/usuarios.component';
import { LoginComponent } from './Pages/login/login.component';
import { ComentariosComponent } from './Pages/comentarios/comentarios.component';
import { LibrosDetalleComponent } from './Pages/librosdetalle/librosdetalle.component';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },    
  //{ path: '', canActivate: [AuthGuard], component: LibrosComponent },
  { path: 'libros', canActivate: [AuthGuard], component: LibrosComponent },
  { path: 'librosdetalle', canActivate: [AuthGuard], component: LibrosDetalleComponent },
  { path: 'usuarios', canActivate: [AuthGuard], component: UsuariosComponent },
  { path: 'comentarios', canActivate: [AuthGuard], component: ComentariosComponent },
  { 
    path: 'comentarios/:libroId/:autorId', 
    component: ComentariosComponent 
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'libros/:id',
    canActivate: [AuthGuard],
    component: LibrosComponent,
  },

];
