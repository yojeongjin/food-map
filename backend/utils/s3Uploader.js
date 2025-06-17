// s3Uploader.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const path = require('path')
const { randomUUID } = require('crypto')

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.S3_KEYID,
    secretAccessKey: process.env.S3_PRIVATE_KEY,
  },
})

// multer 메모리 스토리지
const storage = multer.memoryStorage()
const upload = multer({ storage })

// S3 업로드 함수
const uploadToS3 = async (file) => {
  const ext = path.extname(file.originalname)
  const filename = `${Date.now()}-${randomUUID()}${ext}`

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  })

  try {
    const result = await s3.send(command)
    console.log('[S3 업로드 성공]', result)
    return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${filename}`
  } catch (err) {
    console.error('[S3 업로드 실패]', err)
    throw err // 나중에 프론트에도 에러 전달
  }
}

module.exports = { upload, uploadToS3 }
