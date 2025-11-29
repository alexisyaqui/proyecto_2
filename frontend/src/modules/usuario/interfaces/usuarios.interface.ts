import type { Usuario } from "../../authentication/interfaces/auth.interfaces";

export interface ListaUsuarios {
    links: Links;
    total_registros: number;
    total_paginas: number;
    resultados_por_pagina: number;
    resultados: Resultados;
}

export interface Links {
    next: null;
    previous: null;
}

export interface Resultados {
    message: string;
    data: UsuarioLista[];
}

export interface UsuarioLista {
    id: number;
    nombre_usuario: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    email: string;
    password: string;
    estado: boolean;
    last_login:string;
    fecha_creacion: string;            
    fecha_modificacion: string;
    fecha_eliminacion: string | null;
    admin: boolean;
    staff: boolean;

}
