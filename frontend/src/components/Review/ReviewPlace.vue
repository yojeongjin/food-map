<template>
  <div class="review-place-area">
    <div class="review-modal-inner" ref="outside" @mousedown.stop>
      <!-- 검색 input -->
      <div class="search-area">
        <i-lucide:search width="16px" height="16px" color="#837466" />
        <input
          type="text"
          v-model="place"
          @keyup.enter="search"
          placeholder="상호명으로 검색해주세요"
          class="search-text"
        />
        <button type="button" class="search-btn" @click="search">검색</button>
      </div>
      <!-- 검색 결과 -->
      <div class="search-data-area">
        <!-- 결과 있음 -->
        <ul class="search-data-menu" v-if="placeDatas.length !== 0">
          <li
            class="search-data-item"
            v-for="placeData in placeDatas"
            :key="placeData.id"
            :data-code="placeData.id"
            @click.stop="() => setPlaceInfo(placeData)"
          >
            <div class="result-header">
              <i-ic:baseline-local-cafe
                v-if="getCategory(placeData) === '카페'"
                class="icon"
              />
              <i-lsicon:rice-filled
                v-else-if="getCategory(placeData) === '한식'"
                class="icon"
              />
              <i-stash:burger-duotone
                v-else-if="getCategory(placeData) === '양식'"
                class="icon"
              />
              <i-ri:beer-fill
                v-else-if="getCategory(placeData) === '술집'"
                class="icon"
              />

              <i-maki:restaurant-sushi
                v-else-if="getCategory(placeData) === '일식'"
                class="icon"
              />
              <i-icon-park-solid:noodles
                v-else-if="getCategory(placeData) === '중식'"
                class="icon"
              />
              <i-icon-park-twotone:chicken
                v-else-if="getCategory(placeData) === '치킨'"
                class="icon"
              />
              <i-emojione-monotone:bread
                v-else-if="getCategory(placeData) === '간식'"
                class="icon"
              />
              <i-fluent:bowl-salad-24-filled
                v-else-if="getCategory(placeData) === '샐러드'"
                class="icon"
              />
              <i-icon-park-solid:fork-spoon v-else class="icon" />
              <h2>{{ placeData.place_name }}</h2>
            </div>
            <p class="data-addr">{{ placeData.address_name }}</p>
          </li>
        </ul>
        <!-- 결과 없음 -->
        <div class="none-data-area" v-if="placeDatas.length === 0">
          <img
            src="../../assets/level0.png"
            alt="none-icon"
            class="none-data-img"
          />
          검색 결과가 없어요
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  emits: ['close'],
  data() {
    return {
      place: '',
      placeDatas: [],
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  },
  methods: {
    async search() {
      try {
        const res = await axios.get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${this.place}`,
          {
            headers: {
              Authorization: `KakaoAK d8e05b2c204f0cffe4321c9276c9ab24`,
            },
          },
        )
        this.placeDatas = res.data.documents
        console.log(res.data.documents)
      } catch (err) {
        console.error(err)
      }
    },
    getCategory(placeData) {
      try {
        return placeData.category_name.split('>')[1].trim()
      } catch {
        return null
      }
    },
    setPlaceInfo(placeData) {
      this.$store.dispatch('reviewPlace/getSave', placeData)
      this.$emit('close')
    },
    handleClickOutside(e) {
      if (!this.$refs.outside?.contains(e.target)) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.review-place-area {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
}
.review-modal-inner {
  background: #fff;
  width: 100%;
  max-width: 720px;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 24px 16px;
  border: 1px solid black;
}

.search-area {
  // background-color: #fbf8f5;
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.search-text {
  background-color: transparent;
  width: calc(100% - 80px);
  height: 100%;
  padding: 0 12px;
  font-size: 15px;
}
.search-btn {
  background-color: $color-primary;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
// 결과 데이터
.search-data-area {
  height: calc(100% - 50px);
  overflow-y: scroll;
}
.search-data-menu {
}
.search-data-item {
  display: flex;
  flex-direction: column;
  // gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  &:hover {
    background-color: #fbfaf9;
  }
}
.result-header {
  display: flex;
  align-items: center;
  gap: 4px;
  color: $color-gray02;
}
.icon {
  width: 17px;
  height: 17px;
}
.data-addr {
  margin-left: 22px;
  color: $color-gray03;
}
.none-data-area {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // color: $color-primary;
  color: #898887;
}
.none-data-img {
  display: block;
  width: 120px;
  height: auto;
  opacity: 0.8;
}
</style>
