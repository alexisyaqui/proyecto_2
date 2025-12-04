import { apidjango } from '@/api/auth.axios';
import type { UsuarioData } from '@/modules/authentication';
import { isAxiosError } from 'axios';
import type { EditarUsuario } from '../interfaces';


interface EditarSuccess {
  ok: true;
  message: string;
  data?: EditarUsuario;
}

interface EditarError {
  ok: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const editarUsuarioAction = async (
  params: EditarUsuario,
): Promise<EditarSuccess | EditarError> => {


  try {
    const { id, nombre_usuario, nombres, apellidos, email, telefono } = params;

    const datosUsuario = {
      nombre_usuario, nombres, apellidos, email, telefono
    }

    const { data } = await apidjango.patch<EditarUsuario>(`/auth/usuario/detalle/${id}/`, datosUsuario);

    
    return {
      ok: true,
      message: 'Usuario editado con éxito',
      data
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      if(error.response.status === 400 && error.response.data.errors){
        return {
          ok: false,
          message: 'Error de validacion',
          errors: error.response.data.errors
        }
      }

      if(error.response.status === 401){
        return {
          ok: false,
          message: 'No estas autorizado para realizar esta accion'
        };
      }

      if(error.response.status === 401){
        return {
          ok: false,
          message: 'Usuario no encontrado'
        }
      }

      return {
        ok: false,
        message: error.response.data.message || 'Error al actualizar el usuario'
      }

    }

    return {
      ok: false,
      message: 'Error desconocido al actualizar el usuario'
    }
  }
};
