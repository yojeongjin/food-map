import 'cypress-file-upload'

describe('회원 로그인 + 리뷰 작성 E2E 테스트', () => {
  it('로그인 후 리뷰쓰기까지 전체 흐름 테스트', () => {
    // 1. 로그인 페이지 접근
    cy.visit('/signin')

    // 2. 핸드폰 번호 입력 및 로그인 요청
    cy.get('input[placeholder="핸드폰 번호를 입력하세요"]').type('01012345678')
    cy.get('button.apply-btn').contains('로그인').click()

    // 3. 인증번호 입력
    const code = '12345'
    code.split('').forEach((digit, i) => {
      cy.get('.auth-input').eq(i).type(digit)
    })

    // 4. 로그인 완료 후 홈 리다이렉트 확인
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    // 5. 위치 모킹과 지도 페이지 이동
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

    cy.contains('button', '맛집 찾기').click()
    cy.url().should('include', '/find')

    // 6. 마커 클릭 → 바텀시트 → 리뷰쓰기 클릭
    cy.wait(1500)
    cy.get('[data-testid="marker"]', { timeout: 10000 })
      .first()
      .click({ force: true })
    cy.get('.wrapper').should('exist').and('be.visible')
    cy.contains('li', '리뷰쓰기').click()
    cy.url().should('include', '/review')

    // 7. 이미지 업로드 (fixtures/sample.jpg 필요)
    cy.get('input[type="file"]').attachFile('sample.jpg')

    // 8. 별점 클릭 (마지막 별 클릭 = 5점)
    cy.get('.star-wrapper').last().click()

    // 9. 리뷰 내용 작성
    cy.get('textarea.text-area').type('테스트 리뷰 작성')

    // 10. 리뷰 제출
    cy.get('button.apply-btn').contains('리뷰 작성하기').click()

    // 11. 완료 확인
    cy.contains('리뷰 작성이 완료되었습니다').should('exist')
  })
})
