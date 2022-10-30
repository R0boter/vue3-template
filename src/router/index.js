import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/views/Layout';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Home'),
        },

        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/About'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to, from) => {});

export default router;
