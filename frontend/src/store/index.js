import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// modules
import place from './place'
import user from './user'
import reviewPlace from './reviewPlace'

export default Vuex.createStore({
  modules: {
    place,
    user,
    reviewPlace,
  },
  plugins: [
    createPersistedState({
      paths: ['user'],
      storage: window.localStorage,
    }),
  ],
})
