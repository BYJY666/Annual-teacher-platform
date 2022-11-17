const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')

exports.manager = (req, res) => {
  const managerinfo = req.body
  const sql = `select * from manager where manager_name=?`

  db.query(sql, managerinfo.username, function (err, results) {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！')
    if (managerinfo.password == results[0].manager_password) {
      //生成token
      const manager = { ...results[0], manager_password: '' }
      const tokenStr = jwt.sign(manager, config.jwtSecretKey, { expiresIn: config.expiresIn })
      res.send({
        status: 0,
        message: '登录成功！',
        // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
        token: 'Bearer ' + tokenStr,
      })
    } else {
      return res.cc('密码不正确！')
    }
  })
}

exports.user = (req, res) => {
  const userinfo = req.body
  const sql = `select * from user where phone=?`

  db.query(sql, userinfo.username, function (err, results) {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！')
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {

      return res.cc('密码不正确！')
    } else {
      //生成token
      const user = { ...results[0], password: '' }
      const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
      res.send({
        status: 0,
        message: '登录成功！',
        // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
        token: 'Bearer ' + tokenStr,
      })
    }
  })
}