<template>
  <main>
    <Profile />
    <Search />
    <NewlyPlace />
  </main>
</template>

<script>
import Profile from './Profile.vue'
import Search from './Search.vue'
import NewlyPlace from './NewlyPlace.vue'

export default {
  components: { Profile, Search, NewlyPlace },
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}
section {
  background-color: #fff;
  padding: 16px 24px;
}
</style>
