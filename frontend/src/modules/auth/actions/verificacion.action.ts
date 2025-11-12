import { apidjango } from "@/api/auth.axios"
import type { NuevaContrasenaData, OTP } from "../interfaces";
import { isAxiosError } from "axios";
import { useRoute } from "vue-router";


interface SuccessActions {
    ok: true;
    message: string;
}

interface ErrorActions {
    ok: false;
    message: string;
    errors: Record<string, string[]>
}


export const verificarOtpActions = async (email: string, codigo: Number): Promise<SuccessActions | ErrorActions> => {
    try {
        const { data } = await apidjango.post<OTP>('/verificar/otp/', { email, codigo })


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

    throw new Error('Error de servidor')
}


export const reenviarOtpActions = async (email: string): Promise<SuccessActions | ErrorActions> => {
    try {
        const { data } = await apidjango.post<OTP>('/reenviar/otp/', { email })

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


export const olvidarContrasenaAction = async (email: string): Promise<SuccessActions | ErrorActions> => {

    try {

        const { data } = await apidjango.post<OTP>('/olvidar-contrasena/', { email })

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


export const nuevaContrasenaAction = async (
    uidb64: string, 
    token: string, 
    new_password: string, 
    re_new_password: string): Promise<SuccessActions | ErrorActions> => {

    try {
        const { data } = await apidjango.post<NuevaContrasenaData>(`/reestablecer-contrasena/${uidb64}/${token}/`, {
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
            const {message, errors} = error.response.data

            return {
                ok: false,
                message: message,
                errors
            }
        }

    }
    throw new Error('Error del servidor')
}