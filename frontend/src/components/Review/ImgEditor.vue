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

      <div class="editor-wrap">
        <!-- 이미지 크롭 -->
        <div class="canvas-wrap">
          <canvas
            id="canvas"
            ref="canvas"
            :width="canvasWidth"
            :height="canvasHeight"
          ></canvas>
          <img :src="imgUrl" class="file-img" @load="onImageLoad" />
        </div>

        <!-- 크롭된 결과물 -->
        <div class="img-wrap"></div>
      </div>

      <div class="btn-area">
        <button class="apply-btn" @click="[save(), $emit('close')]">
          저장하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: String,
  },
  data() {
    return {
      vueCanvas: null,
      vueCtx: null,
      modiCanvas: null,
      isStart: false,
      minSize: 20,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 0,
      sourceHeight: 0,
      targetHeight: 0,
      targetWidth: 0,
      canvasWidth: 420,
      canvasHeight: 520,
      canvasX: 0,
      canvasY: 0,
      editUrl: null,
    }
  },
  mounted() {
    let c = document.getElementById('canvas')
    let ctx = c.getContext('2d')
    this.vueCanvas = c
    this.vueCtx = ctx
  },
  methods: {
    onImageLoad() {
      this.$nextTick(() => {
        this.drawEvent()
      })
    },
    drawEvent() {
      const cX = this.$refs.canvas.getBoundingClientRect().left
      const cY = this.$refs.canvas.getBoundingClientRect().top

      this.canvasX = cX
      this.canvasY = cY

      this.vueCanvas.addEventListener('mousedown', (e) => {
        this.isStart = true

        this.startX = parseInt(e.clientX - this.canvasX, 10)
        this.startY = parseInt(e.clientY - this.canvasY, 10)
      })

      this.vueCanvas.addEventListener('mousemove', (e) => {
        if (!this.isStart) {
          return
        }
        this.endX = parseInt(e.clientX - this.canvasX, 10)
        this.endY = parseInt(e.clientY - this.canvasY, 10)

        this.vueCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.vueCtx.strokeStyle = '#fff'
        this.vueCtx.setLineDash([4, 5])
        this.vueCtx.strokeRect(
          this.startX,
          this.startY,
          this.endX - this.startX,
          this.endY - this.startY,
        )
      })
      this.vueCanvas.addEventListener('mouseup', () => {
        this.isStart = false

        this.vueCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

        if (
          Math.abs(this.endX - this.startX) < this.minSize ||
          Math.abs(this.endY - this.startY) < this.minSize
        ) {
          return
        }
        this.drawOut(
          this.startX,
          this.startY,
          this.endX - this.startX,
          this.endY - this.startY,
        )
      })
    },
    drawOut(x, y, width, height) {
      if (!this.imgUrl) {
        return
      }

      let imgWrap = document.querySelector('.img-wrap')
      let img = new Image()
      let targetCanvas = document.createElement('canvas')
      let targetCtx = targetCanvas.getContext('2d')

      this.modiCanvas = targetCanvas

      imgWrap.innerHTML = ''

      if (Math.abs(width) <= Math.abs(height)) {
        this.targetHeight = this.canvasHeight
        this.targetWidth = (this.targetHeight * width) / height
      } else {
        this.targetWidth = this.canvasWidth
        this.targetHeight = (this.targetWidth * height) / width
      }

      targetCanvas.width = this.targetWidth
      targetCanvas.height = this.targetHeight

      img.addEventListener('load', () => {
        const handle = img.width / this.canvasWidth

        this.sourceX = x * handle
        this.sourceY = y * handle
        this.sourceWidth = width * handle
        this.sourceHeight = height * handle

        targetCtx.drawImage(
          img,
          this.sourceX,
          this.sourceY,
          this.sourceWidth,
          this.sourceHeight,
          0,
          0,
          this.targetWidth,
          this.targetHeight,
        )
      })
      img.src = this.imgUrl
      imgWrap.appendChild(targetCanvas)
    },
    save() {
      const url = this.modiCanvas.toDataURL('image/webp')
      this.editUrl = url
      const fileName = 'canvas_img_' + new Date().getMilliseconds() + '.jpg'

      const decodImg = atob(url.split(',')[1])
      let array = []
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i))
      }
      const file = new File([new Uint8Array(array)], fileName, {
        type: 'image/webp',
      })

      this.$emit('save', this.editUrl)
      this.$emit('callParent', file)
    },
  },
  updated() {
    this.$nextTick(function () {
      this.drawEvent()
    })
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
  width: 970px;
  // height: 650px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 16px 24px;
  text-align: center;
}

.edit-title {
  position: relative;
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  padding: 0 12px;
  // border: 1px solid orange;
}

.edit-desc {
  color: #81848e;
  font-size: 13px;
}

.editor-wrap {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.canvas-wrap {
  position: relative;
  width: 420px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    &:hover {
      cursor: crosshair;
    }
  }
  .file-img {
    width: 100%;
    height: 100%;
  }
}

.img-wrap {
  width: 420px;
  height: 520px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

// 버튼
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
