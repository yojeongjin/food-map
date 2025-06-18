<template>
  <main>
    <BoardFilter
      :filters="filters"
      v-model:selected="selected"
      @updateSelect="updateSelect"
    />
    <div class="scroll-area" ref="scrollArea">
      <BoardList :boardDatas="boardDatas" />
    </div>
  </main>
</template>

<script>
import axios from '../../../utils/axios'
import { handleApiError } from '../../../utils/handleApiError'

// components
import BoardFilter from './BoardFilter.vue'
import BoardList from './BoardList.vue'

export default {
  data() {
    return {
      filters: [
        {
          id: 0,
          filter: '전체',
        },
        {
          id: 1,
          filter: '한식',
        },
        {
          id: 2,
          filter: '양식',
        },
        {
          id: 3,
          filter: '중식',
        },
        {
          id: 4,
          filter: '일식',
        },
        {
          id: 5,
          filter: '카페',
        },
      ],
      selected: '전체',
      boardDatas: [],
      limit: 5,
      offset: 0,
      loading: false,
      hasMore: true,
    }
  },
  mounted() {
    this.getBoard()

    this.$refs.scrollArea.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    this.$refs.scrollArea.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    updateSelect(val) {
      this.selected = val
      this.boardDatas = []
      this.offset = 0
      this.hasMore = true
      this.scrollToTop()
      this.getBoard()
    },

    async getBoard() {
      if (this.loading || !this.hasMore) return
      this.loading = true

      try {
        const res = await axios.get('/v1/board/category', {
          params: {
            category: this.selected,
            offset: this.offset,
            limit: this.limit,
          },
        })

        if (res.status === 200 && res.data.success) {
          const newData = res.data.data
          this.boardDatas = [...this.boardDatas, ...newData]
          this.offset += newData.length

          if (newData.length < this.limit) {
            this.hasMore = false // 더 이상 없음
          }
        }
      } catch (err) {
        handleApiError(err)
      } finally {
        this.loading = false
      }
    },
    handleScroll() {
      const el = this.$refs.scrollArea
      const scrollY = el.scrollTop
      const visible = el.clientHeight
      const scrollHeight = el.scrollHeight

      if (scrollY + visible >= scrollHeight - 300) {
        this.getBoard()
      }
    },
    scrollToTop() {
      this.$nextTick(() => {
        if (this.$refs.scrollArea) {
          this.$refs.scrollArea.scrollTop = 0
        }
      })
    },
  },
  components: { BoardFilter, BoardList },
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc(var(--vh, 1vh) * 100);
  padding-top: 50px;
}
section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scroll-area {
  height: calc(100% - 45px);
  overflow-y: scroll;
}
</style>
