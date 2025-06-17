import Vuex from 'vuex'
// modules
import place from './place'
import user from './user'

export default Vuex.createStore({
  modules: {
    place,
    user,
  },
})
