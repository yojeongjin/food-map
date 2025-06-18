import { createApp } from 'vue'
import App from './App.vue'
// store
import store from './store'
// router
import router from './routes'
// toast
import { showToast } from '../utils/toast'
// spinner
import { showSpinner, hideSpinner } from '../utils/spinner'

const app = createApp(App)
app.config.globalProperties.$spinner = {
  show: showSpinner,
  hide: hideSpinner,
}
app.config.globalProperties.$toast = showToast
app.use(router).use(store).mount('#app')
