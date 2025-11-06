import {authRoutes} from '@/modules/auth/routes/index'
import { dashboardRoutes } from '@/modules/dashboard/routes'

import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },


      //authRoutes
      authRoutes,
      //
      dashboardRoutes

  ],

})



export default router

