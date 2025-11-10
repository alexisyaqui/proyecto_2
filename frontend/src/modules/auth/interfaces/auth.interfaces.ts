export interface UsuarioInterface {
    email: string;
    password: string;
    nombre_usuario: string,
    get_full_name: string,
    access: string;
    refresh: string;
}

export interface RegistroResponse {
    message: string;
    data: UsuarioData;
}


export interface UsuarioData {
        nombre_usuario: string;
        nombres: string;
        apellidos: string;
        telefono: string;
        email: string;
        password: string;
        password2: string;
        estado: boolean;
        roles: Roles;
        metadata?: Metadata,
}

export interface Roles {
    admin: boolean;
    staff: boolean;
    [key: string]: boolean;
}


export interface Metadata {
    createdAt?: string;
    updatedAt?: string;
    lastLogin?: string;
}

export interface OTP{
    message: string;
    data: OtpData;
}


export interface OtpData {
    email: string;
    codigo: Number;
}


