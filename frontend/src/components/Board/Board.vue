<template>
  <main>
    <BoardFilter
      :filters="filters"
      v-model:selected="selected"
      @updateSelect="updateSelect"
    />
    <BoardList />
  </main>
</template>

<script>
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
    }
  },
  methods: {
    updateSelect(val) {
      this.selected = val
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
</style>
