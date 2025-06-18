<template>
  <section>
    <!-- 검색창 -->
    <div class="search-base">
      <i-lucide:search width="16px" height="16px" />
      <input
        type="text"
        v-model="keyword"
        @keyup.enter="search"
        placeholder="어디 주변 맛집을 찾고 있나요?"
        class="search-text"
      />
    </div>
    <!-- 카테고리 -->
    <ul class="category-menu">
      <li
        class="category-item"
        :class="{ select: selected === category.category }"
        v-for="category in categories"
        :key="category.id"
        :data-code="category.id"
        @click="select(category.category)"
      >
        <span class="emoji">{{ category.emoji }}</span>
        <span>{{ category.category }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    latitude: Number,
    longitude: Number,
    location: String,
  },
  data() {
    return {
      keyword: this.location,
      categories: [
        {
          id: 0,
          emoji: '🍴',
          category: '전체',
        },
        {
          id: 1,
          emoji: '🍚',
          category: '한식',
        },
        {
          id: 2,
          emoji: '🍔',
          category: '양식',
        },
        {
          id: 3,
          emoji: '🍜',
          category: '중식',
        },
        {
          id: 4,
          emoji: '🍣',
          category: '일식',
        },
        {
          id: 5,
          emoji: '☕️',
          category: '카페',
        },
        {
          id: 6,
          emoji: '🍗',
          category: '술집',
        },
      ],
      selected: '전체',
    }
  },
  methods: {
    search() {
      this.selected = '전체'

      this.$store.dispatch('place/searchPlaces', {
        keyword: this.keyword + '맛집',
      })

      this.$emit('updateLocation', this.keyword)
    },
    select(category) {
      this.selected = category

      if (this.keyword === '') {
        this.$store.dispatch('place/searchPlaces', {
          keyword: category === '전체' ? '맛집' : category,
          location: {
            lat: this.latitude,
            lng: this.longitude,
          },
        })
        return
      }

      if (category === '전체') {
        this.$store.dispatch('place/searchPlaces', {
          keyword: this.keyword + '맛집',
        })
      } else {
        this.$store.dispatch('place/searchPlaces', {
          keyword: this.keyword + `${category}`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  background-color: transparent;
  position: absolute;
  top: 24px;
  left: 16px;
  right: 16px;
  z-index: 10;
}
.search-base {
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 4px;
}
.search-text {
  width: calc(100% - 50px);
  height: 100%;
  // font-size: 16px;
}
.category-menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 4px;
  overflow-x: scroll;
  font-size: 13px;
}
.category-item {
  background-color: #fff;
  min-width: 64px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  gap: 2px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 4px;
  &.select {
    background-color: $color-primary;
    color: #fff;
    font-weight: 500;
  }
  .emoji {
    background-color: #fff;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
    margin-left: -3px;
  }
}
</style>
