<template>
  <section class="my-place-section">
    <ul class="my-place-menu">
      <li class="my-place-item">
        <img
          src="../../assets/newly2.jpg"
          alt="place-img"
          class="my-place-img"
        />
        <div class="my-place-info">
          <h4 class="my-place-name">더플라잉팬레드</h4>
          <div class="my-place-rate">
            <i-material-symbols:star-rounded
              width="16x"
              height="16px"
              color="#ff6333"
            />
            4.0
          </div>
          <p class="my-place-addr">경기도 수원시 어쩌구구구</p>
        </div>
      </li>
      <li class="my-place-item">
        <img
          src="../../assets/newly1.jpg"
          alt="place-img"
          class="my-place-img"
        />
        <div class="my-place-info">
          <h4 class="my-place-name">빠델리파파</h4>
          <div class="my-place-rate">
            <i-material-symbols:star-rounded
              width="16x"
              height="16px"
              color="#ff6333"
            />
            4.0
          </div>
          <p class="my-place-addr">경기도 수원시 어쩌구구구</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.my-place-section {
}
.my-place-menu {
}
.my-place-item {
  display: flex;
  padding: 24px;
  gap: 12px;
  border-bottom: 1px solid #eee;
}
.my-place-img {
  width: 75px;
  height: 75px;
  border-radius: 8px;
}
.my-place-info {
}
.my-place-name {
  font-size: 16px;
  font-weight: 600;
}
.my-place-rate {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}
.my-place-addr {
  color: $color-gray03;
  font-size: 13px;
}
</style>
