const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const db = require('./config/db')
const cors = require('cors')

const indexRouter = require('./routes/index')

const app = express()

const pool = db.init()
db.connect(pool)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // 정확한 프론트 주소
    credentials: true,
  }),
)

app.use('/', indexRouter)

module.exports = app
