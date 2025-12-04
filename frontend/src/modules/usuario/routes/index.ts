
import type { RouteRecordRaw } from 'vue-router'



export const usuariosRoutes: RouteRecordRaw[] = [
    {
        path: '/usuarios-activos',
        name: 'usuarios_activos',
        component: () => import('@/modules/usuario/views/usuario/UsuarioListaview.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/editar-usuario/:id',
        name: 'editar-usuario',
        component: () => import('@/modules/usuario/views/usuario/EditarUsuario.view.vue'),
        meta: { requiresAuth: true }
    }

]

