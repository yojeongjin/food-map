const router = require('express').Router()
const dao = require('./dao')
// jwt
const jwtMiddleware = require('../../../../config/jwtMiddleware')
// upload
const { upload } = require('../../../../utils/s3Uploader')

router.get('/', jwtMiddleware, dao.list)
router.patch('/', jwtMiddleware, dao.update)
router.patch('/profile', jwtMiddleware, upload.single('image'), dao.modify)

router.all(/(.*)/, (req, res) => {
  res.status(404).send({ success: false, msg: `user unknown uri ${req.path}` })
})

module.exports = router
