describe('지도 - 비회원 흐름 테스트', () => {
  it('마커 클릭 → 바텀시트 → 찜하기 클릭 → 로그인 모달 확인', () => {
    // 1. 페이지 방문 전에 geolocation mock 처리
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
          (cb) => {
            cb({
              coords: {
                latitude: 37.3,
                longitude: 127.1,
              },
            })
          },
        )
      },
    })

    // 2. 홈 → 지도 페이지 이동
    cy.contains('button', '맛집 찾기').click()
    cy.url().should('include', '/find')

    // 3. 마커 로딩 기다리기 (API 응답/렌더링 대기)
    cy.wait(2000)

    // 4. 마커 클릭
    cy.get('[data-testid="marker"]', { timeout: 10000 })
      .first()
      .click({ force: true })

    // 5. 바텀시트 확인
    cy.get('.wrapper').should('exist').and('be.visible')

    // 6. 찜하기 버튼 클릭 → 로그인 모달 떠야 함
    cy.contains('li', '찜하기').click()
    cy.get('[data-testid="login-modal"]').should('exist').and('be.visible')
  })
})

Cypress.on('window:alert', (text) => {
  if (text.includes('예상치 못한 오류')) return false
})
