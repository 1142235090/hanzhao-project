import { createRouter, createWebHashHistory } from 'vue-router'
import main from '../views/main'

const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
