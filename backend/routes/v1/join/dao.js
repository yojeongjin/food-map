// db
const db = require('../../../config/db')
const conn = db.init()

exports.add = async (req, res) => {
  const { phoneNo, nickname } = req.body

  const defaultImg =
    'https://voca-bucket.s3.ap-northeast-2.amazonaws.com/level1.webp'
  const sql =
    'INSERT INTO tbl_user (phone_no, nickname, photo) VALUES (?, ?, ?)'
  conn.query(sql, [phoneNo, nickname, defaultImg], (err, rows) => {
    if (err) throw err

    res.send({
      success: true,
      code: 200,
      msg: '맛집 찾으러 가요 🥕!',
    })
  })
}
