<template>
  <main>
    <Profile :user="user" />
    <Search />
    <!-- <Random /> -->
    <NewlyPlace />
    <Footer />
  </main>
</template>

<script>
// components
import Profile from './Profile.vue'
import Search from './Search.vue'
import Random from './Random.vue'
import NewlyPlace from './NewlyPlace.vue'
import Footer from '../Common/Footer.vue'

export default {
  computed: {
    user() {
      console.log('user computed 호출:', this.$store.state.user.user)
      return this.$store.state.user.user
    },
  },
  components: { Profile, Search, Random, NewlyPlace, Footer },
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
