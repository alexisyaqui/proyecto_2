import { apidjango } from "@/api/auth.axios"
import type { UsuarioLista } from "../../interfaces"



export const editarUsuarioAction = async () => {
    try {
        const {data} = await apidjango.put<UsuarioLista>('/usuario/detalle/', {id})


        return data
    } catch (error) {
        
    }
}