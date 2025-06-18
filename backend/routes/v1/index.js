const router = require('express').Router()

/**
 * public
 */
const join = require('./public/join')
const auth = require('./public/auth')
const board = require('./public/board')

router.use('/join', join)
router.use('/auth', auth)
router.use('/board', board)

/**
 * protect
 */
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
