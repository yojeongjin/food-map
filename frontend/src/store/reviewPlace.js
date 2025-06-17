export default {
  namespaced: true,
  state: () => ({
    placeData: null,
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },
  actions: {
    async getSave({ commit }, data) {
      commit('updateState', {
        placeData: data,
      })
    },
  },
}
