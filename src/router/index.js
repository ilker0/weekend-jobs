import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'jobs',
      path: '/',
      component: () => import('@/views/Jobs.vue')
    },
    {
      name: 'post-job',
      path: '/post-job',
      component: () => import('@/views/PostJob.vue')
    }
  ]
})

export default router
