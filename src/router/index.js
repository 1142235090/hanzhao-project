import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main'
import routers from '@/views/router'

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

// 动态添加路由
routers.forEach(function (item) {
  item.typeOptions.forEach(function (item) {
    router.addRoute({
      path: item.path,
      name: item.name,
      component: item.component
    })
  })
})

export default router
