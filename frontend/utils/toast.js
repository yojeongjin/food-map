import { createApp, h } from 'vue'

export function showToast(message = '알림', duration = 2000) {
  const Toast = {
    data() {
      return { visible: true }
    },
    render() {
      return this.visible
        ? h(
            'div',
            {
              class: 'toast-base',
              style: {
                position: 'fixed',
                bottom: '80px',
                left: '50%',
                backgroundColor: '#808289',
                width: '80%',
                transform: 'translateX(-50%)',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '4px',
                boxShadow: '0 0.3rem 0.7rem rgba(0, 0, 0, 0.08)',
                zIndex: 9999,
                transition: 'all 0.3s ease',
              },
            },
            message,
          )
        : null
    },
    mounted() {
      setTimeout(() => {
        this.visible = false
        app.unmount()
        container.remove()
      }, duration)
    },
  }

  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(Toast)
  app.mount(container)
}
