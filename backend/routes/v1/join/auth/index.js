const router = require('express').Router()
const dao = require('./dao') //데이터 모듈 호출

router.post('/', dao.send)
router.post('/verify', dao.verify)

router.all('*', (req, res) => {
  res
    .status(404)
    .send({ success: false, msg: 'join-auth unknown uri ${req.path}' })
})

module.exports = router
