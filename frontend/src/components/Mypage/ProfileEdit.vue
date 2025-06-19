<template>
  <section class="my-profile-section">
    <h2>프로필 수정</h2>
    <div class="edit-img-box-area">
      <div class="edit-img-box">
        <input
          type="file"
          accept="image/*"
          ref="image"
          @change="onChangeFiles"
          class="edit-photo-input"
        />
        <img v-if="imgUrl" :src="imgUrl" class="update-img-preview" />

        <div v-else class="edit-overlay">
          <i-ion:camera-sharp width="42px" height="42px" color="#f0f0f0" />
        </div>
        <img
          v-if="imgUrl === null"
          src="https://voca-bucket.s3.ap-northeast-2.amazonaws.com/main.webp"
          alt="main-profile"
          class="origin-img"
        />
      </div>
    </div>
    <div class="edit-profile-area">
      <label class="input-label">닉네임</label>
      <div class="input-area">
        <div class="icon-box">
          <i-ph:cookie width="22px" height="22px" />
        </div>
        <input
          v-model="nickname"
          class="input-box"
          placeholder="변경하실 닉네임을 입력하세요"
        />
      </div>
    </div>
    <button type="button" class="apply-btn" @click="updateProfile">
      저장하기
    </button>
  </section>
</template>

<script>
import axios from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'

export default {
  data() {
    return {
      nickname: this.$store.state.user.user.nickname,
      imgUrl: null,
      profileImg: null,
    }
  },
  methods: {
    onChangeFiles(e) {
      const file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.profileImg = file
    },
    // update profile
    async updateProfile() {
      let form = new FormData()

      // 닉네임이 변경되었을 때만 추가
      if (this.nickname && this.nickname !== this.user.nickname) {
        form.append('nickname', this.nickname)
      }

      // 이미지가 선택되었을 때만 추가
      if (this.profileImg) {
        form.append('image', this.profileImg)
      }

      // 둘 다 변경 안 했을 경우 알림 후 return
      if (
        !this.profileImg &&
        (!this.nickname || this.nickname === this.user.nickname)
      ) {
        this.$toast('변경된 내용이 없습니다.')
        return
      }

      try {
        const res = await axios.patch('/v1/user/profile', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        })
        if (res.status === 200 && res.data.success) {
          this.$toast('수정이 완료되었습니다!')
          await this.$store.dispatch('user/getUser')
          this.$router.replace('/')
        }
      } catch (err) {
        handleApiError(err)
      }
    },
  },
  computed: {
    // 유저정보
    user() {
      return this.$store.state.user.user
    },
  },
}
</script>

<style lang="scss" scoped>
.my-profile-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  text-align: center;
}

.edit-img-box-area {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-img-box {
  position: relative;
  background-color: #f5f5f5;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  cursor: pointer;

  .edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .origin-img {
    display: block;
    width: 90%;
    height: 90%;
    margin: 0 auto;
    object-fit: cover;
  }
  .edit-photo-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 100;
    border: 1px solid red;
  }
  .update-img-preview {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 50%;
  }
}

.edit-profile-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}
.input-label {
  font-size: 14px;
  font-weight: 500;
}
.input-area {
  width: 100%;
  height: 50px;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.icon-box {
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.input-box {
  width: calc(100% - 60px);
  font-size: 15px;
  &::placeholder {
    color: #ccc;
  }
}
.apply-btn {
  background-color: $color-primary;
  width: 100%;
  height: 50px;
  font-weight: 600;
  color: #fff;
  border-radius: 8px;
}
</style>
