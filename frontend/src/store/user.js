import axios from '../../utils/axios'

export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    clearUser(state) {
      state.user = null
    },
  },
  actions: {
    async getUser({ commit, state }) {
      if (state.user) return

      try {
        const res = await axios.get('/v1/user', {
          withCredentials: true,
        })

        if (res.status === 200 && res.data.success) {
          commit('setUser', res.data.data[0])
        } else {
          commit('clearUser')
        }
      } catch (err) {
        console.error('[유저 정보 조회 실패]', err)
        commit('clearUser')
      }
    },
  },
}
