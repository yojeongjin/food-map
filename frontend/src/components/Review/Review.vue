<template>
  <main>
    <!-- 위치 -->
    <div class="review-place-area">
      <h2>계인전 보타니카 치킨&버거 신사 가로수길점</h2>
      <p class="review-place-addr">경기 용인시 기흥구 한일로15번길 33</p>
    </div>
    <!-- 사진 -->
    <div class="review-photo-area">
      {{ imgMsg }}
      <input
        type="file"
        accept="image/*"
        ref="image"
        @change="onChangeFiles"
        class="review-photo-input"
      />
      <img v-if="imgUrl" :src="imgUrl" class="review-photo-preview" />
    </div>
    <!-- 별점 -->
    <div class="review-grade-area">
      <p class="review-grade-desc">이곳은 어떠셨나요?</p>

      <div class="review-grade-star">
        <template v-for="n in 5" :key="n">
          <div
            class="star-wrapper"
            @mousemove="handleMouseMove($event, n)"
            @click="handleClick($event, n)"
            @mouseleave="setHover(0)"
          >
            <!-- 빈 별 -->
            <Icon class="star empty" icon="material-symbols:star-rounded" />
            <!-- 채운 별 -->
            <div
              class="star-overlay"
              :style="{ width: getFillPercent(n) + '%' }"
            >
              <Icon class="star filled" icon="material-symbols:star-rounded" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 리뷰 -->
    <div class="review-area">
      <p class="review-grade-desc">상세한 리뷰를 작성해주세요</p>

      <textarea
        v-model="review"
        class="text-area"
        placeholder="맛, 분위기, 서비스 등"
      ></textarea>
    </div>
    <!-- 버튼 -->
    <div class="btn-area">
      <button class="apply-btn">리뷰 작성하기</button>
    </div>
  </main>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  data() {
    return {
      rating: 0, // 실제 선택된 별점
      hoverRating: 0, // 마우스 hover 중인 별점
      imgMsg: '사진을 업로드해주세요',
      imgUrl: null,
      reviewImg: null,
      review: '',
    }
  },
  methods: {
    // 별점
    setRating(value) {
      this.rating = value
    },
    setHover(value) {
      this.hoverRating = value
    },
    getFillPercent(index) {
      const value = this.hoverRating > 0 ? this.hoverRating : this.rating
      if (value >= index) return 100
      if (value + 0.5 === index) return 50
      return 0
    },
    handleMouseMove(event, index) {
      const { left, width } = event.currentTarget.getBoundingClientRect()
      const offsetX = event.clientX - left
      const isHalf = offsetX < width / 2
      const hoverValue = isHalf ? index - 0.5 : index
      this.setHover(hoverValue)
    },
    handleClick(event, index) {
      const { left, width } = event.currentTarget.getBoundingClientRect()
      const offsetX = event.clientX - left
      const isHalf = offsetX < width / 2
      const ratingValue = isHalf ? index - 0.5 : index
      this.setRating(ratingValue)
    },
    // 사진 업로드
    onChangeFiles(e) {
      const file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.reviewImg = file
      this.imgMsg = ''
    },
  },
  components: { Icon },
}
</script>

<style lang="scss" scoped>
main {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(var(--vh, 1vh) * 100);
  padding: 50px 24px 24px;
}
// 위치
.review-place-area {
}
.review-place-addr {
  color: $color-gray03;
}
// 사진
.review-photo-area {
  position: relative;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
  color: #81848e;
  cursor: pointer;
  .review-photo-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
  .review-photo-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
// 별점
.review-grade-area {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.review-grade-desc {
  color: #81848e;
  font-weight: 600;
  margin: 4px 0;
}
.review-grade-star {
  display: flex;
  gap: 4px;
}
.star-wrapper {
  position: relative;
  width: 42px;
  height: 42px;
}
.star {
  font-size: 42px;
  width: 42px;
  height: 42px;
  pointer-events: none;
}
.empty {
  color: #f0f0f0;
}
.star-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
}
.filled {
  color: $color-primary;
}

// 리뷰
.review-area {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.text-area {
  width: 100%;
  height: 80px;
  resize: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  &::placeholder {
    font-weight: 500;
    color: #7b7e8c;
  }
}
// 버튼
.btn-area {
  display: flex;
  justify-content: flex-end;
  height: 42px;
}
.apply-btn {
  background-color: $color-primary;
  height: 100%;
  padding: 0 16px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}
</style>
