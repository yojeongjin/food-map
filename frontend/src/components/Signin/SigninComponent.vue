<template>
  <main>
    <article>
      <img src="../../assets/logo-2.png" alt="logo" class="logo" />
      <!-- input -->
      <div class="input-area-wrapper">
        <div class="input-area">
          <div class="icon-box">
            <i-ph:cookie width="20px" height="20px" />
          </div>
          <input class="input-box" placeholder="아이디를 입력하세요" />
        </div>
        <div class="input-area">
          <div class="icon-box">
            <i-bytesize:lock width="20px" height="20px" />
          </div>
          <input class="input-box" placeholder="비밀번호를 입력하세요" />
        </div>
      </div>
      <!-- btn -->
      <button class="apply-btn">로그인</button>
      <button class="join-btn">회원가입</button>
    </article>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);
}
article {
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  gap: 24px;
  margin: 0 auto;
}
.logo {
  width: 240px;
}
.input-area-wrapper {
  display: flex;
  flex-flow: column;
  gap: 16px;
}
.input-area {
  width: 295px;
  height: 48px;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.icon-box {
  display: flex;
  align-items: center;
  padding: 0 12px;
}
.input-box {
  width: calc(100% - 48px);
  &::placeholder {
    color: #ccc;
  }
}
.apply-btn {
  background-color: $color-primary;
  width: 295px;
  height: 48px;
  font-weight: 600;
  color: #fff;
  border-radius: 8px;
}
.join-btn {
  font-weight: 500;
}
</style>
