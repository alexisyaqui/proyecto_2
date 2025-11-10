import { apidjango } from "@/api/auth.axios"
import type { OTP } from "../interfaces";
import { isAxiosError } from "axios";

interface OtpSuccess {
    ok: true;
    message: string;
}

interface OtpError {
    ok: false;
    message: string;
    errors: Record<string, string[]>
}


export const verificarOtpActions = async (email: string, codigo: Number): Promise<OtpSuccess | OtpError> => {
    try {
        const {data} = await apidjango.post<OTP>('/verificar/otp/', { email, codigo})
        

        return {
            ok: true,
            message: data.message
        }

 
    } catch (error) {
        if(isAxiosError(error) && error.response?.data){
            const {message, errors} = error.response.data

            return {
                ok: false,
                message: message,
                errors
            }

        }
        
    }

    throw new Error('Error de servidor')
}


export const reenviarOtpActions = async(email: string): Promise<OtpSuccess | OtpError> => {
    try {
        const {data} = await apidjango.post('/reenviar/otp/' , {email})

        return {
            ok: true,
            message: data.message
        }


    } catch (error) {

        if(isAxiosError(error) && error.response?.data){
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