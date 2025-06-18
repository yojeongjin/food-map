<template>
  <section class="profile-section" :class="{ none: !user }">
    <!-- ==================== user 있을 때 ==================== -->
    <div v-if="user" class="user-info-box">
      <img :src="user.photo" alt="메인 캐릭터" class="user-character" />
      <ul class="user-info-menu">
        <li class="user-info-item">
          <span class="level-span">
            Lv.{{ user.level }} {{ user.level_name }}
          </span>
        </li>
        <li class="user-info-item">
          <button
            class="setting-btn"
            type="button"
            @click="this.$router.push('/mypage')"
          >
            <span class="user-name">{{ user.nickname }}</span>
            <i-material-symbols:settings-rounded
              width="16"
              height="16"
              color="#d7d7d7"
            />
          </button>
        </li>
        <li class="user-info-item">
          <div class="progress">
            <div class="progress-wrapper">
              <div
                class="progress-bar"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
            <span class="progress-level">
              Lv.{{ user.level === 4 ? '' : user.level + 1 }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <!-- ==================== user 없을 때 ==================== -->
    <div v-else class="none-user-overlay">
      <div class="none-title-area">
        <img
          src="https://voca-bucket.s3.ap-northeast-2.amazonaws.com/find.webp"
          alt="메인 캐릭터"
          class="none-user-character"
        />
        <div class="none-area">
          <p class="none-title">수색대를 모집 중입니다!</p>
          <p class="none-des">
            로그인하고 나만의 맛집 지도를 시작하세요.<br />
            찜, 리뷰, 레벨업 기능이 기다리고있어요😋
          </p>
        </div>
      </div>
      <RouterLink to="/signin" class="apply-btn">로그인하러 가기</RouterLink>
    </div>

    <!-- ==================== user 있을 때 ==================== -->
    <ul v-if="user" class="user-history-menu">
      <li class="user-history-item">
        <span class="count" :class="{ none: !user }">
          {{ user?.favorite_places.length }}
        </span>
        <p class="history">찜한 맛집</p>
      </li>
      <li class="user-history-item">
        <span class="count" :class="{ none: !user }">{{
          user?.review_count
        }}</span>
        <p class="history">리뷰 작성</p>
      </li>
    </ul>
    <!-- ==================== user 없을 때 ==================== -->
    <ul v-else class="user-history-menu">
      <li class="user-history-item">
        <span class="count" :class="{ none: !user }">0</span>
        <p class="history">찜한 맛집</p>
      </li>
      <li class="user-history-item">
        <span class="count" :class="{ none: !user }">0</span>
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
  computed: {
    // 유저정보
    user() {
      return this.$store.state.user.user
    },
    // 프로그레스
    progressPercent() {
      const count = this.user?.review_count || 0
      const level = this.user?.level || 1

      if (level >= 4) return 100 // 만렙

      const levelThresholds = {
        1: { max: 5 },
        2: { max: 10 },
        3: { max: 20 },
      }

      const { max } = levelThresholds[level]
      const prevLevelTotal = Object.entries(levelThresholds)
        .filter(([k]) => Number(k) < level)
        .reduce((acc, [, v]) => acc + v.max, 0)

      // 현재 레벨 내에서 진행률 계산
      const currentProgress = count - prevLevelTotal
      return Math.min(Math.round((currentProgress / max) * 100), 100)
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-section {
  position: relative;
  background-color: #fff;
  padding: 16px 24px;
  &.none {
    padding: 80px 24px;
  }
  .none-user-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: 8px;
    z-index: 1;

    .none-title-area {
      display: flex;
      align-items: center;
    }
    .none-user-character {
      display: block;
      width: 90px;
      height: 90px;
    }

    .none-area {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .none-title {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
    }
    .none-des {
      font-size: 14px;
      color: #ddd;
    }

    .apply-btn {
      width: 80%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      color: #ddd;
      border: 1px solid #c8c8c8;
      border-radius: 8px;
    }
  }
}
.user-info-box {
  display: flex;
  padding: 8px 0 16px;
  &.dimmed {
    opacity: 0.2;
    pointer-events: none;
  }
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
  cursor: pointer;
  &:first-child {
    border-right: 0.5px solid $color-gray04;
  }
  .count {
    color: $color-primary;
    font-size: 16px;
    font-weight: 600;
    &.none {
      color: #ffcd64;
    }
  }
  .history {
    color: $color-gray03;
    font-size: 12px;
  }
}
</style>
