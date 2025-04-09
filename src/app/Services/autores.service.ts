import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Autores } from '../Models/Autores';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/Autor/ConsultarAutores";

  constructor() { }

  lista(){
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  getAutores() {
    return this.http.get<Autores>(this.apiUrl);
  }
}
