import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/positive-decision',
      name: 'PositiveDecision',
      component: () => import('../views/PositiveDecision.vue'),
    },
    {
      path: '/negative-decision',
      name: 'NegativeDecision',
      component: () => import('../views/NegativeDecision.vue'),
    },
  ],
})

export default router
