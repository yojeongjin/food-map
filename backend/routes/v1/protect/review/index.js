const router = require('express').Router()
const dao = require('./dao')
// jwt
const jwtMiddleware = require('../../../../config/jwtMiddleware')
// upload
const { upload } = require('../../../../utils/s3Uploader')

router.get('/', jwtMiddleware, dao.list)
router.post('/', jwtMiddleware, upload.single('image'), dao.add)

router.all('*', (req, res) => {
  res.status(404).send({
    data: req,
    success: false,
    msg: 'v1/review unknown uri ${req.path}',
  })
})

module.exports = router
