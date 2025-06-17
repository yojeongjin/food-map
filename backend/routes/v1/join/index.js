const router = require('express').Router()
const dao = require('./dao')

router.post('/', dao.add)
router.post('/token', dao.token)

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `join unknown uri ${req.path}` })
})

module.exports = router
