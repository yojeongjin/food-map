import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BoardItem from '../../src/components/Board/BoardItem.vue'
import dayjs from 'dayjs'
import flushPromises from 'flush-promises'

global.alert = jest.fn()

const mockIcons = {
  'i-material-symbols:star-rounded': { template: '<div></div>' },
  'i-ic:baseline-local-cafe': { template: '<div></div>' },
  'i-lsicon:rice-filled': { template: '<div></div>' },
  'i-stash:burger-duotone': { template: '<div></div>' },
  'i-ri:beer-fill': { template: '<div></div>' },
  'i-maki:restaurant-sushi': { template: '<div></div>' },
  'i-icon-park-solid:noodles': { template: '<div></div>' },
  'i-icon-park-twotone:chicken': { template: '<div></div>' },
  'i-emojione-monotone:bread': { template: '<div></div>' },
  'i-fluent:bowl-salad-24-filled': { template: '<div></div>' },
  'i-icon-park-solid:fork-spoon': { template: '<div></div>' },
}

jest.mock('../../utils/axios', () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn().mockResolvedValue({
        status: 200,
        data: {
          success: true,
          data: [
            {
              nickname: '쌀구',
              review_rate: 4.5,
              place_name: '국수나무',
              place_addr: '서울 강남구',
              review_content: '정말 맛있었어요!',
              review_img: '/mock-img.jpg',
              photo: '/user.jpg',
              place_category: '한식',
              created_at: '2025-07-06T10:00:00Z',
            },
          ],
        },
      }),
    },
  }
})

describe('BoardItem.vue 라우트 테스트', () => {
  let wrapper

  beforeEach(async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/board/:id', component: BoardItem }],
    })

    router.push('/board/1')
    await router.isReady()

    wrapper = mount(BoardItem, {
      global: {
        plugins: [router],
        components: mockIcons,
        mocks: {
          $route: {
            params: {
              id: '1',
            },
          },
        },
      },
    })

    await flushPromises()
  })

  test('최초 접속한 URL의 파라미터를 확인합니다', () => {
    expect(wrapper.vm.$route.params.id).toBe('1')
  })

  test('게시물 닉네임과 별점, 장소명이 렌더링된다', () => {
    expect(wrapper.text()).toContain('쌀구')
    expect(wrapper.text()).toContain('4.5')
    expect(wrapper.text()).toContain('국수나무')
    expect(wrapper.text()).toContain('서울 강남구')
    expect(wrapper.text()).toContain('정말 맛있었어요!')
    expect(wrapper.text()).toContain(dayjs('2025-07-06').format('YYYY.MM.DD'))
  })
})
