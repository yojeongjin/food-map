<template>
  <main>
    <Profile />
    <Search />
    <NewlyPlace />
    <Footer />
    <Badge />
  </main>
</template>

<script>
// components
import Profile from './Profile.vue'
import Search from './Search.vue'
import NewlyPlace from './NewlyPlace.vue'
import Footer from '../Common/Footer.vue'

export default {
  created() {
    this.$store.dispatch('user/getUser')
  },
  components: { Profile, Search, NewlyPlace, Footer },
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
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
