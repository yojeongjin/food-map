<template>
  <main>
    <article v-if="step === 0">
      <img src="../../assets/logo-2.png" alt="logo" class="logo" />
      <!-- input -->
      <div class="input-area-wrapper">
        <div class="input-area">
          <div class="icon-box">
            <i-ph:cookie width="20px" height="20px" />
          </div>
          <input
            v-model="phoneNo"
            class="input-box"
            placeholder="핸드폰 번호를 입력하세요"
          />
        </div>
      </div>
      <!-- btn -->
      <button @click="handleAuth" class="apply-btn">로그인</button>
      <RouterLink to="/join">
        <button class="join-btn">회원가입</button>
      </RouterLink>
    </article>

    <!-- 인증 -->
    <Auth
      v-else-if="step === 1"
      :time="formattedTime"
      @checkAuthCode="handleLogin"
      @resend="handleResendCode"
    />
  </main>
</template>

<!-- ===================SCRIPT================= -->
<script>
import axios from 'axios'
import Auth from '../Common/Auth.vue'

export default {
  data() {
    return {
      step: 0,
      phoneNo: null,
      nickname: null,
      timer: null,
      timeLeft: 180,
    }
  },
  methods: {
    // 인증번호 요청
    async handleAuth() {
      try {
        const res = await axios.post(`http://localhost:3000/v1/auth/signin`, {
          phoneNo: this.phoneNo,
        })

        if (res.status === 200 && res.data.success) {
          this.nickname = res.data.nickname
          this.step = 1
        }
      } catch (err) {
        handleApiError(err)
      }
    },
    // 인증 코드 확인 및 토큰 발급
    async handleLogin(userInputCode) {
      try {
        const res = await axios.post(`http://localhost:3000/v1/auth/token`, {
          phoneNo: this.phoneNo,
          code: userInputCode,
          nickname: this.nickname,
        })

        if (res.status === 200 && res.data.success) {
          window.location.replace('/')
        }
      } catch (err) {
        handleApiError(err)
      }
    },
    // 인증 코드 유효 시간
    startTimer() {
      this.timeLeft = 180
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          this.step = 0 // 인증 실패
          this.clearTimer()
        }
      }, 1000)
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    // 재전송
    async handleResendCode() {
      try {
        const res = await axios.post(`http://localhost:3000/v1/auth/signin`, {
          phoneNo: this.phoneNo,
        })
        if (res.status === 200 && res.data.success) {
          this.restartTimer()
          this.$toast('인증번호가 다시 전송되었어요')
        }
      } catch (err) {
        handleApiError(err)
      }
    },
    // 타이머 다시 시작
    restartTimer() {
      this.clearTimer()
      this.startTimer()
    },
  },
  computed: {
    formattedTime() {
      const min = String(Math.floor(this.timeLeft / 60)).padStart(1, '0')
      const sec = String(this.timeLeft % 60).padStart(2, '0')
      return `${min}:${sec}`
    },
  },
  watch: {
    step(newVal) {
      if (newVal === 1) {
        this.startTimer()
      } else {
        this.clearTimer()
      }
    },
  },
  components: { Auth },
}
</script>
<!-- ===================SCRIPT================= -->

<style lang="scss" scoped>
main {
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);
}
article {
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  gap: 24px;
  margin: 0 auto;
  padding: 64px 24px;
}
.logo {
  width: 240px;
}
.input-area-wrapper {
  display: flex;
  flex-flow: column;
  gap: 16px;
}
.input-area {
  width: 295px;
  height: 48px;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.icon-box {
  display: flex;
  align-items: center;
  padding: 0 12px;
}
.input-box {
  width: calc(100% - 48px);
  &::placeholder {
    color: #ccc;
  }
}
.apply-btn {
  background-color: $color-primary;
  width: 295px;
  height: 48px;
  font-weight: 600;
  color: #fff;
  border-radius: 8px;
}
.join-btn {
  font-weight: 500;
}
</style>
