import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main/Main.vue'
import Find from './Find.vue'
import Review from './Review.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '/find',
      component: Find,
    },
    {
      path: '/review',
      component: Review,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
