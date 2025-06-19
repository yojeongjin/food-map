<template>
  <div class="levelup-area">
    <div class="levelup-inner">
      <img
        src="https://voca-bucket.s3.ap-northeast-2.amazonaws.com/review2.png"
        alt="level-up character"
        class="levelup-img"
      />
      <div class="levelup-info">
        <h1 class="levelup-title">레벨업!</h1>
        <p class="levelup-des">맛집 수색대가 한층 더 성장했어요🎉</p>
        <button @click="$emit('close')" class="levelup-btn">확인</button>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.levelup-area {
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
}
.levelup-inner {
  width: 100%;
  max-width: 720px;
  height: calc(var(--vh, 1vh) * 100 - 30%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 24px 16px;
}
.levelup-info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
}
.levelup-img {
  display: block;
  width: 50%;
}
.levelup-title {
  color: #fff;
  font-size: 28px;
  font-weight: 600;
}
.levelup-des {
  font-size: 15px;
  color: #ddd;
}
.levelup-btn {
  background-color: $color-primary;
  width: 100%;
  height: 52px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  margin-top: 16px;
}
</style>
