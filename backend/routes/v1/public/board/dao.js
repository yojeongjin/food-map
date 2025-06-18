// db
const db = require('../../../../config/db')
const conn = db.init()

exports.category = async (req, res) => {
  const { category, offset = 0, limit = 5 } = req.query

  try {
    const sql = `
      SELECT tr.*, tu.nickname, tu.photo
      FROM tbl_review AS tr
      LEFT JOIN tbl_user AS tu ON tr.user_id = tu.id
      WHERE ? = '전체' OR tr.place_category = ?
      ORDER BY tr.id DESC
      LIMIT ? OFFSET ?
    `

    conn.query(
      sql,
      [category, category, parseInt(limit), parseInt(offset)],
      (err, rows) => {
        if (err) throw err

        return res.status(200).send({
          success: true,
          code: 200,
          data: rows,
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

exports.view = async (req, res) => {
  const id = Number(req.params.id)

  try {
    const sql = `SELECT tr.*, tu.nickname, tu.photo
                  FROM tbl_review AS tr
                  LEFT JOIN tbl_user AS tu ON tr.user_id = tu.id
                  WHERE tr.id = ?;`

    conn.query(sql, [id], (err, rows) => {
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
