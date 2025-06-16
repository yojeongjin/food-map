<template>
  <div class="phone-no-area">
    <div class="title-area">
      <h1 class="title">회원가입</h1>
      <p class="sub-title">
        휴대폰 번호로 10초만에 가입해보세요!
        <br />
        번호는 가입 인증에만 사용됩니다.
      </p>
    </div>
    <!-- input -->
    <input
      type="tel"
      class="phone-input"
      placeholder="휴대폰 번호를 입력해주세요."
    />
    <!-- btn -->
    <button type="button" class="apply-btn">확인</button>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.phone-no-area {
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
  font-size: 30px;
  font-weight: 500;
}
.sub-title {
  font-size: 15px;
  color: $color-gray03;
}
.phone-input {
  width: 100%;
  height: 52px;
  display: flex;
  padding: 0 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  &::placeholder {
    color: #c8c8c8;
  }
}
.apply-btn {
  position: absolute;
  bottom: 16px;
  background-color: $color-primary;
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  border-radius: 8px;
}
</style>
