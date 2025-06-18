const router = require('express').Router()
const dao = require('./dao')
// jwt
const jwtMiddleware = require('../../../../config/jwtMiddleware')

router.get('/myfavorite', jwtMiddleware, dao.my)
router.post('/', jwtMiddleware, dao.add)
router.delete('/', jwtMiddleware, dao.delete)

router.all('*', (req, res) => {
  res
    .status(404)
    .send({ success: false, msg: `/v1/favorite unknown uri ${req.path}` })
})

module.exports = router
