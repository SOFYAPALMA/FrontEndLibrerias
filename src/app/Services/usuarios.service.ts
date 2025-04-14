import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Login } from '../Models/Login';
import { Usuarios } from '../Models/Usuarios';
import { appsettings } from '../Settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Usuarios";

  constructor(private httpClient: HttpClient) {}

  lista(){
    console.log(this.apiUrl);
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }

  getUsuarios() {
    console.log('S2',this.apiUrl + '/ConsultarUsuarios');
    return this.http.get<Usuarios>(this.apiUrl + '/ConsultarUsuarios');
  }

  nuevoUsuario(value: Usuarios) : Observable<RespuestaAPI> {
    console.log(' nuevo 1', value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return new Observable((subscriber) => {
      this.httpClient
        .post<RespuestaAPI>(
          this.apiUrl + '/CrearUsuario',
           value 
        )
        .subscribe((data: RespuestaAPI) => {
          
          console.log('user service', data);
          subscriber.next(data);
        });
    });
  }

  salir(): void {
    // Eliminar token/localStorage/sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}

