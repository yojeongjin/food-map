<template>
  <section v-if="user" class="my-profile-section">
    <div class="my-profile-area">
      <div class="profile-img-box">
        <img :src="user.photo" class="profile-img" />
      </div>

      <div class="profile-info">
        <h4 class="nickname">{{ user?.nickname }}</h4>
        <span class="level"> Lv.{{ user?.level }} {{ user?.level_name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    // 유저정보
    user() {
      return this.$store.state.user.user
    },
  },
}
</script>

<style lang="scss" scoped>
.my-profile-section {
  padding: 16px 24px 24px;
}
.my-profile-area {
  display: flex;
  align-items: center;
  gap: 16px;
}
.profile-img-box {
  position: relative;
}
.profile-img {
  background-color: #f5f5f5;
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.edit-btn {
  background-color: #333;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}
.profile-info {
}

.nickname {
  font-size: 16.5px;
  font-weight: 600;
}
.level {
  color: #888;
  font-size: 13px;
  font-weight: 400;
}
</style>
