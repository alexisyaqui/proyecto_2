
import type { RouteRecordRaw } from 'vue-router'



export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/auth',
        name: 'auth',
        redirect: { name: 'login' },
        meta: { requiresAuth: false },

        component: () => import('@/modules/authentication/layouts/AuthLayout.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/modules/authentication//views/LoginViews.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/registro',
                name: 'registro',
                component: () => import('@/modules/authentication/views/RegisterViews.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/editar-usuario/:id/:access',
                name: 'nueva-contrasena',
                component: () => import('@/modules/authentication/views/NuevaContrasenaView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/verificar/otp',
                name: 'verificarOtp',
                component: () => import('@/modules/authentication/views/VerificacionOtpView.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/olvidar/contrasena',
                name: 'olvidarContrasena',
                component: () => import('@/modules/authentication/views/OlvidarContrasenaView.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/reestablecer-contrasena/:uidb64/:token',
                name: 'nueva-contrasena',
                component: () => import('@/modules/authentication/views/NuevaContrasenaView.vue'),
                meta: { requiresAuth: false }
            },

        ],

    },

]

