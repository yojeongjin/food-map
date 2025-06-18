<template>
  <div v-if="visible" class="spinner-overlay">
    <FadeLoader class="spinner=icon" />
  </div>
</template>

<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default {
  data() {
    return {
      visible: true,
    }
  },
  components: { FadeLoader },
}
</script>

<style>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: progress;
}
</style>
