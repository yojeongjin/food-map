import { showToast } from './toast'

export const handleApiError = (err) => {
  if (err.response) {
    const { status, data } = err.response
    const msg = data?.msg || data?.message || '오류가 발생했습니다.'

    if (status === 401) return
    else showToast(msg)
  } else if (err.request) {
    alert('서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.')
  } else {
    alert('예상치 못한 오류가 발생했습니다.')
  }

  console.error('[API ERROR]', err)
}
