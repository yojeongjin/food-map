<template>
  <main>
    <MyProfile />
    <div class="division"></div>

    <!-- 필터 -->
    <MypageFilter />

    <!-- <MyReview /> -->
    <MyPlace />
  </main>
</template>

<script>
import MyPlace from './MyPlace.vue'
import MyProfile from './MyProfile.vue'
import MyReview from './MyReview.vue'
import MypageFilter from './MypageFilter.vue'

export default {
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
</style>
