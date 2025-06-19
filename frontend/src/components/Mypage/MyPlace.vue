<template>
  <section class="my-place-section">
    <ul v-if="placeDatas?.length > 0" class="my-place-menu">
      <li
        v-for="placeData in placeDatas"
        :key="placeData?.id"
        :data-code="placeData?.id"
        class="my-place-item"
      >
        <img
          :src="
            placeData.thumbnail
              ? placeData.thumbnail
              : 'https://voca-bucket.s3.ap-northeast-2.amazonaws.com/none.webp'
          "
          alt="place-img"
          class="my-place-img"
        />
        <div class="my-place-info">
          <div class="place-title-area">
            <h4 class="my-place-name">{{ placeData?.place_name }}</h4>
            <button
              class="delete-btn"
              @click="deleteFavorite(placeData?.place_id)"
            >
              <i-fluent:heart-24-filled
                width="24px"
                height="24px"
                color="#ff6333"
              />
            </button>
          </div>
          <span class="my-place-rate">
            <i-material-symbols:star-rounded color="#ff6333" />
            {{
              placeData?.avg_rate ? Number(placeData?.avg_rate).toFixed(1) : 0
            }}
          </span>
          <p class="my-place-addr">{{ placeData?.place_addr }}</p>
        </div>
      </li>
    </ul>
    <div v-else class="none-place">아직 찜한 맛집이 없습니다</div>
  </section>
</template>

<script>
import axios from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'

export default {
  data() {
    return {
      placeDatas: [],
    }
  },
  mounted() {
    this.getMyFavorite()
  },

  methods: {
    async getMyFavorite() {
      try {
        this.$spinner.show()
        const res = await axios.get('/v1/favorite/myfavorite')

        if (res.status === 200 && res.data.success) {
          this.placeDatas = res.data.data
        }
      } catch (err) {
        handleApiError(err)
      } finally {
        this.$spinner.hide()
      }
    },
    async deleteFavorite(id) {
      try {
        const res = await axios.delete('/v1/favorite', {
          data: { placeId: id },
        })
        if (res.status === 200 && res.data.success) {
          this.$toast('삭제되었습니다')

          // ui 반영
          this.placeDatas = this.placeDatas.filter(
            (place) => place.place_id !== id,
          )
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
.my-place-section {
  height: 100%;
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
  width: calc(100% - 75px);
}
.place-title-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.delete-btn {
}
.my-place-name {
  font-size: 16px;
  font-weight: 600;
}
.my-place-rate {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  font-weight: 600;
}
.my-place-addr {
  color: $color-gray03;
  font-size: 13px;
}
.none-place {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-gray03;
}
</style>
