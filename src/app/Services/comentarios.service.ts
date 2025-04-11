import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Comentarios } from '../Models/Comentarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Comentarios/';

  constructor(private httpClient: HttpClient) {}

  lista() {
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }

  obtener(id: number) {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  nuevoComentario(value: Comentarios): Observable<RespuestaAPI> {
    return this.httpClient.post<RespuestaAPI>(
      `${this.apiUrl}CrearComentario`,
      value,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  eliminar(id: number) {
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }

  getComentarios() {
    return this.http.get<Comentarios>(this.apiUrl);
  }
}
