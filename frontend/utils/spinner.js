import { createApp, h } from 'vue'
import Spinner from '../src/components/Common/Spinner.vue'

let app = null
let container = null

export const showSpinner = () => {
  if (app) return

  container = document.createElement('div')
  document.body.appendChild(container)

  app = createApp(Spinner)
  app.mount(container)
}

export const hideSpinner = () => {
  if (app && container) {
    app.unmount()
    container.remove()
    app = null
    container = null
  }
}
