<template>
  <section>
    <ul class="mypage-menu">
      <li
        class="mypage-item"
        :class="{ select: selected === filter.filter }"
        v-for="filter in filters"
        :key="filter.id"
        :data-code="filter.id"
        @click="$emit('updateSelect', filter.filter)"
      >
        {{ filter.filter }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.mypage-menu {
  display: flex;
  border-bottom: 1px solid #c8c8c8;
}
.mypage-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 16px 0;
  color: #888;
  cursor: pointer;
  &.select {
    border-bottom: 2px solid black;
    color: $color-gray01;
  }
}
.count {
  color: #888;
  font-size: 15px;
  font-weight: 400;
}
</style>
