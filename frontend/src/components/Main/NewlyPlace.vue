<template>
  <section>
    <div class="place-container">
      <div class="place-title">
        <h2>새로 등록된 리뷰에요</h2>
        <span class="title-label">NEW</span>
      </div>
      <!-- place info -->
      <ul class="place-menu">
        <li
          v-for="data in newlyDatas"
          key="data.id"
          :data-code="data.id"
          class="place-item"
        >
          <RouterLink :to="`/board/${data.id}`">
            <img :src="data.review_img" alt="식당 사진" class="place-img" />
            <h4 class="new-place-name">{{ data.place_name }}</h4>
            <p class="place-addr">{{ data.place_addr }}</p>
            <div class="place-star">
              <i-material-symbols:star-rounded
                width="16"
                height="16"
                color="#ff6333"
              />
              <span class="star-number">{{
                Number(data.review_rate).toFixed(1)
              }}</span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'

export default {
  data() {
    return {
      newlyDatas: null,
    }
  },
  mounted() {
    this.getReview()
  },
  methods: {
    async getReview() {
      try {
        const res = await axios.get('/v1/review')

        if (res.status === 200 && res.data.success) {
          this.newlyDatas = res.data.data
        }
      } catch (err) {
        handleApiError(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.place-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0;
}
.place-title {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    right: 0px;
    width: 8px;
    height: 8px;
    border: 2px solid $color-gray01;
    border-left: 0;
    border-top: 0;
    transform: rotate(315deg);
  }
}
.title-label {
  background-color: $color-secondary;
  padding: 3px 6px;
  font-size: 9px;
  font-weight: 600;
  border-radius: 6px;
  color: $color-primary;
}
.place-menu {
  display: flex;
  overflow-x: scroll;
  gap: 16px;
}
.place-item {
  max-width: 120px;
  height: 200px;
  cursor: pointer;
}
.place-img {
  width: 100%;
  height: 65%;
  // aspect-ratio: 3 / 4;
  border-radius: 5px;
  object-fit: cover;
}
.new-place-name {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
}
.place-addr {
  width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: $color-gray03;
  font-size: 12px;
}
.place-star {
  display: flex;
  align-items: center;
  gap: 2px;
}
.star-number {
  font-size: 14px;
  font-weight: 500;
}
.review-number {
  color: $color-gray03;
  font-size: 12px;
}
</style>
