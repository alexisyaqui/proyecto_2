import { authRoutes } from '@/modules/authentication/routes/index';
import { usuariosRoutes } from '@/modules/usuario/routes';

import { createRouter, createWebHistory } from 'vue-router';
import { autenticacionGuard } from '@/modules/guard/autenticacionGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login',
      meta: { requiresAuth: false },
    },

    //authRoutes
    ...authRoutes,
    ...usuariosRoutes,
  ],
});

router.beforeEach(autenticacionGuard);

export default router;
