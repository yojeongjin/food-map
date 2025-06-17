// jwt
const jwt = require('jsonwebtoken')
require('dotenv').config()
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

    return res.status(200).send({
      success: true,
      code: 200,
      msg: '맛집 찾으러 가요 🥕!',
    })
  })
}

exports.token = async (req, res) => {
  const { phoneNo, nickname } = req.body

  try {
    // Access & Refresh Token 생성
    const accessToken = jwt.sign(
      {
        phoneNo: phoneNo,
        nickname: nickname,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' },
    )

    const refreshToken = jwt.sign(
      {
        phoneNo: phoneNo,
        nickname: nickname,
      },
      process.env.REFRESH_JWT_KEY,
      {
        expiresIn: '14d',
      },
    )

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60, // 1시간
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14일
      })

    return res.status(200).send({
      success: true,
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
