export interface AuthResponse {
    message: string;
    data: {
        nombre_usuario: string;
        email: string;
        access: string;
        refresh: string;
    }
}

export interface Usuario {
    nombre_usuario: string;
    email: string;
}



//registro
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


//verificar otp 
export interface OTP{
    message: string;
    data: OtpData;
}


export interface OtpData {
    email: string;
    codigo: Number;
}


//cambiar contraseña
export interface NuevaContrasenaData {
    message: string;
    new_password: string;
    re_new_password: string;
    uidb64: string;
    token: string;
}