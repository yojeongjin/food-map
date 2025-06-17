import Vuex from 'vuex'
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
})
