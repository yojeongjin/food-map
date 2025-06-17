<template>
  <article class="sidebar-section">
    <div class="inner">
      <div class="sidebar-base" ref="outside">
        <!-- profile -->
        <div v-if="user" class="user-profile-box">
          <div class="user-profile-img-box">
            <img :src="user.photo" alt="유저 프로필" class="user-profile-img" />
          </div>
          <span class="level-span"
            >Lv.{{ user.level }} {{ user.level_name }}</span
          >
          <h2>{{ user.nickname }}</h2>
        </div>
        <!-- ================ 유저없음 ================ -->
        <div v-else class="user-profile-box" :class="{ none: !user }">
          <div class="user-profile-img-box" :class="{ none: !user }">
            <img
              src="https://voca-bucket.s3.ap-northeast-2.amazonaws.com/level1.webp"
              alt="기본 프로필"
              class="user-profile-img"
            />
          </div>
          <h2>로그인이 필요해요!</h2>
          <RouterLink to="/signin" class="signin-btn"> 로그인 </RouterLink>
        </div>

        <!-- nav -->
        <ul class="nav-menu">
          <li>
            <RouterLink to="/find" class="nav-item">맛집 찾기</RouterLink>
          </li>
          <li>
            <RouterLink to="/review" class="nav-item">맛집 추천하기</RouterLink>
          </li>
          <li>
            <RouterLink to="/mypage" class="nav-item">마이페이지</RouterLink>
          </li>
        </ul>
        <button
          v-if="user"
          type="button"
          class="logout-btn"
          @click="handleLogout"
        >
          <i-material-symbols:power-settings-new
            width="14"
            height="14"
            color="#d1d5db"
          />
          <span class="logout">로그아웃</span>
        </button>
      </div>
    </div>
  </article>
</template>

<!-- ===================SCRIPT================= -->
<script>
import axios from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'

export default {
  emits: ['close'],
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  },
  computed: {
    user() {
      console.log('user computed 호출:', this.$store.state.user.user)
      return this.$store.state.user.user
    },
  },
  methods: {
    handleClickOutside(e) {
      if (!this.$refs.outside?.contains(e.target)) {
        this.$emit('close')
      }
    },
    // 로그아웃
    async handleLogout() {
      try {
        const res = await axios.get('/v1/auth/logout', {
          withCredentials: true,
        })
        if (res.status === 200 && res.data.success) {
          window.location.href = '/'
        }
      } catch (err) {
        handleApiError(err)
      }
    },
  },
}
</script>
<!-- ===================SCRIPT================= -->

<style lang="scss" scoped>
.sidebar-section {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.inner {
  position: relative;
  width: 100%;
  max-width: 720px;
  height: 100%;
}
.sidebar-base {
  background-color: #fff;
  position: absolute;
  right: 0;
  width: 240px;
  height: 100%;
  padding: 30px 0;
}
// profle
.user-profile-box {
  display: flex;
  flex-direction: column;
  text-align: center;
  &.none {
    gap: 8px;
  }
}
.user-profile-img-box {
  background-color: $color-gray06;
  border: 1px solid $color-gray05;
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  border-radius: 12px;
  &.none {
    opacity: 0.3;
    margin: 0 auto;
  }
}
.user-profile-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.level-span {
  color: $color-gray02;
  font-size: 12px;
}

// nav
.nav-menu {
  margin-top: 30px;

  .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    font-size: 14px;
    cursor: pointer;
    &:after {
      content: '';
      position: absolute;
      right: 20px;
      width: 7px;
      height: 7px;
      border: 1px solid $color-gray01;
      border-left: 0;
      border-top: 0;
      transform: rotate(315deg);
    }
    &:first-child {
      border-top: 0;
    }
  }
}
.signin-btn {
  width: 80%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  margin: 0 auto;
  color: #959595;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
}
.logout-btn {
  position: absolute;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  color: $color-gray04;
  .logout {
    display: inline-block;
    margin-left: 4px;
  }
}
</style>
