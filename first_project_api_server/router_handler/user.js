const db = require('../db/index')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const dayjs = require('dayjs')

exports.userList = (req, res) => {
  let name = req.query.query
  let pageSize = req.query.pageSize // 页大小
  let pageNum = req.query.pageNum // 当前页
  let start = (pageNum - 1) * pageSize; // 起始位置
  db.query(`SELECT *  FROM user WHERE username  LIKE '%${name}%' or phone LIKE '%${name}%' or school LIKE '%${name}%' LIMIT ${start},${pageSize}`, function (err, result) {
    if (err) res.cc(err);
    let list = result
    db.query(`SELECT COUNT(*) AS total FROM user`, function (err, result1) {
      if (err) res.cc(err);
      res.send({
        "data": {
          "pageNum": pageNum,
          "total": result1[0].total,
          "works": list
        },
        "meta": {
          "message": '获取成功',
          "status": 200
        }
      });
    })
  })
}

exports.addUser = (req, res) => {
  let username = req.body.username
  let phone = req.body.phone
  let password = req.body.password
  let school = req.body.school
  db.query(`select * from user where phone like '%${phone}%'`, function (err, results) {
    if (err) return res.cc(err)
    if (results.length == 1) return res.send({
      "message": "用户已存在！",
      "status": 412
    })
    password = bcrypt.hashSync(password, 10)
    db.query(`INSERT INTO user set ?`, { username, phone, password, school }, function (err, results) {
      if (err) return res.cc(err)
      res.send({
        "message": "用户添加成功！",
        "status": 201
      })
    })
  })
}

exports.changePassword = (req, res) => {
  let phone = req.body.phone
  let password = bcrypt.hashSync(req.body.password, 10)
  db.query(`update user set password='${password}' where phone=${phone}`, function (err, result) {
    if (err) return res.cc(err)
    res.send({
      "message": '密码更改成功！',
      "status": 200
    })
  })
}

exports.uploadAvatar = (req, res) => {
  fs.renameSync(req.file.path, `../upload/images/${req.file.originalname}`)
  let phone = req.body.phone
  let path = req.file.originalname
  let oldAvatar = req.body.oldAvatar
  fs.unlink(`../upload/images/${oldAvatar}`, function (err) {
    if (err) return res.cc(err);
  })
  db.query(`update user set avatar='${path}' where phone=${phone}`, function (err, result) {
    if (err) return res.cc(err)
    res.send({
      "message": "头像保存成功！",
      "status": 200
    })
  })
}

exports.getUser = (req, res) => {
  let phone = req.query.phone
  db.query(`select * from user where phone like '%${phone}%'`, function (err, result) {
    if (err) return res.cc(err)
    if (result.length == 1) {
      db.query(`select work_name,upload_time from work where phone like '%${phone}%'`, function (err, result1) {
        if (err) return res.cc(err)
        for (let i = 0; i < result1.length; i++) {
          result1[i].upload_time = dayjs(result1[i].upload_time).format('YYYY-MM-DD HH:mm')
        }
        res.send({
          "data": {
            "user": {
              "username": result[0].username,
              "phone": result[0].phone,
              "school": result[0].school,
              "avatar": result[0].avatar
            },
            "workList": result1
          },
          "meta": {
            "message": "获取用户信息成功！",
            "status": 200
          }
        })
      })

    } else {
      res.send('获取用户信息失败！')
    }
  })
}

exports.uploadUserinfo = (req, res) => {
  let phone = req.body.phone
  let username = req.body.username
  let school = req.body.school
  let oldPhone = req.body.oldPhone
  db.query(`update user set phone='${phone}',username='${username}',school='${school}'  where phone=${oldPhone}`, function (err, result) {
    if (err) return res.cc(err)
    res.send({
      "message": "修改成功！",
      "status": 200
    })
  })

}