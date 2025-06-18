import axios from 'axios'
import store from '@/store'

const baseURL = import.meta.env.VITE_API_URL

const instance = axios.create({
  baseURL,
  withCredentials: true,
})

// 요청 실패 시 인터셉터 처리
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Access Token 만료 감지 & 재발급 시도
    if (
      store.state.user.user &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        // refresh-token으로 access-token 재발급 요청
        await instance.get('/v1/auth/refresh-token')

        // 원래 요청 재시도
        return instance(originalRequest)
      } catch (refreshError) {
        // 재발급 실패 시 로그인 페이지로 리디렉션
        if (typeof window !== 'undefined') {
          // window.location.href = `${import.meta.env.VITE_APP_URL}/signin`
          window.location.href = import.meta.env.VITE_APP_URL
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default instance
