
import {authRoutes} from '@/modules/usuario/routes/index'


import { createRouter, createWebHistory } from 'vue-router'
import { autenticacionGuard } from '@/modules/guard/autenticacionGuard'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/components/layout/AdminLayout.vue')
    },


      //authRoutes
      ...authRoutes,
      // dashboard
  

  ],

})

router.beforeEach(autenticacionGuard)

export default router

