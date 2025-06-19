<template>
  <main>
    <div class="random-container">
      <h1 class="random-title">
        오늘 뭐먹지? <br />
        딱 맞는 메뉴를 골라드릴게요!
      </h1>
      <p class="random-des">
        {{ !user ? '비회원' : user.nickname }}님이 오늘 드실 메뉴는..!
      </p>

      <div class="random-box">
        <div class="random">
          <!-- 타이틀 -->
          <ul class="random-title">
            <li class="random-title-item"></li>
            <li class="random-title-item"></li>
          </ul>
          <!-- 메뉴 slot -->
          <div class="random-menu-wrap" :class="{ view: showView }">
            <ul
              class="random-menu"
              :class="{ rolling: isRolling }"
              :key="rollingKey"
            >
              <li
                v-for="(menuData, index) in displayedMenus"
                :key="menuData.id"
                class="random-item"
                :style="getItemStyle(index)"
              >
                {{ menuData.random_menu }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button type="button" class="apply-btn" @click="rollSlot()">
        다시 골라주세요 🥲
      </button>
      <button type="button" class="go-btn" @click="this.$router.push('/find')">
        <i-lsicon:send-filled color="#888" width="16px" height="16px" />근처
        맛집 찾으러 가볼까요?
      </button>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { handleApiError } from '../../../utils/handleApiError'
export default {
  data() {
    return {
      menuDatas: [],
      displayedMenus: [],
      isRolling: false,
      rollingKey: 0,
      showView: false,
    }
  },
  mounted() {
    this.getMenu()
    this.rollSlot()
  },
  methods: {
    getItemStyle(index) {
      const deg = index * (360 / this.displayedMenus.length)
      return {
        transform: `rotateX(${deg}deg) translateZ(75px)`,
      }
    },
    shuffleMenus() {
      const shuffled = [...this.menuDatas].sort(() => Math.random() - 0.5)
      this.displayedMenus = shuffled.slice(0, 10)
    },
    rollSlot() {
      this.shuffleMenus() // 다시 고를 때마다 섞기
      this.isRolling = false
      this.rollingKey++ // 강제 DOM 리렌더링 유도
      // 다시 트리거되게 만들기 위해 재활성화
      void this.$nextTick(() => {
        this.isRolling = true
      })
    },
    async getMenu() {
      try {
        this.$spinner.show()
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/v1/random`)

        if (res.status === 200 && res.data.success) {
          this.menuDatas = res.data.data
          this.shuffleMenus()
        }
      } catch (err) {
        handleApiError(err)
      } finally {
        this.$spinner.hide()
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);
  padding: 80px 24px 0;
}
.random-title {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}
.random-des {
  color: #888;
}
.random-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
  .random-info {
    color: $color-gray03;
  }
  .category-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    overflow-x: scroll;
  }
  .category-item {
    background-color: #f3f3f3;
    min-width: 72px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    cursor: pointer;
    &.select {
      background-color: $color-secondary;
      color: $color-gray01;
    }
  }
  .random-box {
    width: 100%;
    height: calc(100% - 310px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 8px;

    .random {
      background-color: #fec558;
      position: relative;
      width: 100%;
      height: 64px;
      border-radius: 12px;
      // box-shadow: rgba(0, 0, 0, 0.04) 0px 7px 5px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      // title
      .random-title {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        li + li {
          margin-left: 120px;
        }
        .random-title-item {
          background-color: #fc9d19;
          position: relative;
          bottom: 0;
          left: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          &::before {
            content: '';
            background-color: $color-primary;
            position: absolute;
            left: 3px;
            transform: translateY(-50%);
            width: 10px;
            height: 24px;
            border-radius: 7px;
          }
        }
      }
      // random slot
      .random-menu-wrap {
        position: relative;
        height: 30px;
        overflow: hidden;
        &.view {
          overflow: visible;
          .random-menu {
            transform: rotateY(45deg);
          }
        }
      }

      .random-menu {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transform-origin: center;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        &.rolling {
          animation-name: rotate1;
        }
      }
      .random-item {
        background-color: #fec558;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 18px;
        line-height: 1.4;
        font-weight: 700;
        color: #fd552b;
      }
    }
  }
  .apply-btn {
    background-color: $color-primary;
    width: 100%;
    height: 52px;
    border-radius: 8px;
    color: $color-gray06;
    font-size: 15px;
    font-weight: 600;
  }
  .go-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 52px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    font-size: 14px;
    color: $color-gray02;
  }
  @keyframes rotate1 {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(-360deg);
    }
  }
}
</style>
