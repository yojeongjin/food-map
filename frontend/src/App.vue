<template>
  <Header />
  <RouterView />
</template>

<script>
import Header from '@/components/Common/Header.vue'

export default {
  components: { Header },
  created() {
    this.$store.dispatch('user/getUser')
  },
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
  min-height: calc(var(--vh, 1vh) * 100);
  h2 {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
