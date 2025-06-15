export default {
  namespaced: true,

  state: () => ({
    datas: [],
    msg: '',
    markerPositions: [],
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
    async searchPlaces({ commit }, payload) {
      const { keyword, location } = payload
      const ps = new kakao.maps.services.Places()
      console.log(payload)

      if (location) {
        console.log('여기니')
        const center = new kakao.maps.LatLng(location.lat, location.lng)

        return ps.keywordSearch(
          keyword,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const markerPosition = data.map((item) => [item.y, item.x])
              commit('updateState', {
                datas: data,
                msg: '',
                markerPositions: markerPosition,
              })
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              commit('updateState', {
                datas: [],
                msg: '검색결과를 찾을 수 없습니다.',
              })
            } else {
              commit('updateState', {
                datas: [],
                msg: '검색 중 오류가 발생하였습니다.',
              })
            }
          },
          {
            location: center,
            radius: 2000,
            sort: 'distance',
          },
        )
      }

      ps.keywordSearch(keyword, (result, status) => {
        if (status !== kakao.maps.services.Status.OK || result.length === 0) {
          commit('updateState', {
            datas: [],
            msg: '위치를 찾을 수 없습니다.',
            markerPositions: [],
          })
          return
        }

        const lat = result[0].y
        const lng = result[0].x
        const center = new kakao.maps.LatLng(lat, lng)

        ps.keywordSearch(
          keyword,
          (data, status2) => {
            if (status2 === kakao.maps.services.Status.OK) {
              const markerPosition = data.map((item) => [item.y, item.x])
              commit('updateState', {
                datas: data,
                msg: '',
                markerPositions: markerPosition,
              })
            } else if (status2 === kakao.maps.services.Status.ZERO_RESULT) {
              commit('updateState', {
                datas: [],
                msg: '검색결과를 찾을 수 없습니다.',
              })
            } else {
              commit('updateState', {
                datas: [],
                msg: '검색 중 오류가 발생하였습니다.',
              })
            }
          },
          {
            location: center,
            radius: 2000,
          },
        )
      })
    },
  },
}
