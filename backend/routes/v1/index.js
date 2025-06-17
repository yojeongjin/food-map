const router = require('express').Router()

const join = require('./join')
const auth = require('./auth')

router.use('/join', join)
router.use('/auth', auth)

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `v1 unknown uri ${req.path}` })
})

module.exports = router
