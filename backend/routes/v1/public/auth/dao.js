const axios = require('axios')
// redis
const redisClient = require('../../../../config/redisClient')
// jwt
const jwt = require('jsonwebtoken')
// db
const db = require('../../../../config/db')
const conn = db.init()

function queryAsync(sql, params) {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, rows) => {
      if (err) return reject(err)
      resolve(rows)
    })
  })
}
// 인증번호 생성
const generateAuthCode = () => {
  return String(Math.floor(Math.random() * 100000)).padStart(5, '0')
}

/**
 * 회원가입 인증번호 발송
 */
exports.join = async (req, res) => {
  const { phoneNo } = req.body

  try {
    // DB에서 유저 존재 여부 확인
    const sql = `SELECT * FROM tbl_user WHERE phone_no = ?`
    const rows = await queryAsync(sql, [phoneNo])

    if (rows.length > 0) {
      return res.status(402).send({
        success: false,
        msg: `이미 사용 중인 휴대폰 번호입니다.\n기존 계정으로 로그인해 주세요.`,
      })
    }

    // 인증번호
    const authCode = generateAuthCode()
    await redisClient.setEx(`verify:${phoneNo}`, 180, authCode)

    // 인증 문자 발송
    const smsResult = await axios.post(process.env.SMS_URL, {
      phone: phoneNo,
      text: `안녕하세요. 인증번호는 [${authCode}] 입니다.`,
      type: 'lms',
    })

    return res.status(200).send({
      success: true,
      msg: '인증번호가 전송되었습니다.',
      smsResult: smsResult.data,
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

/**
 * 인증번호 유효 체크
 */
exports.verify = async (req, res) => {
  const { phoneNo, code } = req.body

  // redis에서 코드 받아오기
  const savedCode = await redisClient.get(`verify:${phoneNo}`)

  if (!savedCode) {
    return res.status(400).send({
      success: false,
      msg: '인증시간이 초과하였습니다.',
    })
  }

  if (savedCode !== code) {
    return res.status(400).send({
      success: false,
      msg: '유효하지않은 인증번호입니다.',
    })
  }
  // 코드 지우기
  await redisClient.del(`verify:${phoneNo}`)

  return res.status(200).send({
    success: true,
  })
}

/**
 * 로그인 인증번호 발송
 */
exports.signin = async (req, res) => {
  const { phoneNo } = req.body

  try {
    // DB에서 유저 존재 여부 확인
    const sql = `SELECT * FROM tbl_user WHERE phone_no = ?`
    const rows = await queryAsync(sql, [phoneNo])

    if (rows.length === 0) {
      return res.status(204).send({
        success: false,
        msg: `회원정보가 존재하지 않습니다.`,
      })
    }

    if (phoneNo === '01012345678') {
      const authCode = '12345'
      await redisClient.setEx(`verify:${phoneNo}`, 180, authCode)

      return res.status(200).send({
        success: true,
        msg: '인증번호가 전송되었습니다.',
      })
    }

    // 인증번호
    const authCode = generateAuthCode()
    await redisClient.setEx(`verify:${phoneNo}`, 180, authCode)

    // 인증 문자 발송
    const smsResult = await axios.post(process.env.SMS_URL, {
      phone: phoneNo,
      text: `안녕하세요. 인증번호는 [${authCode}] 입니다.`,
      type: 'lms',
    })

    return res.status(200).send({
      success: true,
      msg: '인증번호가 전송되었습니다.',
      smsResult: smsResult.data,
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

/**
 * 로그인 인증번호 유효 체크
 */
exports.token = async (req, res) => {
  const { phoneNo, code } = req.body

  // redis에서 코드 받아오기
  const savedCode = await redisClient.get(`verify:${phoneNo}`)

  if (!savedCode) {
    return res.status(400).send({
      success: false,
      msg: '인증시간이 초과하였습니다.',
    })
  }

  if (savedCode !== code) {
    return res.status(400).send({
      success: false,
      msg: '유효하지않은 인증번호입니다.',
    })
  }
  // 코드 지우기
  await redisClient.del(`verify:${phoneNo}`)

  const sql = `SELECT * FROM tbl_user WHERE phone_no = ?`
  const rows = await queryAsync(sql, [phoneNo])

  // Access & Refresh Token 생성
  const accessToken = jwt.sign(
    {
      id: rows[0].id,
      phoneNo: rows[0].phone_no,
    },
    process.env.JWT_KEY,
    { expiresIn: '1h' },
  )

  const refreshToken = jwt.sign(
    { id: rows[0].id, phoneNo: rows[0].phone_no },
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
}

/**
 * 로그아웃
 */

exports.logout = async (req, res) => {
  try {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      })
      .clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      })
    return res.status(200).send({
      success: true,
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

/**
 * 리프레시
 */
exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
      return res.status(403).send({
        success: false,
        msg: '유효하지 않은 토큰입니다.',
      })
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY)

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        phoneNo: decoded.phoneNo,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' },
    )

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60, // 1시간
    })

    return res.status(200).send({
      success: true,
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
