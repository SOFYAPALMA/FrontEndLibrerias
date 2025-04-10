import { Usuarios } from "./Usuarios";

export interface Comentarios{
    id : number;
    idUsuario :  number;
    idLibro : number;
    comentarios :  string;
    usuario: Usuarios;
}