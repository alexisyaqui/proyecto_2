import { apidjango } from '@/api/auth.axios';
import { isAxiosError } from 'axios';

interface EliminarSuccess {
  ok: true;
  message: string;
}

interface EliminarError {
  ok: false;
  message: string;
}

export const eliminarUsuarioAction = async (
  id: number,
): Promise<EliminarSuccess | EliminarError> => {
  try {
    const { data } = await apidjango.patch(`/auth/usuario/detalle/${id}/`, {
      estado: false,
      fecha_eliminacion: new Date().toISOString,
    });

    return {
      ok: true,
      message: 'Usuario eliminado correctamente',

    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        ok: false,
        message: error.response?.data.message || 'Error al eliminar el usuario',
      };
    }
  }
  throw new Error('Error desconocido');
};
