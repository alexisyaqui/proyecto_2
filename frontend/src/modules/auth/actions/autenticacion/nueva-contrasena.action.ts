import { apidjango } from "@/api/auth.axios";
import { isAxiosError } from "axios";
import type { NuevaContrasenaData } from "../../interfaces";

interface SuccessActions {
    ok: true;
    message: string;
}

interface ErrorActions {
    ok: false;
    message: string;
    errors: Record<string, string[]>
}



export const nuevaContrasenaAction = async (
    uidb64: string,
    token: string,
    new_password: string,
    re_new_password: string): Promise<SuccessActions | ErrorActions> => {

    try {
        const { data } = await apidjango.post<NuevaContrasenaData>(`/auth/reestablecer-contrasena/${uidb64}/${token}/`, {
            uidb64,
            token,
            new_password,
            re_new_password
        })
        return {
            ok: true,
            message: data.message
        }


    } catch (error) {

        if (isAxiosError(error) && error.response?.data) {
            const { message, errors } = error.response.data

            return {
                ok: false,
                message: message,
                errors
            }
        }

    }
    throw new Error('Error del servidor')
}