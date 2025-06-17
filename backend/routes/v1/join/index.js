const router = require('express').Router()
const dao = require('./dao')

const auth = require('./auth')

router.use('/auth', auth)
router.post('/', dao.add)

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `join unknown uri ${req.path}` })
})

module.exports = router
