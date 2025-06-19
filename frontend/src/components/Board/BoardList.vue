<template>
  <div class="board-section">
    <ul class="board-list-area">
      <li
        v-for="boardData in boardDatas"
        :key="boardData?.id"
        class="board-list-item"
      >
        <!-- 게시물 타이틀  -->
        <div class="list-title">
          <div class="user-img-box">
            <img
              :src="boardData?.photo"
              alt="user-character"
              class="user-img"
            />
          </div>

          <div class="user-info-area">
            <div class="user-info">
              <h4 class="user-nickname">{{ boardData?.nickname }}</h4>
              <span class="list-date">{{
                formatDate(boardData?.created_at)
              }}</span>
            </div>
            <div class="grade">
              <i-material-symbols:star-rounded width="14px" height="14px" />
              {{ Number(boardData?.review_rate).toFixed(1) }}
            </div>
          </div>
        </div>
        <!-- 게시글 -->
        <div class="board-content-area">
          <div class="board-text">{{ boardData?.review_content }}</div>
          <img
            :src="boardData?.review_img"
            alt="review-photo"
            class="board-img"
          />
          <div class="review-place-area">
            <div class="review-save">
              <i-ic:baseline-local-cafe
                v-if="boardData?.place_category === '카페'"
                class="icon"
              />
              <i-lsicon:rice-filled
                v-else-if="boardData?.place_category === '한식'"
                class="icon"
              />
              <i-stash:burger-duotone
                v-else-if="boardData?.place_category === '양식'"
                class="icon"
              />
              <i-ri:beer-fill
                v-else-if="boardData?.place_category === '술집'"
                class="icon"
              />

              <i-maki:restaurant-sushi
                v-else-if="boardData?.place_category === '일식'"
                class="icon"
              />
              <i-icon-park-solid:noodles
                v-else-if="boardData?.place_category === '중식'"
                class="icon"
              />
              <i-icon-park-twotone:chicken
                v-else-if="boardData?.place_category === '치킨'"
                class="icon"
              />
              <i-emojione-monotone:bread
                v-else-if="boardData?.place_category === '간식'"
                class="icon"
              />
              <i-fluent:bowl-salad-24-filled
                v-else-if="boardData?.place_category === '샐러드'"
                class="icon"
              />
              <i-icon-park-solid:fork-spoon v-else class="icon" />
            </div>
            <div class="review-place">
              <h4 class="user-nickname">{{ boardData?.place_name }}</h4>
              <p class="place-addr">{{ boardData?.place_addr }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    boardDatas: Array,
  },
  methods: {
    formatDate(datetime) {
      return dayjs(datetime).format('YYYY.MM.DD')
    },
  },
}
</script>

<style lang="scss" scoped>
.board-section {
}
.board-list-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.board-list-item {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.list-title {
  display: flex;
  align-items: center;
}
.user-img-box {
  background-color: $color-gray06;
  display: block;
  width: 46px;
  height: 46px;
  border: 1px solid #f0f0f0;
  border-radius: 50%;

  .user-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
.user-info-area {
  width: calc(100% - 60px);
  margin-left: 12px;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-nickname {
  font-size: 14px;
  font-weight: 500;
}
.list-date {
  color: $color-gray04;
  font-size: 13px;
}
.grade {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: $color-primary;
}
.board-content-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.board-text {
}

.board-img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  @media (min-width: 768px) {
    width: 50%;
  }
}
.review-place-area {
  background-color: #fbfaf9;
  border: 1px solid #f0f0f0;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  gap: 16px;
}
.review-save {
  display: flex;
  align-items: center;
}
.review-place {
}
.place-addr {
  color: $color-gray03;
  font-size: 13px;
}
.icon {
  width: 28px;
  height: 28px;
  color: #999;
}
</style>
