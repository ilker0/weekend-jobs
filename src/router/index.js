import { createRouter, createWebHistory } from 'vue-router'
//
import Jobs from '@/views/Jobs.vue'
import PostJob from '@/views/PostJob.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'jobs',
      path: '/',
      component: Jobs
    },
    {
      name: 'post-job',
      path: '/post-job',
      component: PostJob
    }
  ]
})

export default router
