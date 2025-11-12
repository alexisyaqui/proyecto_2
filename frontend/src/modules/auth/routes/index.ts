import type {RouteRecordRaw} from 'vue-router'

export const authRoutes: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    redirect: {name: 'login'},
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/modules/auth/views/LoginViews.vue'),
        },
        {
            path: '/registro',
            name: 'registro',
            component: () => import('@/modules/auth/views/RegisterViews.vue')
        },
        {
            path: '/verificar/otp',
            name: 'verificarOtp',
            component: () => import('@/modules/auth/views/VerificacionOtpView.vue')
        },
        {
            path: '/olvidar/contrasena',
            name: 'olvidarContrasena',
            component: () => import('@/modules/auth/views/OlvidarContrasenaView.vue')
        },
        {
            path: '/reestablecer-contrasena/:uidb64/:token',
            name: 'nueva-contrasena',
            component: () => import ('@/modules/auth/views/NuevaContrasenaView.vue')
        }
    ]

}
