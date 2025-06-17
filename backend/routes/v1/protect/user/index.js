const router = require('express').Router()
const dao = require('./dao')
// jwt
const jwtMiddleware = require('../../../../config/jwtMiddleware')

router.get('/', jwtMiddleware, dao.list)

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `user unknown uri ${req.path}` })
})

module.exports = router
