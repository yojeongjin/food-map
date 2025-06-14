<template>
  <header>
    <div class="inner">
      <img src="../../assets/logo-1.png" alt="로고" class="logo" />

      <button type="button" class="menu-button">
        <svg
          fill="#262b39"
          width="23px"
          height="23px"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#262b39"
          stroke-width="19.2"
        >
          <path
            d="M1920 1468.412v112.94H0v-112.94h1920Zm0-564.706v112.941H0V903.706h1920ZM1920 339v112.941H0V339h1920Z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 720px;
  min-width: 280px;
  .inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px 0 24px;
    height: 50px;
    .logo {
      display: block;
      height: 22px;
    }
    .menu-button {
      height: 100%;
      padding: 0 12px;
    }
  }
}
</style>
