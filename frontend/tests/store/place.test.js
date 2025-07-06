import placeStore from '../../src/store/place'
import _cloneDeep from 'lodash/cloneDeep'
import { showToast } from '../../utils/toast'

// mock kakao maps API
const mockKeywordSearch = jest.fn()
const mockPlaces = jest.fn(() => ({
  keywordSearch: mockKeywordSearch,
}))

global.kakao = {
  maps: {
    LatLng: jest.fn((lat, lng) => ({ lat, lng })),
    services: {
      Places: mockPlaces,
      Status: {
        OK: 'OK',
        ZERO_RESULT: 'ZERO_RESULT',
      },
    },
  },
}

// mock showToast
jest.mock('../../utils/toast', () => ({
  showToast: jest.fn(),
}))

describe('store/place.js', () => {
  let store

  beforeEach(() => {
    store = _cloneDeep(placeStore)
    store.state = placeStore.state()
    store.commit = (name, payload) => {
      store.mutations[name](store.state, payload)
    }
    store.dispatch = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch,
      }
      return store.actions[name](context, payload)
    }
    mockKeywordSearch.mockReset()
    showToast.mockReset()
  })

  test('검색 성공 시 datas와 markerPositions가 업데이트됨', async () => {
    const mockData = [
      { y: 37.5, x: 127.0 },
      { y: 37.6, x: 127.1 },
    ]

    mockKeywordSearch.mockImplementation((_, callback) => {
      callback(mockData, kakao.maps.services.Status.OK)
    })

    await store.dispatch('searchPlaces', { keyword: '강남맛집' })

    expect(store.state.datas).toEqual(mockData)
    expect(store.state.markerPositions).toEqual([
      [37.5, 127.0],
      [37.6, 127.1],
    ])
  })

  test('검색 결과 없음일 때 datas 초기화되고 showToast 호출됨', async () => {
    mockKeywordSearch.mockImplementation((_, callback) => {
      callback([], kakao.maps.services.Status.ZERO_RESULT)
    })

    await store.dispatch('searchPlaces', { keyword: '없는곳' })

    expect(store.state.datas).toEqual([])
    expect(showToast).toHaveBeenCalledWith('검색결과를 찾을 수 없습니다.')
  })

  test('검색 실패일 때 datas 초기화되고 에러 토스트 호출됨', async () => {
    mockKeywordSearch.mockImplementation((_, callback) => {
      callback([], 'ERROR')
    })

    await store.dispatch('searchPlaces', { keyword: '실패 테스트 검색' })

    console.log('showToast calls:', showToast.mock.calls)

    expect(store.state.datas).toEqual([])
    expect(showToast).toHaveBeenCalledWith('검색결과를 찾을 수 없습니다.')
  })
})
