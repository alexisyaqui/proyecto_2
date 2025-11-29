
import type { RouteRecordRaw } from 'vue-router'



export const usuariosRoutes: RouteRecordRaw[] = [
    {
        path: '/usuarios-activos',
        name: 'usuarios_activos',
        component: () => import('@/modules/usuario/views/usuario/UsuarioListaview.vue'),
        meta: { requiresAuth: true }
    }

]

