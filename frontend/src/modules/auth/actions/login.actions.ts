import { apidjango } from '@/api/auth.axios';
import type { UsuarioInterface } from '../interfaces';
import { isAxiosError } from 'axios';

interface LoginError {
    ok: false;
    message: string;
}

interface LoginSuccess {
    ok: true;
    usuario: UsuarioInterface;
    access: string;
    message: string;
}

interface LoginResponseData {
    access: string;
    refresh: string;
    nombre_usuario: string;
    email: string
}

interface LoginResponse {
    message: string;
    data: LoginResponseData
}


interface BackendError {
    error: string;
    detalle: string;
}


export const loginAction = async (email: string, password: string): Promise<LoginError | LoginSuccess> => {
    try {
        const response = await apidjango.post<LoginResponse>('/login/', { email, password, });

        const { access, refresh, nombre_usuario, email: userEmail } = response.data.data

        console.log(response.data.data)

        const usuario: UsuarioInterface = {
            email: userEmail,
            nombre_usuario,
            get_full_name: nombre_usuario,
            access,
            refresh,
            password: ''
        }

        return {
            ok: true,
            usuario,
            access,
            message: response.data.message || 'Inicio de sesion exitoso'
        };

    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {

            const data = error.response.data as BackendError

            const message = [data.error, data.detalle].filter(Boolean).join(' | ')


            return {
                ok: false,
                message: message || 'Error desconocido'
            };
        }


        return {
            ok: false,
            message: 'No se pudo realizar la peticion'
        }
    }
};


