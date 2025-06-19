const router = require('express').Router()
const dao = require('./dao') //데이터 모듈 호출

// 회원가입 인증번호
router.post('/join', dao.join)
// 회원가입 인증번호 체크
router.post('/verify', dao.verify)
// 로그인 인증번호
router.post('/signin', dao.signin)
// 로그인 인증번호 체크
router.post('/token', dao.token)
// 로그아웃
router.get('/logout', dao.logout)
// 리프레시 토큰
router.get('/refresh-token', dao.refresh)

router.all(/(.*)/, (req, res) => {
  res.status(404).send({ success: false, msg: 'auth unknown uri ${req.path}' })
})

module.exports = router
