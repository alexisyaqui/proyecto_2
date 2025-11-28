import { apidjango } from "@/api/auth.axios"
import type { RegistroResponse} from "../../interfaces"
import { isAxiosError } from "axios";


export interface RegistroSuccess {
    ok: true;
    message: string;
}

export interface RegistroError {
    ok: false;
    message: string;
    errors?: Record<string, string[]>;
}


export const registroAction = async (
    nombre_usuario: string,
    nombres: string, 
    apellidos: string, 
    email: string, 
    telefono: string, 
    password: string, 
    password2: string): Promise<RegistroSuccess | RegistroError> => {
    try {
        const {data}  = await apidjango.post<RegistroResponse>('/auth/registro/', {
            nombre_usuario, nombres, apellidos, email, telefono, password, password2
        })
        return {
            ok: true,
            message:  data.message || 'Registro con exito'
        }
    } catch (error) {

        if(isAxiosError(error) && error.response?.data){

            const {message, errors} = error.response.data;


            return {
                ok: false,
                message: message || 'Error en el registro',
                errors,
            }
        }
    }
    return {
        ok: false,
        message: 'Error de conexion al servidor'
    }

}