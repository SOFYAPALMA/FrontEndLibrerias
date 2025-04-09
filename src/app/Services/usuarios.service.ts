import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Login } from '../Models/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7033';

  constructor(private httpClient: HttpClient) {
    console.log("ctr auth service");
  }

  iniciarSesion(usuario: Login): Observable<RespuestaAPI> {
    console.log(' auth 1', usuario);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return new Observable((subscriber) => {
      this.httpClient
        .post<RespuestaAPI>(
          this.API_URL +
            '/Validate?Email=' +
            usuario.correo +
            '&Clave=' +
            usuario.clave,
          {}
        )
        .subscribe((data) => {
          //some stuff
          console.log('auth service', data);
          subscriber.next(data);
        });
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    return of({ success: false });
  }
}

