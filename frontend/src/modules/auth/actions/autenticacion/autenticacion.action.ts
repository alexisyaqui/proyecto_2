import { apidjango } from "@/api/auth.axios"
import { isAxiosError } from "axios";
import type { AuthResponse, Usuario } from "../../interfaces";


interface ActionSuccess {
    ok: true;
    message: string;
    usuario: Usuario;
    access: string,
    refresh: string
}


interface ActionError {
    ok: false;
    message: string;
    errors: Record<string, string[]>
}

export const estadoAutenticacionAction = async (): Promise<ActionSuccess | ActionError> => {
    try {

        const { data } = await apidjango.get<AuthResponse>('/auth/autenticacion/')

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
        if (isAxiosError(error) && error.response?.status === 401) {
            const { message, errors } = error.response.data

            return {
                ok: false,
                message: message ?? 'Error de autenticacion',
                errors: errors ?? {}
            }
        }
        if (isAxiosError(error)) {
            return {
                ok: false,
                message: 'Error de conexion con el servidor',
                errors: { detail: ['No se pudo conectar con el servidor'] }
            }
        }
        return {
            ok: false,
            message: 'Error del servidor',
            errors: {}
        }


    }

}


