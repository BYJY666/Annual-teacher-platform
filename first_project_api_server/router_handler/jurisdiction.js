const db = require('../db/index')

exports.menus = (req, res) => {
  const sql = `select * from menus`

  db.query(sql, function (err, results) {
    if (err) return res.cc(err)
    var arr1 = []
    var arr2 = []
    for (let i = 0; i < results.length; i++) {
      if (results[i].menus_level == 0) {
        arr1.push({
          "id": results[i].menus_id,
          "menusName": results[i].menus_name,
          "children": []
        })
      } else if (results[i].menus_level == 1) {
        arr2.push({
          "id": results[i].menus_id,
          "pid": results[i].menus_pid,
          "menusName": results[i].menus_name,
          "path": results[i].menus_path,
          "children": []
        })
      }
    }

    arr1.forEach(item => {
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].pid == item.id) {
          delete arr2[i].pid
          item.children.push(arr2[i])
        }
      }
    })

    res.send({
      "data": arr1,
      "meta": {
        "status": 200,
        "message": "获取菜单列表成功"
      }
    })
  })
}