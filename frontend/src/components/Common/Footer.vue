<template>
  <footer>
    <div class="footer-content">
      <h4 class="sub-title">© {{ new Date().getFullYear() }} 서치:잇</h4>
      <p class="sub-phar">Contact: osolku@naver.com</p>
      <p class="sub-phar">
        <!-- <a href="https://github.com/yojeongjin" target="_blank"> GitHub </a> -->
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  .footer-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12.5px;
    .footer-item {
      position: relative;
      margin: 0 16px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
        &::before {
          content: '';
          position: absolute;
          top: 3px;
          left: -16px;
          background-color: #9f9f9f;
          width: 1px;
          height: 12px;
        }
      }
    }
  }
  .footer-content {
    color: $color-gray05;

    .sub-title {
      margin: 10px 0;
      font-weight: 500;
      color: #4c4c4c;
    }
    .sub-phar {
      color: #9f9f9f;
      font-weight: 300;
      line-height: 1.6;
    }
  }
}
</style>
