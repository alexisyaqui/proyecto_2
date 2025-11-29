import { defineStore } from "pinia";
import type { Usuario, } from "../interfaces";
import { AuthStatus } from "../interfaces";
import { computed, ref } from "vue";
import router from "@/router";

import { useLocalStorage } from "@vueuse/core";
import { estadoAutenticacionAction, loginAction, LogoutActions, nuevaContrasenaAction, olvidarContrasenaAction, registroAction } from "../actions";
import { reenviarOtpActions, verificarOtpActions } from "../actions/autenticacion/verificacion.action";





export const useAuthstore = defineStore('auth', () => {

    //authenticated, unAuthenticated, checking
    const authStatus = ref<AuthStatus>(AuthStatus.Checking);
    const usuario = useLocalStorage<Usuario | null>('usuario', null, {
        serializer: {
            read: (v) => (v ? JSON.parse(v) : null),
            write: (v) => JSON.stringify(v),
        }
    })
    const email = useLocalStorage('email', '')
    const access = useLocalStorage('access', '');
    const refresh = useLocalStorage('refresh', '');



    //HELPERS 

    const decodificarToken = (token: string): Record<string, any> | null => {
        try {
            const parts = token.split('.');

            if (parts.length !== 3) {
                console.warn('❌ Token inválido: estructura incorrecta');
                return null;
            }

            if (!parts[1]) {
                console.warn('❌ Token inválido: payload vacío');
                return null
            }
            const payload = JSON.parse(atob(parts[1]));
            return payload
        } catch (error) {
            console.error('Erro al decodificar el token: ', error)
            return null;

        }
    };



    //getters
    const isTokenExpirado = computed((): boolean => {
        if (!access.value) {
            console.log('No hay token')
            return true
        }
        try {
            const partesToken = access.value.split('.')
            if (partesToken.length !== 3) {
                return true
            }


            const payload = decodificarToken(access.value)
            if (!payload || !payload.exp) {
                console.log('Token sin exp')
                return true
            }
            const ahora = Math.floor(Date.now() / 1000)
            const expirado = ahora > payload.exp;

            console.log(`⏱️ Token ${expirado ? 'EXPIRADO' : 'válido'}`);

            return expirado

        } catch (error) {
            return true
        }
    })

    /**
   * Verifica si el token está próximo a expirar (menos de 5 minutos)
   */

    const tokenProxExpiracion = computed((): boolean => {
        if (!access.value) return false

        try {
            const partesToken = access.value.split('.')
            const payload = decodificarToken(access.value)
            if (!payload || !payload.exp) {
                return false
            }

            const ahora = Math.floor(Date.now() / 1000)
            const tiempoRestante = payload.exp - ahora

            console.log(`⏱️ Token expira en: ${tiempoRestante}s`);

            return tiempoRestante < 300 // 5 minutos
        } catch (error) {
            return false


        }
    })

    const isChecking = computed(() => authStatus.value === AuthStatus.Checking);

    const isAuthenticated = computed(() => {
        const autenticado = authStatus.value === AuthStatus.Authenticated && !!access.value && !isTokenExpirado.value



        return autenticado
    })

    const userEmail = computed(() => email.value)

    const limpiarToken = () => {
        console.log('Limpiando tokens....');
        
        access.value = '';
        refresh.value = '';
        usuario.value = null;
        email.value = '';
        authStatus.value = AuthStatus.Unauthenticated;


        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('usuario')
        localStorage.removeItem('email')

        console.log('✅ Tokens limpiados');
       
    }

    //login
    const login = async (userEmail: string, password: string) => {
        try {

            const loginResp = await loginAction(userEmail, password);


            if (!loginResp.ok) {

                return {
                    success: false,
                    message: loginResp.message ?? 'Error desconocido',
                }
            }

            usuario.value = loginResp.usuario,
                access.value = String(loginResp.access ?? '')
            refresh.value = String(loginResp.refresh ?? '')
            email.value = loginResp.usuario.email
            authStatus.value = AuthStatus.Authenticated

            return {
                success: true,
                message: loginResp.message
            }

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'No se pudo conectar al servidor'
            await logout()
            await limpiarToken()
            return {
                success: false,
                message
            }
        }
    };

    //logout
    const logout = async () => {

        try {
            if (refresh.value) {

                await LogoutActions(refresh.value)
            }
        } catch (error) {
            console.warn('⚠️ No se pudo invalidar el refresh token en el servidor:', error);

        } finally {
            limpiarToken()


            if (router.currentRoute.value.name !== 'login') {
                await router.push(
                    {
                        name: 'login',
                    query: {reaseon: 'logout'}
                    });
            }

        }
    };

    const autenticacion = async () => {
        try {
            const result = await estadoAutenticacionAction()

            if (result.ok) {
                usuario.value = result.usuario;
                access.value = result.access;
                refresh.value = result.refresh;
                email.value = result.usuario.email;
                authStatus.value = AuthStatus.Authenticated;

                return result

            }
        } catch (error) {
            authStatus.value = AuthStatus.Unauthenticated
        }

        return {
            ok: false,
            message: 'No se pudo verificar la sesion',
            errors: { detail: ['Error de conexion'] }
        }
    }

    const registroStore = async (
        nombre_usuario: string,
        nombres: string,
        apellidos: string,
        email: string,
        telefono: string,
        password: string,
        password2: string) => {
        try {
            const registroResultado = await registroAction(nombre_usuario, nombres, apellidos, email, telefono, password, password2);

            if (!registroResultado.ok) {
                return {
                    ok: false,
                    message: registroResultado.message,
                    errors: registroResultado.errors
                }
            }

            return {
                ok: true,
                message: registroResultado.message
            }

        } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo conectar al servidor'

            return {
                ok: false,
                message
            }

        }
    }

    const verificarOtpResponse = async (email: string, codigo: Number) => {
        try {
            const resultadoOpt = await verificarOtpActions(email, codigo)

            if (!resultadoOpt.ok) {
                return {
                    ok: false,
                    message: resultadoOpt.message,
                    errors: resultadoOpt.errors
                }
            }

            return {
                ok: true,
                message: resultadoOpt.message,
            }

        } catch (error) {

            const message = error instanceof Error ? error.message : 'No se pudo conectar al sevidor'

            return {
                ok: false,
                message
            }

        }
    }

    const reenviarOtpResponse = async (email: string) => {
        try {
            const resultadoReenviarOtp = await reenviarOtpActions(email)

            if (!resultadoReenviarOtp.ok) {
                return {
                    ok: false,
                    message: resultadoReenviarOtp.message,
                    errors: resultadoReenviarOtp.errors
                }
            }

            return {
                ok: true,
                message: resultadoReenviarOtp.message
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo conectar al servidor'

            return {
                ok: false,
                message: message
            }
        }
    }

    const olvidarContrasenaResponse = async (email: string) => {
        try {
            const resultadoOlvidarContrasena = await olvidarContrasenaAction(email)

            if (!resultadoOlvidarContrasena.ok) {
                return {
                    ok: false,
                    message: resultadoOlvidarContrasena.message,
                    errors: resultadoOlvidarContrasena.errors
                }
            }

            return {
                ok: true,
                message: resultadoOlvidarContrasena.message
            }
        } catch (error) {

            const message = error instanceof Error ? error.message : 'No se pudo conectar al servidor'

            return {
                ok: false,
                message: message,

            }

        }
    }

    const nuevaContrasenaResponse = async (
        uidb64: string,
        token: string,
        new_password: string,
        re_new_password: string,

    ) => {
        try {
            const resultadoNuevaContrasena = await nuevaContrasenaAction(uidb64, token, new_password, re_new_password)
            if (!resultadoNuevaContrasena.ok) {
                return {
                    ok: false,
                    message: resultadoNuevaContrasena.message,
                    errors: resultadoNuevaContrasena.errors
                }
            }

            return {
                ok: true,
                message: resultadoNuevaContrasena.message
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo conectar al servidor'

            return {
                ok: false,
                message: message
            }
        }

    }



    return {
        //state
        usuario,
        access,
        refresh,
        email,
        authStatus,


        //getters
        tokenProxExpiracion,
        isTokenExpirado,
        isChecking,
        isAuthenticated,
        userEmail,
        limpiarToken,

        //Todo: getter para saber si es Admin o no


        //accions
        login,
        logout,
        autenticacion,

        registroStore,
        verificarOtpResponse,
        reenviarOtpResponse,
        olvidarContrasenaResponse,
        nuevaContrasenaResponse,
    }
})