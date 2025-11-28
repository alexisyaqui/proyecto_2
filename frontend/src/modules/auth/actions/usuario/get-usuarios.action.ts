import { apidjango } from "@/api/auth.axios"
import type { ListaUsuarios } from "../../interfaces"
import { isAxiosError } from "axios";





export const getUsuarioActivosAction = async ({ next, previous }: { next: number, previous: number }) => {
    try {
        const offset = (next - 1) * previous;

        const { data } = await apidjango.get<ListaUsuarios>(`/auth/usuario/activos/?limit=${next}&offset=${offset}`,
        )





        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const resp = error.response?.data

            if (error.response?.status === 401 && resp?.code === 'Token invalido') {
                const detail = resp?.detail
                const msg = resp?.messages?.[0]?.message
                throw new Error(detail || msg || 'Sesion expirada, por favor inicia sesion nuevamente')
            }
            throw new Error(resp.message || resp.detail || 'Error en la petición')
        }
        throw new Error('Error desconocido')
    }



}

export const getUsuariosEditarAction = async () => {
    try {
        const { data } = await apidjango.put('usuario/detalle/')
    } catch (error) {
    }
}