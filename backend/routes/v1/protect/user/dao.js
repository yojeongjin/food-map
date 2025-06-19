// db
const db = require('../../../../config/db')
const { uploadToS3 } = require('../../../../utils/s3Uploader')
const conn = db.init()

exports.list = async (req, res) => {
  try {
    const token = req.verifiedToken

    const sql = `SELECT 
                  tu.*, 
                  tl.level_name,
                  COUNT(DISTINCT tr.id) AS review_count,
                  GROUP_CONCAT(DISTINCT tf.place_id) AS favorite_places
                FROM tbl_user AS tu
                LEFT JOIN tbl_level AS tl ON tl.id = tu.level
                LEFT JOIN tbl_review AS tr ON tr.user_id = tu.id
                LEFT JOIN tbl_favorite AS tf ON tf.user_id = tu.id
                WHERE tu.id = ?
                GROUP BY tu.id;`

    conn.query(sql, [token.id], (err, rows) => {
      if (err) throw err

      const user = rows[0]

      user.favorite_places = user.favorite_places
        ? user.favorite_places.split(',').map(Number)
        : []

      return res.status(200).send({
        success: true,
        code: 200,
        data: user,
      })
    })
  } catch (err) {
    console.error(' DB 처리 중 오류:', err)
    return res.status(500).send({
      success: false,
      msg: '서버 오류로 인해 처리를 완료할 수 없습니다.',
      error: err.message,
    })
  }
}

exports.update = async (req, res) => {
  const { level } = req.body

  try {
    const token = req.verifiedToken

    const sql = `UPDATE tbl_user set level = ? where id = ?`

    conn.query(sql, [Number(level), token.id], (err, rows) => {
      if (err) throw err

      return res.status(200).send({
        success: true,
        code: 200,
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

exports.modify = async (req, res) => {
  const { nickname } = req.body
  const token = req.verifiedToken
  const file = req.file

  try {
    let photoUrl = null

    // 이미지가 있을 경우 S3 업로드
    if (file) {
      photoUrl = await uploadToS3(file)
    }

    // 닉네임이나 사진 둘 다 없는 경우
    if (!nickname && !photoUrl) {
      return res.status(400).send({
        success: false,
        msg: '변경된 내용이 없습니다.',
      })
    }

    let fields = []
    let params = []

    if (nickname) {
      fields.push('nickname = ?')
      params.push(nickname)
    }

    if (photoUrl) {
      fields.push('photo = ?')
      params.push(photoUrl)
    }

    params.push(token.id)

    const sql = `UPDATE tbl_user SET ${fields.join(', ')} WHERE id = ?`

    conn.query(sql, params, (err, rows) => {
      if (err) {
        console.error('DB 처리 중 오류:', err)
        return res.status(500).send({
          success: false,
          msg: '서버 오류로 인해 처리를 완료할 수 없습니다.',
          error: err.message,
        })
      }

      return res.status(200).send({
        success: true,
        code: 200,
      })
    })
  } catch (err) {
    console.error('S3 업로드 또는 처리 중 오류:', err)
    return res.status(500).send({
      success: false,
      msg: '처리 중 오류가 발생했습니다.',
      error: err.message,
    })
  }
}
