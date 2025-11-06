import { defineStore } from "pinia";
import { AuthStatus, type UsuarioInterface } from "../interfaces";
import { computed, ref } from "vue";

import { useLocalStorage } from "@vueuse/core";
import { loginAction } from "../actions";



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
                logout();
                return {
                    success: false,
                    message: loginResp.message ?? 'Error desconocido'
                }
            }

            usuario.value = loginResp.usuario;
            token.value = String(loginResp.access ?? '');
            email.value = loginResp.usuario.email;
            authStatus.value = AuthStatus.Authenticated;

            return {
                success: true,
                message: loginResp.message
            }

        } catch (error: unknown) {
            logout()

            const message = error instanceof Error ? error.message : 'No se pudo conectar al servidor'

            return {
                success: false,
                message
            }
        }
    };



    //logout
    const logout = () => {
        authStatus.value = AuthStatus.Unauthenticated;
        usuario.value = undefined;
        token.value = '';
        email.value = '';
        return false;
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

        logout



    }
})