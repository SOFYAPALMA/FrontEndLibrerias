import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Libros } from '../Models/Libros';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
    private http = inject(HttpClient);
    private apiUrl: string = appsettings.apiUrl + "Libros/ConsultarLibros";

  constructor() { }

    lista(){  
      return this.http.get<RespuestaAPI>(this.apiUrl);
    }

    obtener(id:number){
      return this.http.get<RespuestaAPI>(`${this.apiUrl}/${id}`);
    }
  
    getLibros() {
      return this.http.get<Libros>(this.apiUrl);
    }
  }
