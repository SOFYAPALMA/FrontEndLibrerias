import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Libros } from '../Models/Libros';

@Injectable({
  providedIn: 'root',
})
export class LibrosDetalleService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Libros/ConsultarLibroId';

  constructor() {}

  id() {
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }

  obtener(id: string) {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}?id=${id}`);
  }

}
