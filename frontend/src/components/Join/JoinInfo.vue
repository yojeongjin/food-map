<template>
  <article>
    <div class="phone-no-area">
      <div class="title-area">
        <h1 class="title">닉네임 입력</h1>
        <p class="sub-title">
          사용하실 닉네임을 입력해주세요.<br />
          닉네임은 이후에도 변경이 가능해요!
        </p>
      </div>
      <!-- input -->

      <div class="input-area">
        <div class="input-box">
          <input
            :value="nickname"
            @input="$emit('update:nickname', $event.target.value)"
            placeholder="닉네임"
            class="join-input"
          />
        </div>
      </div>
      <!-- btn -->
      <button
        type="button"
        class="apply-btn"
        :class="{ verify: nickname !== null }"
        @click="this.$emit('handleJoin')"
      >
        확인
      </button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    nickname: String,
  },
}
</script>

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
  background-color: #e0e0e0;
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  border-radius: 8px;

  &.verify {
    background-color: $color-primary;
  }
}
</style>
