import { createRouter, createWebHashHistory } from 'vue-router'
import mainView from '../components/main'

const routes = [
  {
    path: '/',
    name: 'main',
    component: mainView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
