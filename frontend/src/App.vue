<template>
  <Main />
</template>

<script>
import Main from '@/components/Main/Main.vue'

export default {
  components: { Main },

  mounted() {
    const setScreenSize = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setScreenSize()
    window.addEventListener('resize', setScreenSize)
    this._offResize = () => window.removeEventListener('resize', setScreenSize)
  },
  unmounted() {
    this._offResize?.()
  },
}
</script>

<style lang="scss">
@use '@/styles/reset.scss' as *;
#app {
  background-color: $color-gray06;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
