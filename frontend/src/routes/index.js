import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main/Main.vue'
import Find from '../routes/Find.vue'

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
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
