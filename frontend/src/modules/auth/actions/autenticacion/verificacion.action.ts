import { apidjango } from "@/api/auth.axios"
import type { OTP } from "../../interfaces";
import { isAxiosError } from "axios";


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
        const { data } = await apidjango.post<OTP>('/auth/verificar/otp/', { email, codigo })


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
        const { data } = await apidjango.post<OTP>('/auth/reenviar/otp/', { email })

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


