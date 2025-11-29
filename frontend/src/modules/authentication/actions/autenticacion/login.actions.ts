import { apidjango } from '@/api/auth.axios';
import type { AuthResponse, Usuario } from '../../interfaces';
import { isAxiosError } from 'axios';


interface ActionSuccess {
    ok: true;
    message: string;
    usuario: Usuario;
    access: string,
    refresh: string
}


interface ActionError {
    ok: false,
    message: string;
    errors: Record<string, string[]>
}


export const loginAction = async (email: string, password: string): Promise<ActionError | ActionSuccess> => {
    try {
        
        const {data} = await apidjango.post<AuthResponse>('/auth/login/', {email, password})


        return {
            ok: true,
            message: data.message,
            usuario: {
                nombre_usuario: data.data.nombre_usuario,
                email: data.data.email
                
            },
            access: data.data.access,
            refresh: data.data.refresh
        }

    } catch (error) {

        if(isAxiosError(error) && error.response?.data){
             const {message, errors} = error.response?.data

             return {
                ok: false,
                message: message || 'Revise sus credenciales',
                errors: errors || {}
             }
        }
    }

    return {
        ok: false,
        message: 'Error del servidor',
        errors: {}
    }
}
