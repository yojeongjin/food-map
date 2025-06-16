<template>
  <div class="phone-no-area">
    <div class="title-area">
      <h1 class="title">계정 입력</h1>
      <p class="sub-title">
        사용하실 아이디와 비밀번호를 입력해주세요.<br />
        닉네임은 이후에도 변경이 가능해요!
      </p>
    </div>
    <!-- input -->

    <div class="input-area">
      <div class="input-box">
        <input placeholder="아이디" class="join-input" />
      </div>
      <div class="input-box">
        <input placeholder="닉네임" class="join-input" />
      </div>
    </div>
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
// input
.input-area {
  display: flex;
  flex-flow: column;
  gap: 16px;
}
.input-box {
}
.join-input {
  background-color: #f5f5f5;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-radius: 8px;
  &::placeholder {
    color: #575757;
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
