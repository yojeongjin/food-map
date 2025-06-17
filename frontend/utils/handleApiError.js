import { showToast } from './toast'

export const handleApiError = (err) => {
  if (err.response) {
    const { status, data } = err.response
    const msg = data?.msg || data?.message || '오류가 발생했습니다.'

    if (status === 403) alert(msg)
    else if (status === 500) alert('서버 오류입니다. 다시 시도해주세요.')
    else showToast(msg)
  } else if (err.request) {
    alert('서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.')
  } else {
    alert('예상치 못한 오류가 발생했습니다.')
  }

  console.error('[API ERROR]', err)
}
