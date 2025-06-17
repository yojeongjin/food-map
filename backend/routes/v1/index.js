const router = require('express').Router()

const join = require('./public/join')
const auth = require('./public/auth')

router.use('/join', join)
router.use('/auth', auth)

// protect
const user = require('./protect/user')
router.use('/user', user)

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `v1 unknown uri ${req.path}` })
})

module.exports = router
