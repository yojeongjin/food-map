import { createApp } from 'vue'
import App from './App.vue'
// store
import store from './store'
// router
import router from './routes'
// toast
import { showToast } from '../utils/toast'

const app = createApp(App)
app.config.globalProperties.$toast = showToast
app.use(router).use(store).mount('#app')
