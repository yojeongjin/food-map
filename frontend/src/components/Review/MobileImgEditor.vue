<template>
  <div class="editor-area">
    <div class="editor-inner">
      <div class="edit-title">
        <h2>사진 수정</h2>
        <p class="edit-desc">
          📸 사진을 원하는 크기로 크롭 하세요! <br />
          (업로드 권장 비율은 4:3 비율입니다.)
        </p>
        <button class="close-btn" @click="$emit('close')">
          <i-line-md:close />
        </button>
      </div>
      <!-- 이미지 크롭 -->
      <div class="editor-wrap">
        <cropper
          ref="cropper"
          :src="imgUrl"
          :view-mode="1"
          :auto-crop-area="1"
          background="false"
          class="file-img"
        />
      </div>

      <div class="btn-area">
        <button class="apply-btn" @click="save">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'vue-cropperjs'

export default {
  components: { Cropper },
  props: {
    imgUrl: String,
  },
  data() {
    return {
      editUrl: null,
    }
  },
  methods: {
    save() {
      const croppedCanvas = this.$refs.cropper.getCroppedCanvas()
      if (!croppedCanvas) return

      const url = croppedCanvas.toDataURL('image/webp')
      this.editUrl = url

      const fileName = `cropped_${Date.now()}.webp`
      const bin = atob(url.split(',')[1])
      const array = []
      for (let i = 0; i < bin.length; i++) array.push(bin.charCodeAt(i))
      const file = new File([new Uint8Array(array)], fileName, {
        type: 'image/webp',
      })

      this.$emit('save', url)
      this.$emit('callParent', file)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.editor-area {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
}
.editor-inner {
  background: #fff;
  width: 100%;
  max-width: 720px;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 16px 24px;
  text-align: center;
}
.edit-title {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
}
.edit-desc {
  color: #81848e;
  font-size: 13px;
}
.editor-wrap {
  position: relative;
  width: 100%;
  max-height: calc(100% - 150px);
  display: flex;
  align-items: center;
  justify-content: center;

  ::v-deep(.cropper-container) {
    max-height: 100%;
    width: 100%;
  }
  ::v-deep(.cropper-container .cropper-canvas img) {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  .file-img {
    width: 100%;
    height: 100%;
  }
}
.btn-area {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.apply-btn {
  background-color: $color-primary;
  height: 42px;
  padding: 0 16px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
</style>
