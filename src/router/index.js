import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main'

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
    children: [{
      path: '/main',
      name: 'main',
      component: main
    }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
