<template>
  <div class="auth-area">
    <div class="title-area">
      <h1 class="title">인증번호 입력</h1>
      <p class="sub-title">
        휴대폰으로 전송된<br />
        인증번호 5자리를 입력해주세요
      </p>
    </div>
    <!-- input -->
    <div class="auth-input-area">
      <input class="auth-input" />
      <input class="auth-input" />
      <input class="auth-input" />
      <input class="auth-input" />
      <input class="auth-input" />
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.auth-area {
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.title-area {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 8px;
  margin-bottom: 36px;
}
.title {
  font-size: 28px;
  font-weight: 500;
}
.sub-title {
  font-size: 15px;
  color: $color-gray03;
}
.auth-input-area {
  display: flex;
  gap: 8px;
}
.auth-input {
  background-color: #f0f0f0;
  width: 18%;
  height: 64px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 22px;
}
</style>
