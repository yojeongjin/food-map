<template>
  <div class="phone-no-area">
    <div class="title-area">
      <h1 class="title">회원가입 완료</h1>
      <p class="sub-title">
        가입이 완료되었어요!<br />
        지금 내 위치 주변 맛집을 찾아볼까요?
      </p>
    </div>
    <img
      src="https://voca-bucket.s3.ap-northeast-2.amazonaws.com/review1.png"
      alt="character"
      class="join-img"
    />
    <!-- btn -->
    <button type="button" @click="this.$emit('handleSignin')" class="apply-btn">
      접속하기
    </button>
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
  margin-bottom: 42px;
}
.title {
  font-size: 30px;
  font-weight: 600;
}
.sub-title {
  font-size: 15px;
  color: $color-gray03;
}
.join-img {
  display: block;
  width: 240px;
  height: 240px;
  margin: 0 auto;
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
