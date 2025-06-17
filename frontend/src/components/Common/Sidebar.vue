<template>
  <article class="sidebar-section">
    <div class="inner">
      <div class="sidebar-base" ref="outside">
        <!-- profile -->
        <div class="user-profile-box">
          <div class="user-profile-img-box">
            <img
              src="../../assets/level1.png"
              alt="유저 프로필"
              class="user-profile-img"
            />
          </div>
          <span class="level-span">Lv.0 맛집수색대</span>
          <h2>유저닉네임</h2>
        </div>
        <!-- nav -->
        <ul class="nav-menu">
          <li class="nav-item">맛집 찾기</li>
          <li class="nav-item">맛집 추천하기</li>
          <li class="nav-item">마이페이지</li>
        </ul>
        <button class="logout-btn" type="button">
          <i-material-symbols:power-settings-new
            width="14"
            height="14"
            color="#d1d5db"
          />
          <span class="logout" @click="handleLogout">로그아웃</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'
import { handleApiError } from '../../../utils/handleApiError'

export default {
  emits: ['close'],
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
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
        const res = await axios.get('http://localhost:3000/v1/auth/logout')
        if (res.status === 200 && res.data.success) {
          window.location.replace('/')
        }
      } catch (err) {
        handleApiError(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-section {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .inner {
    position: relative;
    width: 100%;
    max-width: 720px;
    height: 100%;
    .sidebar-base {
      background-color: #fff;
      position: absolute;
      right: 0;
      width: 240px;
      height: 100%;
      padding: 30px 0;

      // profle
      .user-profile-box {
        text-align: center;
        .user-profile-img-box {
          background-color: $color-gray06;
          border: 1px solid $color-gray05;
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          border-radius: 12px;
          .user-profile-img {
            width: 100%;
            height: 100%;
            object-fit: fill;
          }
        }
        .level-span {
          color: $color-gray02;
          font-size: 12px;
        }
      }
      // nav
      .nav-menu {
        margin-top: 40px;
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
    }
  }
}
</style>
