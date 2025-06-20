<template>
  <section>
    <div class="search-container">
      <h2>지도에서 맛집 찾기</h2>
      <p class="serch-info">내 주변의 가까운 맛집을 찾아보세요</p>
      <!-- btn -->
      <RouterLink to="/find">
        <button type="button" class="apply-btn">맛집 찾기</button>
      </RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.search-container {
  padding: 12px 0;
  .serch-info {
    color: $color-gray03;
    margin: 6px 0 12px;
  }
  .apply-btn {
    background-color: $color-primary;
    position: relative;
    width: 100%;
    height: 52px;
    margin-top: 16px;
    border-radius: 8px;
    color: $color-gray06;
    font-size: 15px;
    font-weight: 600;
    &::after {
      content: '';
      background-image: url('https://voca-bucket.s3.ap-northeast-2.amazonaws.com/search.webp');
      width: 55px;
      height: 55px;
      position: absolute;
      top: -45px;
      right: 0;
      z-index: 10px;
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
}
</style>
