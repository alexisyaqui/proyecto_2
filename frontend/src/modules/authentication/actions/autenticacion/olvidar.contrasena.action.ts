import { apidjango } from "@/api/auth.axios";
import { isAxiosError } from "axios";
import type { OTP } from "../../interfaces";

interface SuccessActions {
    ok: true;
    message: string;
}

interface ErrorActions {
    ok: false;
    message: string;
    errors: Record<string, string[]>
}




export const olvidarContrasenaAction = async (email: string): Promise<SuccessActions | ErrorActions> => {

    try {

        const { data } = await apidjango.post<OTP>('/auth/olvidar-contrasena/', { email })

        return {
            ok: true,
            message: data.message
        }

    } catch (error) {
        if (isAxiosError(error) && error.response?.data) {
            const { message, errors } = error.response.data

            return {
                ok: false,
                message: message || 'Revise sus credenciales',
                errors: {email: ["Este correo no existe"]}
            }
        }

    }

    throw new Error('Error de conexion al servidor')

}

