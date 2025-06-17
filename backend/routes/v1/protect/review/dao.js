// db
const db = require('../../../../config/db')
const conn = db.init()
// upload
const { uploadToS3 } = require('../../../../utils/s3Uploader')

exports.add = async (req, res) => {
  try {
    const imageUrl = await uploadToS3(req.file)

    const token = req.verifiedToken
    const { placeId, placeName, placeAddr, reviewRate, reviewContent } =
      req.body

    const sql = ` INSERT INTO tbl_review
                (place_id, place_name, place_addr, review_img, review_rate, review_content, user_id)
                VALUES (?, ?, ?, ?, ?, ?, ?);`

    conn.query(
      sql,
      [
        placeId,
        placeName,
        placeAddr,
        imageUrl,
        reviewRate,
        reviewContent,
        token.id,
      ],
      (err, rows) => {
        if (err) throw err

        return res.status(200).send({
          success: true,
          code: 200,
        })
      },
    )
  } catch (err) {
    console.error('SMS 전송 또는 DB 처리 중 오류:', err)
    return res.status(500).send({
      success: false,
      msg: '서버 오류로 인해 처리를 완료할 수 없습니다.',
      error: err.message,
    })
  }
}
