<template>
  <main>
    <article>
      <!-- <PhoneNo /> -->
      <!-- <Auth /> -->
      <!-- <JoinInfo /> -->
      <Complete />
      <ul class="step-menu">
        <li class="step-item"></li>
        <li class="step-item"></li>
        <li class="step-item"></li>
        <li class="step-item"></li>
      </ul>
    </article>
  </main>
</template>

<script>
import PhoneNo from './PhoneNo.vue'
import Auth from './Auth.vue'
import JoinInfo from './JoinInfo.vue'
import Complete from './Complete.vue'

export default {
  components: { PhoneNo, Auth, JoinInfo, Complete },
}
</script>

<style lang="scss" scoped>
main {
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);
}
article {
  position: relative;
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  height: 100%;
  display: flex;
  flex-flow: column;
  gap: 28px;
  margin: 0 auto;
  padding: 64px 24px;
}
.step-menu {
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
}
.step-item {
  background-color: #d8d8d8;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
