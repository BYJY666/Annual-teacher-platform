const express = require('express')
const app = express()
// var bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

const config = require('./config')
const expressJWT = require('express-jwt')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/login\/|^\/user\/changePassword|^\/user\/addUser|^\/work\/uploadVideo|^\/work\/uploadDocument|^\/work\/showWork/] }))

const loginRouter = require('./router/login') //引入login的接口
app.use('/login', loginRouter)
const jurisdictionRouter = require('./router/jurisdiction')  //引入jurisdiction的接口
app.use('/jurisdiction', jurisdictionRouter)
const workRouter = require('./router/work') //引入work的接口
app.use('/work', workRouter)
const userRouter = require('./router/user') //引入user的接口
app.use('/user', userRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  //身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份验证失败!')
  //未知的错误
  res.cc(err)
})

app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007');
})