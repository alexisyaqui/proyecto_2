// guards/autenticacion.guard.ts
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthstore } from '../authentication/store/auth.store';

export const autenticacionGuard = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const authStatus = useAuthstore();

    // Rutas que requieren autenticación
    if (to.meta.requiresAuth) {
        

        // Verificar si hay token
        if (!authStatus.access) {
            
            return next({
                name: 'login',
                query: { redirect: to.fullPath }
            });
        }

        // Verificar si el token está expirado
        if (authStatus.isTokenExpirado) {
           
            authStatus.limpiarToken();
            return next({
                name: 'login',
                query: {
                    redirect: to.fullPath,
                    reason: 'token_expired'
                }
            });
        }


        next();
    }
    else if (to.name === 'login' && authStatus.isAuthenticated) {
        next({ name: 'dashboard' });
    }

    // Rutas públicas
    else {

        next();
    }
};
