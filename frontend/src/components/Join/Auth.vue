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
      <input
        v-for="(value, index) in codeInputs"
        :key="index"
        class="auth-input"
        v-model="codeInputs[index]"
        ref="inputRefs"
        maxlength="1"
        @input="onInput(index)"
        @keydown.backspace.prevent="onBackspace(index)"
      />
    </div>
    <div class="auth-verify-time">
      <span class="auth-des"
        >유효시간
        <span class="auth-time">{{ time }}</span>
      </span>
      <button type="button" class="resend-btn" @click="this.$emit('resend')">
        재전송
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
  },
  data() {
    return {
      codeInputs: ['', '', '', '', ''],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputRefs[0].focus()
    })
  },
  methods: {
    onInput(index) {
      const val = this.codeInputs[index]
      if (val.length > 1) {
        this.codeInputs[index] = val.slice(0, 1)
      }

      // 다음 input으로 이동
      if (val && index < 4) {
        this.$refs.inputRefs[index + 1].focus()
      }

      // 모든 입력이 끝나면 emit
      if (this.codeInputs.every((v) => v !== '')) {
        const enteredCode = this.codeInputs.join('')

        this.$emit('checkAuthCode', enteredCode)
      }
    },
    onBackspace(index) {
      if (this.codeInputs[index] === '') {
        if (index > 0) {
          this.codeInputs[index - 1] = ''
          this.$refs.inputRefs[index - 1].focus()
        }
      } else {
        this.codeInputs[index] = ''
      }
    },
  },
}
</script>

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
.auth-verify-time {
  margin-top: 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
}

.auth-des {
  color: $color-gray02;
}

.auth-time {
  color: $color-primary;
}

.resend-btn {
  font-weight: 500;
  font-size: 13px;
  color: $color-gray02;
  text-decoration: underline;
}
</style>
