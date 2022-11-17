const db = require('../db/index')
const dayjs = require('dayjs')
const fs = require('fs')

exports.backgroundWork = (req, res) => {
  let name = req.query.query
  let pageSize = req.query.pageSize // 页大小
  let pageNum = req.query.pageNum // 当前页
  let start = (pageNum - 1) * pageSize; // 起始位置
  db.query(`SELECT *  FROM work WHERE work_name  LIKE '%${name}%' or user_name LIKE '%${name}%' or school LIKE '%${name}%' LIMIT ${start},${pageSize}`, function (err, result) {
    if (err) res.cc(err);
    let list = result
    for (let i = 0; i < list.length; i++) {
      list[i].upload_time = dayjs(list[i].upload_time).format('YYYY-MM-DD HH:mm')
      if (list[i].state == 0) {
        list[i].state = false
      } else if (list[i].state == 1) {
        list[i].state = true
      }
    }
    db.query(`SELECT COUNT(*) AS total FROM work`, function (err, result1) {
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

exports.changeState = (req, res) => {
  let id = req.body.id
  let state = req.body.state
  if (state == true) {
    state = 1
  } else if (state == false) {
    state = 0
  }
  db.query(`update work set state=${state} where id=${id}`, function (err, result) {
    if (err) return res.cc(err)
    res.send({
      "message": '更新审核状态成功！',
      "status": 200
    })
  })
}

exports.examine = (req, res) => {
  db.query(`select state from work`, function (err, result) {
    if (err) return res.cc(err)
    let obj = {
      reviewed: 0,
      unapproved: 0
    }
    for (let i in result) {
      if (result[i].state == 0) {
        obj.unapproved++
      } else if (result[i].state == 1) {
        obj.reviewed++
      }
    }
    res.send({
      "data": obj,
      "meta": {
        "message": "获取数据成功！",
        "status": 200
      }
    })
  })
}

exports.everyyear = (req, res) => {
  db.query(`select upload_time from work`, function (err, result) {
    if (err) return res.cc(err)
    let arr = []
    let dic = {}
    for (let i = 0; i < result.length; i++) {
      arr.push(dayjs(result[i].upload_time).format('YYYY'))
      if (dic.hasOwnProperty(arr[i])) {
        dic[arr[i]] += 1
      } else if (!dic.hasOwnProperty(arr[i])) {
        dic[arr[i]] = 1
      }
    }
    res.send({
      data: {
        "x": Object.keys(dic),
        "y": Object.values(dic)
      },
      meta: {
        "message": "获取数据成功！",
        "status": 200
      }
    })
  })
}

exports.uploadVideo = (req, res) => {
  fs.renameSync(req.file.path, `../upload/videos/${req.file.originalname}`)
  res.send({
    "data": {
      "videoName": req.file.originalname
    },
    "meta": {
      "message": "成功上传视频！",
      "status": 200
    }
  })
}

exports.uploadDocument = (req, res) => {
  fs.renameSync(req.file.path, `../upload/documents/${req.file.originalname}`)
  res.send({
    "data": {
      "documentName": req.file.originalname
    },
    "meta": {
      "message": "成功上传文档！",
      "status": 200
    }
  })
}

exports.addWork = (req, res) => {
  let phone = req.body.phone, work_name = req.body.workName, work_description = req.body.workDescription, document = req.body.documentName, video = req.body.videoName
  db.query(`select work_name from work where work_name='${work_name}'`, function (err, result) {
    if (err) return res.cc(err)
    if (result.length == 1) return res.send({
      "meta": {
        "message": "题目已存在！",
        "status": 404
      }
    })
    db.query(`select username,school from user where phone='${phone}'`, function (err, result1) {
      if (err) return res.cc(err)
      let user_name = result1[0].username, school = result1[0].school
      db.query(`INSERT INTO work set ?`, { work_name, user_name, phone, school, video, document, work_description }, function (err, result2) {
        if (err) return res.cc(err)
        res.send({
          "meta": {
            "message": "作品上传成功！",
            "status": 200
          }
        })
      })
    })
  })
}

exports.showWork = (req, res) => {
  db.query(`select work_name,user_name,work_description,school,video from work where state='1' LIMIT 0,3`, function (err, result) {
    if (err) return res.cc(err)
    res.send({
      "data": result,
      "meta": {
        "message": "作品展示获取成功！",
        "status": 200
      }
    })
  })
}