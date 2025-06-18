import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main/Main.vue'
import Find from './Find.vue'
import Review from './Review.vue'
import Board from './Board.vue'
import BoardItem from './BoardItem.vue'
import Mypage from './Mypage.vue'
import Signin from './Signin.vue'
import Join from './Join.vue'

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
    {
      path: '/board',
      component: Board,
    },
    {
      path: '/board/:id',
      component: BoardItem,
    },
    {
      path: '/signin',
      component: Signin,
    },
    {
      path: '/join',
      component: Join,
    },
    {
      path: '/mypage',
      component: Mypage,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
