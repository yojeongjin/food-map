import { createApp } from 'vue'
import App from './App.vue'
// store
import store from './store'
// router
import router from './routes'

const app = createApp(App)
app.use(router).use(store).mount('#app')
