import { shallowMount } from '@vue/test-utils'
import Profile from '../../src/components/Home/Profile.vue'

const mockUser = {
  nickname: '오쌀구',
  photo: '/user.jpg',
  level: 2,
  level_name: '맛집감별사',
  review_count: 7,
  favorite_places: [{}, {}, {}],
}

const RouterLinkStub = {
  name: 'RouterLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
}

describe('Profile.vue', () => {
  it('로그인 상태일 때 유저 정보를 보여준다', () => {
    const wrapper = shallowMount(Profile, {
      global: {
        mocks: {
          $store: {
            state: {
              user: {
                user: mockUser,
              },
            },
          },
        },
        stubs: ['i-material-symbols:settings-rounded', 'RouterLink'],
      },
    })

    expect(wrapper.find('.user-area').exists()).toBe(true)
    expect(wrapper.text()).toContain('오쌀구')
    expect(wrapper.text()).toContain('Lv.2 맛집감별사')
    expect(wrapper.text()).toContain('3') // 찜한 맛집
    expect(wrapper.text()).toContain('7') // 리뷰 수

    const bar = wrapper.find('.progress-bar')
    expect(bar.attributes('style')).toContain('width: 20%')
  })

  it('비로그인 상태일 때 로그인 안내를 보여준다', () => {
    const wrapper = shallowMount(Profile, {
      global: {
        mocks: {
          $store: {
            state: {
              user: {
                user: null,
              },
            },
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
          'i-material-symbols:settings-rounded': true,
        },
      },
    })

    const routerLink = wrapper.findComponent(RouterLinkStub)
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.props('to')).toBe('/signin')
  })
})
