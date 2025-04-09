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
  private apiUrl: string = appsettings.apiUrl + "/Usuarios/CrearUsuario";

  constructor() {}

  lista(){
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  // crear(objeto:Usuarios){
  //   return this.http.post<RespuestaAPI>(this.apiUrl.objeto);
  // }  
}

