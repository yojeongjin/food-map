<template>
  <main>
    <!-- 게시물 타이틀  -->
    <div class="list-title">
      <div class="user-img-box">
        <img :src="boardDatas?.photo" alt="user-character" class="user-img" />
      </div>

      <div class="user-info-area">
        <div class="user-info">
          <h4 class="user-nickname">{{ boardDatas?.nickname }}</h4>
          <span class="list-date">
            {{ formatDate(boardDatas?.created_at) }}
          </span>
        </div>
        <div class="grade">
          <i-material-symbols:star-rounded width="14px" height="14px" />
          {{ Number(boardDatas.review_rate).toFixed(1) }}
        </div>
      </div>
    </div>
    <!-- 게시글 -->
    <div class="board-content-area">
      <p class="board-text">{{ boardDatas?.review_content }}</p>
      <img
        v-if="!openImg"
        :src="boardDatas.review_img"
        alt="review-photo"
        @click="this.openImg = true"
        class="board-img"
      />
      <div class="review-place-area">
        <div class="review-save">
          <i-ic:baseline-local-cafe
            v-if="boardDatas?.place_category === '카페'"
            class="icon"
          />
          <i-lsicon:rice-filled
            v-else-if="boardDatas?.place_category === '한식'"
            class="icon"
          />
          <i-stash:burger-duotone
            v-else-if="boardDatas?.place_category === '양식'"
            class="icon"
          />
          <i-ri:beer-fill
            v-else-if="boardDatas?.place_category === '술집'"
            class="icon"
          />

          <i-maki:restaurant-sushi
            v-else-if="boardDatas?.place_category === '일식'"
            class="icon"
          />
          <i-icon-park-solid:noodles
            v-else-if="boardDatas?.place_category === '중식'"
            class="icon"
          />
          <i-icon-park-twotone:chicken
            v-else-if="boardDatas?.place_category === '치킨'"
            class="icon"
          />
          <i-emojione-monotone:bread
            v-else-if="boardDatas?.place_category === '간식'"
            class="icon"
          />
          <i-fluent:bowl-salad-24-filled
            v-else-if="boardDatas?.place_category === '샐러드'"
            class="icon"
          />
          <i-icon-park-solid:fork-spoon v-else class="icon" />
        </div>
        <div class="review-place">
          <h4 class="user-nickname">{{ boardDatas?.place_name }}</h4>
          <p class="place-addr">{{ boardDatas?.place_addr }}</p>
        </div>
      </div>
    </div>
    <div v-if="openImg" class="open-img-area" @click="this.openImg = false">
      <img
        :src="boardDatas.review_img"
        alt="review-photo"
        class="open-img"
        @click.stop
      />
    </div>
  </main>
</template>

<script>
import axios from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      boardDatas: {},
      openImg: false,
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    async getPost() {
      try {
        const res = await axios.get('/v1/board/' + this.$route.params.id)

        if (res.status === 200 && res.data.success) {
          this.boardDatas = res.data.data[0]
        }
      } catch (err) {
        handleApiError(err)
      }
    },
    formatDate(datetime) {
      return dayjs(datetime).format('YYYY.MM.DD')
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: calc(var(--vh, 1vh) * 100);
  padding: 70px 24px 24px;
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
    object-fit: fill;
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
  gap: 16px;
}
.board-text {
  word-break: keep-all;
}

.board-img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  object-fit: cover;
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

.open-img-area {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.open-img {
  width: 100%;
  object-fit: cover;
}
</style>
