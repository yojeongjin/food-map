// db
const db = require('../../../../config/db')
const conn = db.init()

exports.list = async (req, res) => {
  try {
    const token = req.verifiedToken

    const sql = `
                SELECT tb.*, tl.level_name
                FROM tbl_user as tb
                LEFT JOIN tbl_level as tl on tl.id = tb.level
                WHERE
	              tb.id = ?;
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
    console.error('SMS 전송 또는 DB 처리 중 오류:', err)
    return res.status(500).send({
      success: false,
      msg: '서버 오류로 인해 처리를 완료할 수 없습니다.',
      error: err.message,
    })
  }
}
