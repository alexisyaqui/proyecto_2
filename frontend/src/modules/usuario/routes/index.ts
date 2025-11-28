
import type { RouteRecordRaw } from 'vue-router'



export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/auth',
        name: 'auth',
        redirect: { name: 'login' },
        meta: { requiresAuth: false },

        component: () => import('@/modules/usuario/layouts/AuthLayout.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/modules/usuario/views/autenticacion/LoginViews.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/registro',
                name: 'registro',
                component: () => import('@/modules/usuario/views/autenticacion/RegisterViews.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/editar-usuario/:id/:access',
                name: 'nueva-contrasena',
                component: () => import('@/modules/usuario/views/autenticacion/NuevaContrasenaView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/verificar/otp',
                name: 'verificarOtp',
                component: () => import('@/modules/usuario/views/autenticacion/VerificacionOtpView.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/olvidar/contrasena',
                name: 'olvidarContrasena',
                component: () => import('@/modules/usuario/views/autenticacion/OlvidarContrasenaView.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/reestablecer-contrasena/:uidb64/:token',
                name: 'nueva-contrasena',
                component: () => import('@/modules/usuario/views/autenticacion/NuevaContrasenaView.vue'),
                meta: { requiresAuth: false }
            },

        ],

    },
    {
        path: '/usuarios-activos',
        name: 'usuarios_activos',
        component: () => import('@/modules/usuario/views/usuario/UsuarioListaview.vue'),
        meta: { requiresAuth: true }
    }

]

