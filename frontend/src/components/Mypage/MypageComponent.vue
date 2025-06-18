<template>
  <main>
    <MyProfile />
    <div class="division"></div>

    <!-- 필터 -->
    <MypageFilter
      :filters="filters"
      v-model:selected="selected"
      @updateSelect="updateSelect"
    />
    <div class="myinfo-area">
      <MyReview v-if="selected === '나의 리뷰'" />
      <MyPlace v-else-if="selected === '찜한 맛집'" />
    </div>
  </main>
</template>

<script>
import MyPlace from './MyPlace.vue'
import MyProfile from './MyProfile.vue'
import MyReview from './MyReview.vue'
import MypageFilter from './MypageFilter.vue'

export default {
  data() {
    return {
      filters: [
        {
          id: 0,
          filter: '나의 리뷰',
        },
        {
          id: 1,
          filter: '찜한 맛집',
        },
      ],
      selected: '나의 리뷰',
    }
  },
  methods: {
    updateSelect(val) {
      this.selected = val
    },
  },
  components: { MyProfile, MypageFilter, MyReview, MyPlace },
}
</script>

<style lang="scss" scoped>
main {
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  padding: 50px 0 0;
  overflow-y: scroll;
}
.division {
  background-color: $color-gray06;
  height: 12px;
}
.myinfo-area {
  height: calc(100% - 180px);
  // border: 5px solid red;
}
</style>
