import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view'

createApp(App).use(dataV).use(store).use(router).mount('#app')
