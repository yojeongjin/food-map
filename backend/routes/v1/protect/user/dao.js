// db
const db = require('../../../../config/db')
const conn = db.init()

exports.list = async (req, res) => {
  try {
    const token = req.verifiedToken

    const sql = `
                SELECT 
                  tu.*, 
                  tl.level_name,
                  COUNT(tr.id) AS review_count
                FROM tbl_user AS tu
                LEFT JOIN tbl_level AS tl ON tl.id = tu.level
                LEFT JOIN tbl_review AS tr ON tr.user_id = tu.id
                WHERE tu.id = ?
                GROUP BY tu.id;`

    conn.query(sql, [token.id], (err, rows) => {
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
