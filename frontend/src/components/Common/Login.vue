<template>
  <div class="login-area" data-testid="login-modal">
    <div class="login-inner">
      <button type="button" class="close-btn" @click="$emit('close')">
        <i-material-symbols:close-rounded width="24px" height="24px" />
      </button>
      <img
        src="https://voca-bucket.s3.ap-northeast-2.amazonaws.com/find.webp"
        alt="메인 캐릭터"
        class="login-img"
      />
      <div class="login-info">
        <h1 class="login-title">로그인이 필요해요!</h1>
        <p class="login-des">
          해당 기능은 로그인이 필요해요<br />
          로그인하시겠어요?
        </p>
        <button
          type="button"
          @click="(this.$router.push('/signin'), $emit('close'))"
          class="login-btn"
        >
          로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.login-area {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
}
.login-inner {
  position: relative;
  background-color: #fff;
  width: 100%;
  max-width: 720px;
  text-align: center;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 24px 16px;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px 16px;
}
.login-img {
  display: block;
  width: 50%;
  margin: 0 auto;
}
.login-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-title {
  font-size: 18px;
  font-weight: 600;
}
.login-des {
  color: #888;
}
.login-btn {
  background-color: $color-primary;
  width: 100%;
  height: 52px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
}
</style>
