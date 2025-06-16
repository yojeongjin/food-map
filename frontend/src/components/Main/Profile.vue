<template>
  <section>
    <div class="user-info-box">
      <img
        src="../../assets/level1.png"
        alt="메인 캐릭터"
        class="user-character"
      />
      <!-- 유저 정보 -->
      <ul class="user-info-menu">
        <li class="user-info-item">
          <span class="level-span">Lv.0 맛집수색대</span>
        </li>
        <li class="user-info-item">
          <button class="setting-btn" type="button">
            <span class="user-name">유저닉네임</span>
            <i-material-symbols:settings-rounded
              width="16"
              height="16"
              color="#d7d7d7"
            />
          </button>
        </li>
        <!-- 프로그레스 -->
        <li class="user-info-item">
          <div class="progress">
            <div class="progress-wrapper">
              <div
                class="progress-bar"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <span class="progress-level">Lv.1</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 유저 관련 정보 -->
    <ul class="user-history-menu">
      <li class="user-history-item">
        <span class="count">0</span>
        <p class="history">찜한 맛집</p>
      </li>
      <li class="user-history-item">
        <span class="count">0</span>
        <p class="history">리뷰 작성</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 80,
    },
  },
}
</script>

<style lang="scss" scoped>
.user-info-box {
  display: flex;
  padding: 8px 0 16px;
}
.user-character {
  display: block;
  width: 72px;
  height: 72px;
  margin-right: 12px;
}
.user-info-menu {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
}

.user-info-item {
  display: flex;
}
.level-span {
  display: block;
  color: $color-gray02;
  font-size: 12px;
}
.setting-btn {
  display: flex;
  align-items: center;
  color: $color-gray01;
}
.user-name {
  display: inline-block;
  margin-right: 2px;
  font-size: 16px;
  font-weight: 600;
}
.progress {
  display: flex;
  align-items: center;
  margin-top: 4px;
}
.progress-wrapper {
  background-color: $color-gray05;
  width: 120px;
  height: 10px;
  border-radius: 16px;
  margin-right: 8px;
  overflow: hidden;
}
.progress-bar {
  background-color: $color-primary;
  height: 100%;
  transition: width 0.3s ease;
}
.progress-level {
  color: $color-gray03;
  font-size: 10px;
}

.user-history-menu {
  display: flex;
  padding: 16px 8px 8px;
  border-top: 0.5px solid $color-gray04;
}
.user-history-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  &:first-child {
    border-right: 0.5px solid $color-gray04;
  }
  .count {
    color: $color-primary;
    font-size: 16px;
    font-weight: 600;
  }
  .history {
    color: $color-gray03;
    font-size: 12px;
  }
}
</style>
