<template>
  <section>
    <div class="place-container">
      <div class="place-title">
        <h2>새로 등록된 맛집이에요</h2>
        <span class="title-label">NEW</span>
      </div>
      <!-- place info -->
      <ul class="place-menu">
        <li class="place-item">
          <img
            src="../../assets/newly2.jpg"
            alt="식당 사진"
            class="place-img"
          />
          <h4 class="place-name">가솔린앤로지스</h4>
          <p class="place-addr">서울시 마포구</p>
          <div class="place-star">
            <i-material-symbols-star width="16" height="16" color="#ff6333" />
            <span class="star-number">4.8</span>
            <span class="review-number">(2)</span>
          </div>
        </li>
        <li class="place-item">
          <img
            src="../../assets/newly1.jpg"
            alt="식당 사진"
            class="place-img"
          />
          <h4 class="place-name">가솔린앤로지스</h4>
          <p class="place-addr">서울시 마포구</p>
          <div class="place-star">
            <i-material-symbols-star width="16" height="16" color="#ff6333" />
            <span class="star-number">4.8</span>
            <span class="review-number">(2)</span>
          </div>
        </li>
        <li class="place-item">
          <img
            src="../../assets/newly3.jpg"
            alt="식당 사진"
            class="place-img"
          />
          <h4 class="place-name">가솔린앤로지스</h4>
          <p class="place-addr">서울시 마포구</p>
          <div class="place-star">
            <i-material-symbols-star width="16" height="16" color="#ff6333" />
            <span class="star-number">4.8</span>
            <span class="review-number">(2)</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.place-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0;
  .place-title {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
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
    .title-label {
      background-color: $color-secondary;
      padding: 3px 6px;
      font-size: 9px;
      border-radius: 6px;
      color: $color-primary;
    }
  }

  .place-menu {
    display: flex;
    overflow-x: scroll;
    gap: 8px;
    .place-item {
      min-width: 120px;
      height: 200px;
      .place-img {
        width: 100%;
        height: 65%;
        object-fit: fill;
      }
      .place-name {
        font-size: 14px;
        font-weight: 600;
      }
      .place-addr {
        color: $color-gray03;
        font-weight: 300;
        font-size: 12px;
      }
      .place-star {
        display: flex;
        align-items: center;
        .star-number {
          margin: 0 2px;
          font-weight: 600;
          font-size: 14px;
        }
        .review-number {
          color: $color-gray03;
          font-weight: 300;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
