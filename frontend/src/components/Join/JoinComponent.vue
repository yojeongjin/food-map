<template>
  <main>
    <article>
      <PhoneNo
        v-if="step === 0"
        v-model:phoneNo="phoneNo"
        @handleAuth="handleAuth"
      />
      <Auth
        v-else-if="step === 1"
        @checkAuthCode="checkAuthCode"
        @resend="handleResendCode"
        :time="formattedTime"
      />
      <JoinInfo
        v-else-if="step === 2"
        v-model:nickname="nickname"
        @handleJoin="handleJoin"
      />
      <Complete v-else-if="step === 3" @handleSignin="handleSignin" />
      <ul class="step-menu">
        <li
          v-for="n in 4"
          :key="n"
          class="step-item"
          :class="{ active: step === n - 1 }"
        ></li>
      </ul>
    </article>
  </main>
</template>

<script>
import axios from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'
// components
import PhoneNo from './PhoneNo.vue'
import Auth from '../Common/Auth.vue'
import JoinInfo from './JoinInfo.vue'
import Complete from './Complete.vue'

export default {
  data() {
    return {
      step: 0,
      phoneNo: null,
      timer: null,
      timeLeft: 180,
      nickname: null,
    }
  },
  methods: {
    // 인증번호 요청
    async handleAuth() {
      try {
        const res = await axios.post(
          '/v1/auth/join',
          {
            phoneNo: this.phoneNo,
          },
          {
            withCredentials: true,
          },
        )

        if (res.status === 200 && res.data.success) {
          this.step = 1
        }
      } catch (err) {
        handleApiError(err)
      }
    },
    // 인증 코드 확인
    async checkAuthCode(userInputCode) {
      try {
        const res = await axios.post(
          '/v1/auth/verify',
          {
            phoneNo: this.phoneNo,
            code: userInputCode,
          },
          {
            withCredentials: true,
          },
        )

        if (res.status === 200 && res.data.success) {
          this.step = 2
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
        const res = await axios.post(
          '/v1/auth/join',
          {
            phoneNo: this.phoneNo,
          },
          {
            withCredentials: true,
          },
        )
        if (res.status === 200 && res.data.success) {
          this.restartTimer()
          this.$toast('인증번호가 다시 전송되었어요')
        }
      } catch (err) {
        handleApiError(err)
      }
    },
    // 회원가입
    async handleJoin() {
      try {
        const res = await axios.post(
          '/v1/join',
          {
            phoneNo: this.phoneNo,
            nickname: this.nickname,
          },
          {
            withCredentials: true,
          },
        )
        if (res.status === 200 && res.data.success) {
          this.step = 3
        }
      } catch (err) {
        handleApiError(err)
      }
    },
    // 로그인
    async handleSignin() {
      try {
        const res = await axios.post(
          '/v1/join/token',
          {
            phoneNo: this.phoneNo,
          },
          {
            withCredentials: true,
          },
        )
        if (res.status === 200 && res.data.success) {
          this.$router.replace('/')
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
  components: { PhoneNo, Auth, JoinInfo, Complete },
}
</script>

<style lang="scss" scoped>
main {
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);
}
article {
  position: relative;
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  height: 100%;
  display: flex;
  flex-flow: column;
  gap: 28px;
  margin: 0 auto;
  padding: 64px 24px;
}
.step-menu {
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
}
.step-item {
  background-color: #d8d8d8;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  &.active {
    background-color: $color-primary;
  }
}
</style>
