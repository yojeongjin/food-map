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
  const placeId = Number(req.params.id)

  // 페이지네이션
  const page = Number(req.query.page) || 1
  const limit = 3
  const offset = (page - 1) * limit

  try {
    const reviewSql = `
      SELECT 
        tr.*, 
        tu.nickname, 
        tu.photo
      FROM tbl_review AS tr
      LEFT JOIN tbl_user AS tu ON tu.id = tr.user_id
      WHERE tr.place_id = ?
      ORDER BY tr.created_at DESC
      LIMIT ? OFFSET ?;
    `

    const countSql = `
      SELECT 
        COUNT(*) AS total,
        ROUND(AVG(CAST(review_rate AS DECIMAL(3,1))), 1) AS avg_rating
      FROM tbl_review
      WHERE place_id = ?;
    `

    // 리뷰 목록
    conn.query(reviewSql, [placeId, limit, offset], (err, reviewRows) => {
      if (err) throw err

      // 총 개수 + 평균 평점
      conn.query(countSql, [placeId], (err2, metaRows) => {
        if (err2) throw err2

        const meta = metaRows[0]

        return res.status(200).send({
          success: true,
          code: 200,
          data: reviewRows,
          meta: {
            total: meta.total,
            avg_rating: meta.avg_rating || 0,
          },
        })
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

exports.my = async (req, res) => {
  try {
    const token = req.verifiedToken

    const sql = `
    SELECT tr.*, tu.nickname, tu.photo 
    FROM tbl_review as tr
    LEFT JOIN tbl_user as tu on tu.id = tr.user_id
    WHERE tr.user_id = ?
    ORDER BY tr.id DESC;
    `

    conn.query(sql, [token.id], (err, rows) => {
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
    const token = req.verifiedToken
    const imageUrl = await uploadToS3(req.file)

    const {
      placeId,
      placeName,
      placeAddr,
      placeCategory,
      reviewRate,
      reviewContent,
    } = req.body

    const sql = ` INSERT INTO tbl_review
                (place_id, place_name, place_addr, place_category, review_img, review_rate, review_content, user_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`

    conn.query(
      sql,
      [
        placeId,
        placeName,
        placeAddr,
        placeCategory,
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
