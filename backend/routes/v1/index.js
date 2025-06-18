const router = require('express').Router()

const join = require('./public/join')
const auth = require('./public/auth')

router.use('/join', join)
router.use('/auth', auth)

// protect
const user = require('./protect/user')
const review = require('./protect/review')
const favorite = require('./protect/favorite')

router.use('/user', user)
router.use('/review', review)
router.use('/favorite', favorite)

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `v1 unknown uri ${req.path}` })
})

module.exports = router
