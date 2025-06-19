<template>
  <div
    v-if="selectedData"
    class="wrapper"
    :class="{ desktop: !isMobile() }"
    ref="sheet"
  >
    <div class="content" ref="content">
      <!-- bottom handle -->
      <div class="bottom-handle">
        <div class="handle"></div>
      </div>
      <!-- map content -->
      <div class="map-contents-area">
        <div class="map-contents">
          <span class="map-distance">
            <i-fluent:location-12-filled
              width="12"
              height="12"
              style="margin-right: 2px"
              color="#fa4b21"
            />
            {{ location === '' ? '현재위치' : `${location}` }}에서
            {{ selectedData?.distance }}m
          </span>
          <h1 class="map-title">
            {{ selectedData?.place_name }}
            <span class="map-category">{{ selectedData?.category }}</span>
          </h1>

          <p class="map-info">
            {{ selectedData?.address_name }}
          </p>
        </div>

        <!-- ul/li -->
        <ul class="info-menu">
          <li class="info-item" @click="goToKakaoMap(selectedData?.id)">
            <i-ic:baseline-directions class="info-icon" />
            <span>길안내</span>
          </li>

          <li class="info-item" @click="contactToPlace(selectedData?.phone)">
            <i-mage:phone-fill class="info-icon" />
            <span>예약·전화</span>
          </li>
          <li
            class="info-item"
            @click="isLogin ? goToReviewPage(selectedData) : showLoginModal()"
          >
            <i-mdi:pencil class="info-icon" />
            리뷰쓰기
          </li>
          <!-- ====== 회원 ====== -->
          <li
            v-if="isLogin && selectedData"
            class="info-item"
            @click="
              isLiked
                ? deleteFavorite(selectedData?.id)
                : addFavorite(selectedData)
            "
          >
            <i-fluent:heart-24-filled
              width="24px"
              height="24px"
              :color="isLiked ? '#ff6333' : '#fac1af'"
            />
            {{ isLiked ? '찜했어요' : '찜하기' }}
          </li>
          <!-- ====== 회원 ====== -->

          <!-- ====== 비회원 ====== -->
          <li v-else class="info-item" @click="showLoginModal()">
            <i-fluent:heart-24-filled
              width="24px"
              height="24px"
              color="#fac1af"
            />
            찜하기
          </li>
          <!-- ====== 비회원 ====== -->
        </ul>
      </div>

      <div class="division"></div>

      <!-- review content -->
      <!-- ====== 리뷰없음 ====== -->
      <div v-if="!hasReview" class="review-content">
        <div class="review-title-area">
          <h2>리뷰</h2>
          <i-material-symbols:star-rounded class="grade-star" color="black" />
          <span class="review-grade"> 0 </span>
          <span class="number-of-grade">(0)</span>
        </div>
        <div class="non-review">
          <img
            class="non-review-img"
            src="https://voca-bucket.s3.ap-northeast-2.amazonaws.com/level0.webp"
            alt="none-review-img"
          />
          아직 등록된 리뷰가 없습니다.
        </div>
      </div>
      <!-- ====== 리뷰있음 ====== -->
      <div v-else class="review-content" :class="{ desktop: !isMobile() }">
        <div class="review-title-area">
          <h2>리뷰</h2>
          <i-material-symbols:star-rounded class="grade-star" color="#ff6333" />
          <span class="review-grade">{{ avgRating }}</span>
          <span class="number-of-grade">({{ total }})</span>
        </div>
        <ul>
          <li class="review-item" v-for="review in reviews" :key="review.id">
            <div class="review-area">
              <div class="review-img-box">
                <img
                  :src="review.photo"
                  alt="none-review-img"
                  class="review-user-img"
                />
              </div>

              <div class="review-user-info">
                <div class="review-title">
                  <h4 class="review-user">{{ review.nickname }}</h4>
                  <span class="review-date">{{
                    formatDate(review.created_at)
                  }}</span>
                </div>

                <div class="review-star">
                  <span class="ico-star-group">
                    <span
                      class="ico-star-group-fill"
                      :style="{ width: (review.review_rate / 5) * 100 + '%' }"
                    ></span>
                  </span>
                  <span class="point">{{
                    Number(review.review_rate).toFixed(1)
                  }}</span>
                </div>
              </div>
            </div>
            <div class="review-text-area">
              <img :src="review.review_img" class="review-img" />
              <p class="review-text">{{ review.review_content }}</p>
            </div>
          </li>
        </ul>

        <button
          v-if="hasMore && !isFetching"
          class="load-more-btn"
          @click="loadMoreReviews"
        >
          더보기
        </button>
      </div>
    </div>
  </div>
</template>

<!-- ===================SCRIPT================= -->
<script setup>
import { ref, onMounted, onUnmounted, defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// axios
import axios from 'axios'
import axiosInstance from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'
// utils
import { showLoginModal } from '../../../utils/loginModal'
// dayjs
import dayjs from 'dayjs'

const router = useRouter()
const hasReview = computed(() => reviews?.value?.length > 0)

const store = useStore()
const user = computed(() => store.state.user.user)
const isLogin = computed(() => !!user.value)

const isLiked = computed(() => {
  if (!user.value || !Array.isArray(user.value.favorite_places)) return false
  return user.value.favorite_places
    .map(Number)
    .includes(Number(props.selectedData?.id))
})

// review
const page = ref(1)
const hasMore = ref(true)
const isFetching = ref(false)

const loadMoreReviews = () => {
  page.value++
  getReview(props.selectedData.id, page.value)
}

const MIN_Y = 60
const MAX_Y = window.innerHeight - 260
const sheet = ref(null)
const content = ref(null)
const reviews = ref([])
const avgRating = ref(0)
const total = ref(0)
const metrics = ref({
  touchStart: { sheetY: 0, touchY: 0 },
  touchMove: { prevTouchY: 0, movingDirection: 'none' },
  isContentAreaTouched: false,
})
const formatDate = (datetime) => {
  return dayjs(datetime).format('YY.MM.DD')
}

// map에서 넘어온값
const props = defineProps({
  selectedData: Object,
  location: String,
})
const emit = defineEmits(['close'])

// 디바이스 판단
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

// 외부 클릭 감지
const onClickOutside = (e) => {
  const path = e.composedPath?.() || []
  if (!path.includes(sheet.value)) emit('close')
}

onMounted(() => {
  requestAnimationFrame(() => {
    document.addEventListener('mousedown', onClickOutside)
  })
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

onMounted(() => {
  if (!isMobile()) return

  const handleTouchStart = (e) => {
    const touchY = e.touches[0].clientY
    const sheetY = sheet.value?.getBoundingClientRect().y ?? 0

    metrics.value.touchStart = { sheetY, touchY }
    metrics.value.touchMove = { prevTouchY: 0, movingDirection: 'none' }
    metrics.value.isContentAreaTouched = content.value?.contains(e.target)
  }

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY
    const deltaY = touchY - metrics.value.touchStart.touchY
    const contentEl = content.value

    const scrollTop = contentEl?.scrollTop ?? 0
    const isAtTop = scrollTop <= 0
    const isDraggingDown = deltaY > 0
    const isContent = metrics.value.isContentAreaTouched

    // 시트 드래그 조건: (1) 외부 영역 or (2) 내부 영역 + 스크롤 맨 위 + 아래로 끌기
    if (!isContent || (isAtTop && isDraggingDown)) {
      e.preventDefault()

      let nextY = metrics.value.touchStart.sheetY + deltaY
      nextY = Math.max(MIN_Y, Math.min(nextY, MAX_Y))
      sheet.value.style.transform = `translateY(${nextY - MAX_Y}px)`
    }
  }

  const handleTouchEnd = () => {
    const currentY = sheet.value?.getBoundingClientRect().y ?? MIN_Y

    if (currentY > MIN_Y + 100) {
      // 충분히 내려오면 닫기
      emit('close')
    } else {
      // 복귀
      sheet.value.style.transform = `translateY(${MIN_Y - MAX_Y}px)`
    }

    metrics.value = {
      touchStart: { sheetY: 0, touchY: 0 },
      touchMove: { prevTouchY: 0, movingDirection: 'none' },
      isContentAreaTouched: false,
    }
  }

  // 이벤트 등록
  sheet.value?.addEventListener('touchstart', handleTouchStart, {
    passive: true,
  })
  sheet.value?.addEventListener('touchmove', handleTouchMove, {
    passive: false,
  })
  sheet.value?.addEventListener('touchend', handleTouchEnd)
})

onMounted(() => {
  getReview(props.selectedData.id, 1)
})
// 전화걸기
const contactToPlace = (number) => {
  document.location.href = `tel:${number}`
}

// 길안내
const goToKakaoMap = (id) => {
  window.open(`https://map.kakao.com/link/to/${id}`, '_blank')
}

// 리뷰쓰기
const goToReviewPage = (place) => {
  store.dispatch('reviewPlace/getSave', place)
  router.push('/review')
}

// 찜하기
const addFavorite = async (place) => {
  try {
    const res = await axiosInstance.post('/v1/favorite', {
      placeId: place.id,
      placeName: place.place_name,
      placeAddr: place.address_name,
    })
    if (res.status === 200 && res.data.success) {
      if (Array.isArray(user.value.favorite_places)) {
        const updatedList = [
          ...user.value.favorite_places.map(Number),
          Number(place.id),
        ]
        user.value.favorite_places = updatedList
      } else {
        user.value.favorite_places = [Number(place.id)]
      }
    }
  } catch (err) {
    handleApiError(err)
  }
}

// 찜삭제
const deleteFavorite = async (id) => {
  try {
    const res = await axiosInstance.delete('/v1/favorite', {
      data: { placeId: id },
    })
    if (res.status === 200 && res.data.success) {
      if (Array.isArray(user.value.favorite_places)) {
        const updatedList = user.value.favorite_places
          .map(Number)
          .filter((pid) => pid !== Number(id))
        user.value.favorite_places = updatedList
      }
    }
  } catch (err) {
    handleApiError(err)
  }
}

// 리뷰 가져오기

const getReview = async (id, pageNum = 1) => {
  try {
    isFetching.value = true
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/review/${id}?page=${pageNum}`,
    )
    if (res.status === 200 && res.data.success) {
      const result = res.data.data
      const meta = res.data.meta

      if (pageNum === 1) {
        reviews.value = result
      } else {
        reviews.value.push(...result)
      }

      if (result.length < 3) {
        hasMore.value = false
      }

      avgRating.value = meta.avg_rating
      total.value = meta.total
    }
  } catch (err) {
    handleApiError(err)
  } finally {
    isFetching.value = false
  }
}
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
  &.desktop {
    top: 20%;
  }
}
.content {
  height: 100%;
  // overflow: auto;
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
.map-contents-area {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  .map-contents {
    padding: 0 8px;
  }
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
.division {
  background-color: $color-gray06;
  height: 12px;
}
// 리뷰
.review-content {
  padding: 24px;
  height: calc(100% - 260px);
  overflow-y: scroll;
  touch-action: auto;
  -webkit-overflow-scrolling: touch;
  &.desktop {
    height: calc(100% - 395px);
  }
}
.review-title-area {
  display: flex;
  align-items: center;
  // border: 1px solid black;
}
.review-grade {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-right: 6px;
}
.grade-star {
  position: relative;
  width: 22px;
  height: 22px;
  top: 1px;
  margin-left: 4px;
}
.number-of-grade {
  font-size: 14px;
  font-weight: 400;
  color: #999;
}

.non-review {
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: $color-gray02;
}
.non-review-img {
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  opacity: 0.6;
}
.review-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  &:last-child {
    border-bottom: none;
  }
}
.review-area {
  display: flex;
  gap: 8px;
}
.review-user-info {
  width: calc(100% - 42px);
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}
.review-img-box {
  background-color: $color-gray06;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 0.5px solid #c8c8c8;
}
.review-user-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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
  margin-right: 4px;
  width: 77px;
  height: 13px;
  // border: 1px solid red;
}
.ico-star-group-fill {
  background: url('../../assets/svg/star-filled.svg') no-repeat center left;
  position: absolute;
  top: 0;
  left: 0;
  // border: 1px solid black;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.point {
  color: #e95a4c;
  font-size: 13px;
  // font-weight: 400;
}

.review-text-area {
  display: flex;
  gap: 16px;
}

.review-img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.review-text {
}

.load-more-btn {
  margin: 12px auto 0;
  display: block;
  width: 100%;
  height: 52px;
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ccc;
  // border-radius: 12px;
}
</style>
