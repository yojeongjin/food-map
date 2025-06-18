// db
const db = require('../../../../config/db')
const conn = db.init()
// upload
const { uploadToS3 } = require('../../../../utils/s3Uploader')

exports.list = async (req, res) => {
  try {
    const sql = `SELECT * FROM tbl_review
                  ORDER BY id DESC
                  LIMIT 5;`

    conn.query(sql, (err, rows) => {
      if (err) throw err

      return res.status(200).send({
        success: true,
        code: 200,
        data: rows,
      })
    })
  } catch (err) {
    console.error('DB 처리 중 오류:', err)
    return res.status(500).send({
      success: false,
      msg: '서버 오류로 인해 처리를 완료할 수 없습니다.',
      error: err.message,
    })
  }
}

exports.view = async (req, res) => {
  const placeId = req.params.placeId
  console.log(placeId)
  try {
    const sql = 'SELECT * FROM tbl_review where place_id = ?'

    conn.query(sql, [placeId], (err, rows) => {
      if (err) throw err

      return res.status(200).send({
        success: true,
        code: 200,
        data: rows,
      })
    })
  } catch (err) {
    console.error('DB 처리 중 오류:', err)
    return res.status(500).send({
      success: false,
      msg: '서버 오류로 인해 처리를 완료할 수 없습니다.',
      error: err.message,
    })
  }
}

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
    console.error('DB 처리 중 오류:', err)
    return res.status(500).send({
      success: false,
      msg: '서버 오류로 인해 처리를 완료할 수 없습니다.',
      error: err.message,
    })
  }
}
