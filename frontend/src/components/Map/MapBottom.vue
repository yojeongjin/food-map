<template>
  <div class="wrapper" ref="sheet">
    <div class="content" ref="content">
      <!-- bottom handle -->
      <div class="bottom-handle">
        <div class="handle"></div>
      </div>
      <!-- map content -->
      <div class="map-contents">
        <div>
          <span class="map-distance">
            <i-fluent:location-12-filled
              width="12"
              height="12"
              style="margin-right: 2px"
              color="#fa4b21"
            />
            {{ location === '' ? '현재위치' : `${location}` }}에서
            {{ selectedData.distance }}m
          </span>
          <h1 class="map-title">
            {{ selectedData.place_name }}
            <span class="map-category">{{ selectedData.category }}</span>
          </h1>

          <p class="map-info">
            {{ selectedData.address_name }}
          </p>
        </div>

        <!-- ul/li -->
        <ul class="info-menu">
          <li class="info-item" @click="goToKakaoMap(selectedData.id)">
            <i-ic:baseline-directions class="info-icon" />
            <span>길안내</span>
          </li>
          <li class="info-item">
            <i-mdi:pencil class="info-icon" />
            리뷰쓰기
          </li>
          <li class="info-item">
            <i-mage:phone-fill class="info-icon" />
            <span>예약·전화</span>
          </li>
          <li class="info-item">
            <i-fluent:heart-24-filled
              width="24px"
              height="24px"
              color="#fac1af"
            />
            찜하기
          </li>
        </ul>
      </div>

      <div class="division"></div>

      <!-- review content -->
      <div class="review-content">
        <div class="review-title-area">
          <h2>평점</h2>
          <span class="review-grade">
            <i-material-symbols:star-rounded class="grade-star" />
            3.5
          </span>
          <span class="number-of-grade">(1)</span>
        </div>
        <!-- 리뷰없음 -->
        <!-- <div class="non-review">
          <img
            class="non-review-img"
            src="../../assets/level0.png"
            alt="none-review-img"
          />
          아직 등록된 리뷰가 없습니다.
        </div> -->
        <!-- 리뷰있음 -->
        <ul>
          <li class="review-item">
            <div class="review-area">
              <div class="review-img-box">
                <img
                  src="../../assets/level1.png"
                  alt="none-review-img"
                  class="review-user-img"
                />
              </div>

              <div class="review-user-info">
                <div class="review-title">
                  <h4 class="review-user">쩝쩝박사</h4>
                  <span class="review-date">25.03.10</span>
                </div>

                <div class="review-star">
                  <span class="ico-star-group">
                    <span
                      class="ico-star-group-fill"
                      style="width: 100%"
                    ></span>
                  </span>
                </div>
              </div>
            </div>

            <p class="review-text">어쩌구저쩌구 맛이 좋았어욜~~!</p>
          </li>

          <li class="review-item">
            <div class="review-area">
              <div class="review-img-box">
                <img
                  src="../../assets/main.png"
                  alt="none-review-img"
                  class="review-user-img"
                />
              </div>

              <div class="review-user-info">
                <div class="review-title">
                  <h4 class="review-user">쩝쩝박사</h4>
                  <span class="review-date">25.03.10</span>
                </div>

                <div class="review-star">
                  <span class="ico-star-group">
                    <span class="ico-star-group-fill" style="width: 40%"></span>
                  </span>
                </div>
              </div>
            </div>

            <p class="review-text">어쩌구저쩌구 맛이 좋았어욜~~!</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue'

// bottom sheet 제어
const MIN_Y = 60
const MAX_Y = window.innerHeight - 260

const sheet = ref(null)
const content = ref(null)

const metrics = ref({
  touchStart: { sheetY: 0, touchY: 0 },
  touchMove: { prevTouchY: 0, movingDirection: 'none' },
  isContentAreaTouched: false,
})

onMounted(() => {
  const canUserMoveBottomSheet = () => {
    const { touchMove, isContentAreaTouched } = metrics.value
    if (!isContentAreaTouched) return true
    if (sheet.value?.getBoundingClientRect().y !== MIN_Y) return true
    if (touchMove.movingDirection === 'down') {
      return content.value?.scrollTop <= 0
    }
    return false
  }

  const handleTouchStart = (e) => {
    const { touchStart } = metrics.value
    touchStart.sheetY = sheet.value?.getBoundingClientRect().y ?? 0
    touchStart.touchY = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    const { touchStart, touchMove } = metrics.value
    const currentTouchY = e.touches[0].clientY

    if (!touchMove.prevTouchY || touchMove.prevTouchY === 0) {
      touchMove.prevTouchY = touchStart.touchY
    }

    touchMove.movingDirection =
      touchMove.prevTouchY < currentTouchY ? 'down' : 'up'

    if (canUserMoveBottomSheet()) {
      e.preventDefault()
      let nextSheetY = touchStart.sheetY + (currentTouchY - touchStart.touchY)
      nextSheetY = Math.max(MIN_Y, Math.min(nextSheetY, MAX_Y))
      sheet.value.style.transform = `translateY(${nextSheetY - MAX_Y}px)`
    } else {
      document.body.style.overflowY = 'hidden'
    }
  }

  const handleTouchEnd = () => {
    document.body.style.overflowY = 'auto'
    const { touchMove } = metrics.value
    const currentSheetY = sheet.value?.getBoundingClientRect().y ?? 0

    if (currentSheetY !== MIN_Y) {
      if (touchMove.movingDirection === 'down') {
        sheet.value.style.transform = 'translateY(0)'
      } else if (touchMove.movingDirection === 'up') {
        sheet.value.style.transform = `translateY(${MIN_Y - MAX_Y}px)`
      }
    }

    // Reset
    metrics.value = {
      touchStart: { sheetY: 0, touchY: 0 },
      touchMove: { prevTouchY: 0, movingDirection: 'none' },
      isContentAreaTouched: false,
    }
  }

  sheet.value?.addEventListener('touchstart', handleTouchStart)
  sheet.value?.addEventListener('touchmove', handleTouchMove)
  sheet.value?.addEventListener('touchend', handleTouchEnd)

  content.value?.addEventListener('touchstart', () => {
    metrics.value.isContentAreaTouched = true
  })
})

// 길안내
const goToKakaoMap = (id) => {
  window.open(`https://map.kakao.com/link/to/${id}`, '_blank')
}

// map에서 넘어온 값
const props = defineProps({
  selectedData: Object,
  location: String,
})
const emit = defineEmits(['close'])

// 외부 클릭 감지
const onClickOutside = (e) => {
  const path = e.composedPath?.() || []
  if (!path.includes(sheet.value)) {
    emit('close')
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    document.addEventListener('mousedown', onClickOutside)
  })
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff;
  position: fixed;
  top: calc(100% - 290px);
  left: 0;
  right: 0;
  width: 100%;
  max-width: 720px;
  min-width: 280px;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  border-radius: 24px 24px 0 0;
  transition: transform 0.5s ease-out;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 10;
}
.content {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.bottom-handle {
  position: relative;
  height: 24px;
  padding: 8px 0 0;
  border-radius: 24px 24px 0 0;
  .handle {
    background-color: #dee2e6;
    width: 40px;
    height: 4px;
    border-radius: 2px;
    margin: auto;
  }
}
.map-contents {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  .map-distance {
    display: inline-block;
    color: $color-primary;
    font-size: 13px;
    font-weight: 500;
  }
  .map-title {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    font-size: 20px;
    font-weight: 600;
    margin: 4px 0 6px;
  }
  .map-category {
    font-size: 13px;
    font-weight: 400;
    color: $color-gray03;
  }
  .map-info {
    color: $color-gray02;
  }
  // ul
  .info-menu {
    display: flex;
    align-items: center;
    padding: 6px 0;
    .info-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      gap: 6px;
      border-right: 1px solid #ebebeb;
      color: #333;
      cursor: pointer;
      &:last-child {
        border-right: none;
      }
      .info-icon {
        width: 24px;
        height: 24px;
        color: #b3b1b1;
      }
    }
  }
}
.division {
  background-color: $color-gray06;
  height: 12px;
}
// 리뷰
.review-content {
  padding: 24px;
  // height: calc(100% - 270px);

  .review-title-area {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .review-grade {
    display: flex;
    // color: $color-primary;
    color: darken($color-primary, 15%);
    font-size: 15px;
    font-weight: 500;
    .grade-star {
      position: relative;
      top: 2px;
      right: -1px;
    }
  }
  .number-of-grade {
    color: #c8c8c8;
    font-size: 15px;
    font-weight: 400;
  }

  .non-review {
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: $color-gray02;
    .non-review-img {
      display: block;
      width: 120px;
      height: 120px;
      margin: 0 auto;
      opacity: 0.6;
    }
  }

  .review-item {
    width: 100%;
    padding: 24px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    &:last-child {
      border-bottom: none;
    }
  }
  .review-area {
    display: flex;
    gap: 8px;
  }
  .review-user-info {
    width: calc(100% - 48px);
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
  }
  .review-img-box {
    background-color: $color-gray06;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 0.5px solid #c8c8c8;
  }
  .review-user-img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .review-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .review-user {
      font-size: 15px;
    }
    .review-date {
      color: $color-gray03;
    }
  }
  .review-star {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
  }
  .ico-star-group {
    background: url('../../assets/svg/star.svg') no-repeat center left;
    position: relative;
    display: inline-block;
    width: 80px;
    height: 23px;
    .ico-star-group-fill {
      background: url('../../assets/svg/star-filled.svg') no-repeat center left;
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .review-text {
    margin-top: 16px;
    line-height: 24px;
  }
}
</style>
