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
        }
    ]

}
