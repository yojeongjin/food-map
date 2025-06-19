import { createApp, h } from 'vue'
import Login from '../src/components/Common/Login.vue'

let app = null
let container = null

export const showLoginModal = () => {
  if (app) return

  container = document.createElement('div')
  document.body.appendChild(container)

  app = createApp({
    render() {
      return h(Login, {
        onClose: hideLoginModal,
      })
    },
  })

  app.mount(container)
}

export const hideLoginModal = () => {
  if (app && container) {
    app.unmount()
    container.remove()
    app = null
    container = null
  }
}
