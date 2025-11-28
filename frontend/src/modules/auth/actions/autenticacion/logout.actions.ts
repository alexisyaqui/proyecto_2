import { apidjango } from "@/api/auth.axios";
import { isAxiosError } from "axios";


export const LogoutActions = async (refresh: string): Promise<{ok: boolean; message: string}> => {
    try {
        console.log('👋 Ejecutando logout...')

        if(!refresh){
            console.warn('⚠️ No hay refresh token')
            return {
                'ok': true,
                message: 'Logout ejecutado localmente'
            }
        }

        const {data} = await apidjango.post('/auth/token-black-list/', {refresh: refresh} )

        console.log('✅ Logout exitoso')

        return {
            ok: data.ok,
            message: data.message || 'Sesion cerrada correctamente'
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response?.data){
            const {error: errormsg} = error.response.data

            return{
                ok: true,
                message: errormsg || 'Sesión cerrada localmente'

            }
        }
        
    }
    throw new Error('Error de conexion de servidor')
}