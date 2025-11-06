import { apidjango } from "@/api/auth.axios";

export interface RegisterResponse {
    ok: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

export const registroAction = async (
    nombre_usuario: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    email: string,
    password: string,
    password2: string
): Promise<RegisterResponse> => {
    try {
        const response = await apidjango.post('/usuario/registro/', {
            nombre_usuario,
            nombres,
            apellidos,
            telefono,
            email,
            password,
            password2,
        });

        // Suponiendo que tu DRF devuelve status 201 o 200 y un cuerpo con `message`
        return {
            ok: true,
            message: response.data.message || 'Registro exitoso',
        };
    } catch (error: any) {
        let errors: Record<string, string[]> | undefined;
        let message = 'Error al registrar el usuario';

        if (error.response?.status === 400 && error.response.data) {
            // Manejo de errores de validación de DRF (ej: {"email": ["ya existe"]})
            errors = error.response.data;
            // Extraer un mensaje general (opcional)
            message = 'Por favor, corrige los errores del formulario';
        } else if (error.response?.data?.message) {
            message = error.response.data.message;
        } else if (error.message) {
            message = error.message;
        }

        return {
            ok: false,
            message,
            errors,
        };
    }
};