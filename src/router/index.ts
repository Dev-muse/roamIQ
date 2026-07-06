import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/brief/:id',
      name: 'brief',
      component: () => import('@/views/BriefView.vue'),
    },
    {
      path: '/saved',
      name: 'saved',
      component: () => import('@/views/SavedView.vue'),
    },
  ],
})

export default router