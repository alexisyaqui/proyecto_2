import type { RouteRecordRaw } from "vue-router";


export const dashboardRoutes: RouteRecordRaw = {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/modules/dashboard/layouts/DashboardLayouts.vue')
}