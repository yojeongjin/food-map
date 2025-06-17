<template>
  <section class="board-section">
    <ul class="board-list-area">
      <li class="board-list-item">
        <!-- 게시물 타이틀  -->
        <div class="list-title">
          <div class="user-img-box">
            <img
              src="../../assets/main.png"
              alt="user-character"
              class="user-img"
            />
          </div>

          <div class="user-info-area">
            <div class="user-info">
              <h4 class="user-nickname">사당보다먼나는야닉네임</h4>
              <span class="list-date">2025.01.03</span>
            </div>
            <div class="grade">
              <i-material-symbols:star-rounded width="14px" height="14px" /> 4.0
            </div>
          </div>
        </div>
        <!-- 게시글 -->
        <div class="board-content-area">
          <div class="board-text">어쩌구가 저쩌구다 닐리리맘보다 이말이야</div>
          <img
            src="../../assets/newly1.jpg"
            alt="review-photo"
            class="board-img"
          />
          <div class="review-place-area">
            <div class="review-save">
              <button class="save-btn" type="button">
                <i-fluent:heart-24-filled />
              </button>
            </div>
            <div class="review-place">
              <h4 class="user-nickname">공간상점</h4>
              <p class="place-addr">경기 수원시 팔달구 화서문로 41번길 26</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.board-section {
  height: 100%;
}
.board-list-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.board-list-item {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.list-title {
  display: flex;
  align-items: center;
}
.user-img-box {
  background-color: $color-gray06;
  display: block;
  width: 46px;
  height: 46px;
  border: 1px solid #f0f0f0;
  border-radius: 50%;

  .user-img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
.user-info-area {
  width: calc(100% - 60px);
  margin-left: 12px;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-nickname {
  font-size: 14px;
  font-weight: 500;
}
.list-date {
  color: $color-gray04;
  font-size: 13px;
}
.grade {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: $color-primary;
}
.board-content-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.board-text {
}

.board-img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
}
.review-place-area {
  background-color: #fbfaf9;
  border: 1px solid #f0f0f0;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  gap: 16px;
  cursor: pointer;
}
.review-save {
  display: flex;
  align-items: center;
}
.save-btn {
  font-size: 22px;
  color: #ddd;
}
.review-place {
}
.place-addr {
  color: $color-gray03;
  font-size: 13px;
}
</style>
