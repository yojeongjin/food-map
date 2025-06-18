// db
const db = require('../../../../config/db')
const conn = db.init()

exports.add = async (req, res) => {
  try {
    const token = req.verifiedToken
    const { placeId, placeName, placeAddr } = req.body

    const sql = `INSERT INTO tbl_favorite
                (place_id, place_name, place_addr, user_id)
                VALUES (?, ?, ?, ?);`

    conn.query(sql, [placeId, placeName, placeAddr, token.id], (err, rows) => {
      if (err) throw err

      return res.status(200).send({
        success: true,
        code: 200,
        data: rows,
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

exports.delete = async (req, res) => {
  try {
    const token = req.verifiedToken
    const { placeId } = req.body

    const sql = `DELETE FROM tbl_favorite WHERE place_id = ? and user_id = ?`

    conn.query(sql, [placeId, token.id], (err, rows) => {
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
