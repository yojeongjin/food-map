<template>
  <section>
    <div class="random-container">
      <h2 class="title">오늘 뭐 먹지?</h2>
      <!-- 카테고리 -->
      <ul class="category-menu">
        <li class="category-item" :class="{ select: true }">🍽️ 전체</li>
        <li class="category-item">🍚 한식</li>
        <li class="category-item">🍔 양식</li>
        <li class="category-item">🍜 중식</li>
        <li class="category-item">🍣 일식</li>
      </ul>
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
                v-for="(menuData, index) in menuDatas"
                :key="menuData.id"
                class="random-item"
                :style="getItemStyle(index)"
              >
                {{ menuData.menuName }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <button class="apply-btn" @click="rollSlot">돌려요</button> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menuDatas: [
        { id: 0, menuName: '탕수육' },
        { id: 1, menuName: '잠봉' },
        { id: 2, menuName: '탕수육' },
        { id: 3, menuName: '국밥' },
        { id: 4, menuName: '파스타' },
        { id: 5, menuName: '쌀국수' },
        { id: 6, menuName: '회덮밥' },
        { id: 7, menuName: '돈까스' },
        { id: 8, menuName: '라멘' },
        { id: 9, menuName: '김치찌개' },
      ],
      isRolling: false,
      rollingKey: 0,
      showView: false,
    }
  },
  methods: {
    getItemStyle(index) {
      const deg = index * (360 / this.menuDatas.length)
      return {
        transform: `rotateX(${deg}deg) translateZ(75px)`,
      }
    },
    rollSlot() {
      this.isRolling = false
      this.rollingKey++ // 강제 DOM 리렌더링 유도
      // 다시 트리거되게 만들기 위해 재활성화
      void this.$nextTick(() => {
        this.isRolling = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.random-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
  .random-info {
    color: $color-gray03;
  }
  .category-menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
    overflow-x: scroll;
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
  }
  .random-box {
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
      box-shadow: rgba(0, 0, 0, 0.04) 0px 7px 5px;
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
    height: 50px;
    border-radius: 8px;
    color: $color-gray06;
    font-size: 15px;
    font-weight: 600;
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
