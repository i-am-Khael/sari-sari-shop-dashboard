import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/dashboard/IndexDashboard.vue'),
      meta: { requiresAuth: true },
      redirect: { name: 'dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/DashboardView.vue')
        },
        {
          path: 'dashboard/categories',
          name: 'categories',
          component: () => import('../views/dashboard/CategoriesView.vue')
        },
        {
          path: 'dashboard/products',
          name: 'products',
          component: () => import('../views/dashboard/ProductsView.vue')
        },
        {
          path: 'dashboard/orders',
          name: 'orders',
          component: () => import('../views/dashboard/OrdersView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ],
});

router.beforeEach( async (to) => {
  const isLoggedIn = await auth.checkAuth();

  if (to.matched.some(route => route.meta.requiresAuth) && !isLoggedIn) return { name: 'login' }

  if (to.name === 'login' && isLoggedIn) return { name: 'dashboard' }
});

export default router
