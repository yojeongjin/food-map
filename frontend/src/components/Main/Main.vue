<template>
  <main>
    <Profile />
    <Search />
    <!-- <Random /> -->
    <NewlyPlace />
  </main>
</template>

<script>
import Profile from './Profile.vue'
import Search from './Search.vue'
import Random from './Random.vue'
import NewlyPlace from './NewlyPlace.vue'

export default {
  components: { Profile, Search, Random, NewlyPlace },
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding-top: 50px;
}
section {
  background-color: #fff;
  padding: 16px 24px;
}
</style>
