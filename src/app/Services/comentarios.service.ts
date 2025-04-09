import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Comentarios } from '../Models/Comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private http = inject(HttpClient);
    private apiUrl: string = appsettings.apiUrl + "/Comentarios/ConsultarComentario";

  constructor() { }

  lista(){
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  eliminar(id:number){
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  getComentarios() {
    return this.http.get<Comentarios>(this.apiUrl);
  }
}
