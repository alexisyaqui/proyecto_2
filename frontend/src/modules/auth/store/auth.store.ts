import { defineStore } from "pinia";
import { AuthStatus, type UsuarioInterface } from "../interfaces";
import { computed, ref } from "vue";

import { useLocalStorage } from "@vueuse/core";
import { loginAction, LogoutActions, registroAction } from "../actions";
import { nuevaContrasenaAction, olvidarContrasenaAction, reenviarOtpActions, verificarOtpActions } from "../actions/verificacion.action";



export const useAuthstore = defineStore('auth', () => {

    //authenticated, unAuthenticated, checking
    const authStatus = ref<AuthStatus>(AuthStatus.Checking);

    const usuario = ref<UsuarioInterface | undefined>();
    const token = useLocalStorage<string>('token', '');
    const email = useLocalStorage<string>('email', '');


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
            token.value = String(loginResp.access ?? ''),
            email.value = loginResp.usuario.email;
            authStatus.value = AuthStatus.Authenticated;

            return {
                success: true,
                message: loginResp.message
            }

        } catch (error: unknown) {

            const message = error instanceof Error ? error.message : 'No se pudo conectar al servidor'

            return {
                success: false,
                message
            }
        }
    };
    
    const registroStore = async (
        nombre_usuario:string, 
        nombres:string, 
        apellidos:string, 
        email:string, 
        telefono:string,
        password:string, 
        password2:string) => {
        try {
            const registroResultado = await registroAction(nombre_usuario, nombres, apellidos, email, telefono, password, password2 );

            if(!registroResultado.ok){
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

    const verificarOtpResponse = async (email: string, codigo:Number) => {
        try {
             const resultadoOpt = await verificarOtpActions(email, codigo)

             if(!resultadoOpt.ok){
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
            
            if(!resultadoReenviarOtp.ok){
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

    const olvidarContrasenaResponse = async (email: string) =>{
        try {
            const resultadoOlvidarContrasena = await olvidarContrasenaAction(email)

            if(!resultadoOlvidarContrasena.ok){
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
                message: message
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
            if(!resultadoNuevaContrasena.ok){
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



    //logout
    const logout = async (refresh: string) => {
        try {
            const resultadoLogout = await LogoutActions(refresh)
            if (!resultadoLogout.ok) {
                return {
                    ok: false,
                    message: resultadoLogout.message,
                    errors: resultadoLogout.errors
                }
            }

            authStatus.value = AuthStatus.Unauthenticated;
            usuario.value = undefined;
            token.value = '';
            email.value = '';
            return false;
        } catch (error) {

        }
    }



    return {
        usuario,
        token,
        email,
        authStatus,


        //getters
        isCheking: computed(() => authStatus.value === AuthStatus.Checking),
        isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
        userEmail: computed(() => email.value),


        //Todo: getter para saber si es Admin o no


        //accions
        login,
        registroStore,
        verificarOtpResponse,
        reenviarOtpResponse,
        olvidarContrasenaResponse,
        nuevaContrasenaResponse,

        logout



    }
})