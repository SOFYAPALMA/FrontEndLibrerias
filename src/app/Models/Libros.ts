import { Autores } from "./Autores";
import { Comentarios } from "./Comentarios";

export interface Libros{
    id : number;
    nombre :  string;
    categoria : string;
    descripcion :  string;
    idAutor : number;
    nombreautor: string;
    comentarios: Comentarios[];
}