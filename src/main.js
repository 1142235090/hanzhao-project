import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installDatav from './plugins/datav'

const app = createApp(App)
installElementPlus(app)
installDatav(app)
app.use(store).use(router).mount('#app')
