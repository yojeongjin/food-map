<template>
  <header v-if="!isFindPage">
    <div class="inner">
      <RouterLink to="/">
        <div class="logo-box">
          <img src="../../assets/logo-1.png" alt="로고" class="logo" />
        </div>
      </RouterLink>

      <button type="button" class="menu-button" @click="show">
        <i-iconamoon:menu-burger-horizontal-light />
      </button>
    </div>
    <Sidebar v-if="isShow" @close="isShow = false" />
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'

const isShow = ref(false)
const show = () => {
  isShow.value = !isShow.value
}

const route = useRoute()
const isFindPage = computed(() =>
  ['/find', '/signin', '/join'].some((path) => route.path.includes(path)),
)
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 720px;
  min-width: 280px;
  z-index: 10;
}
.inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 8px;
  height: 50px;
}
.logo-box {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}
.logo {
  display: block;
  height: 50%;
}
.menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 12px;
  font-size: 22px;
}
</style>
