<template>
  <section class="filter-section">
    <!-- 필터 -->
    <ul class="filter-menu">
      <li
        class="filter-item"
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
.filter-section {
  background-color: #fff;
  padding: 0 24px;
}
.filter-menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  overflow-x: scroll;
}
.filter-item {
  min-width: 52px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8c8c8c;
  font-weight: 500;

  &.select {
    color: $color-primary;
    border-bottom: 3px solid $color-primary;
  }
}
</style>
