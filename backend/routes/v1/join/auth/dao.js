const axios = require('axios')
// redis
const redisClient = require('../../../../config/redisClient')
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

exports.send = async (req, res) => {
  const { phoneNo } = req.body

  try {
    // DB에서 유저 존재 여부 확인
    const sql = `SELECT * FROM tbl_user WHERE phone_no = ?`
    const rows = await queryAsync(sql, [phoneNo])

    if (rows.length > 0) {
      return res.status(403).send({
        success: false,
        msg: `이미 사용 중인 휴대폰 번호입니다.\n기존 계정으로 로그인해 주세요.`,
      })
    }

    // 인증번호
    const authCode = generateAuthCode()
    await redisClient.setEx(`verify:${phoneNo}`, 180, authCode)

    // 인증 문자 발송
    const smsResult = await axios.post(
      'https://ax.hmobility.co.kr/events/sendSMS',
      {
        phone: phoneNo,
        title: '파킹프렌즈',
        text: `안녕하세요. 인증번호는 [${authCode}] 입니다.`,
        type: 'lms',
      },
    )

    return res.status(200).send({
      success: true,
      msg: '인증번호가 전송되었습니다.',
      smsResult: smsResult.data,
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
