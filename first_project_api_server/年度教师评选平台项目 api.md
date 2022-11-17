# 年度教师评选平台项目 api

## api接口说明
- 接口基准地址:  http://127.0.0.1:3007
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

## 1.登录
### 1.1管理员登录
- 请求路径：login/manager
- 请求方法：post
- 请求参数

| 参数名   | 参数说明   | 备注     |
| -------- | ---------- | -------- |
| username | 管理员名   | 不能为空 |
| password | 管理员密码 | 不能为空 |

- 响应参数

| 参数名  | 参数说明 | 备注                         |
| ------- | -------- | :--------------------------- |
| status  | 状态     | 0表示登录成功，1表示登录失败 |
| message | 提示信息 | "登录成功" 或 "密码不正确"   |
| token   | 令牌     | 基于 jwt 的令牌              |

- 响应数据
~~~js
{
    "status": 0,
    "message": "登录成功！",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWFuYWdlcl9uYW1lIjoiYWRtaW4iLCJtYW5hZ2VyX3Bhc3N3b3JkIjoiIiwiaWF0IjoxNjY2OTY3NjEzLCJleHAiOjE2NjcwMDM2MTN9.6CgLh11hTf7oHlCUBNwcDQMH07bgNc9EF8fB47gb5nk"
}
~~~

### 1.2用户登录
- 请求路径：login/user
- 请求方式：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 手机号   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名  | 参数说明 | 备注                         |
| ------- | -------- | ---------------------------- |
| status  | 响应状态 | 0表示登录成功，1表示登录失败 |
| message | 提示信息 | "登录成功" 或 "密码不正确"   |
| token   | 令牌     | 基于 jwt 的令牌              |

- 响应数据
~~~js
{
    "status": 0,
    "message": "登录成功！",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiQlk2NjYiLCJwaG9uZSI6IjE3NjY1Njk4NDcxIiwicGFzc3dvcmQiOiIiLCJzY2hvb2wiOiLlub_kuJzotKLnu4_lpKflrabljY7llYblrabpmaIiLCJpYXQiOjE2Njc3NDU4NzYsImV4cCI6MTY2Nzc4MTg3Nn0.Ddf1j9yJawS_WNwn4F7z9COjhbLEa8T5QQmTAyZ1t_4"
}
~~~

## 2.权限管理
### 2.1左侧菜单权限
- 请求路径：jurisdiction/menus
- 请求方法：get
- 响应数据
~~~js
{
    "data":
        [
          {
            "id": 101,
            "menusName": "作品管理",
            "children": [
                {
                    "id": 110,
                    "authName": "作品详情",
                    "children": []
                }
            ]
          },
          ......
        ],
    "meta": {
        "msg": "获取菜单列表成功",
        "status": 200
    }
}
~~~

## 3.作品管理
### 3.1作品数据列表
- 请求路径：work/backgroundWork
- 请求方法：get
- 请求参数

| 参数名   | 参数说明       | 备注     |
| -------- | -------------- | -------- |
| query    | 作品名称       | 可为空   |
| pageSize | 每页的数据数量 | 不能为空 |
| pageNum  | 当前页码       | 不能为空 |

- 响应参数

| 参数名  | 参数说明   | 备注 |
| ------- | ---------- | ---- |
| total   | 数据总条数 |      |
| pageNum | 当前页     |      |
| works   | 作品列表   |      |

- 响应数据
~~~js
{
    "data": {
        "total": 1,
        "pageNum": 4,
        "works": [
            {
                "id": 1,
                "user_name": "蔡徐坤",
                "video": "无",
                "document": "无",
                "work_description": "如何正确的教导学生",
                "upload_time": "2017-11-09T20:36:26.000Z",
                "state": 0, // 当前用户的状态
                "work_name": "正确的教学"
            }
        ]
    },
    "meta": {
        "message": "获取成功",
        "status": 200
    }
}
~~~

### 3.2修改作品审核状态
- 请求路径：work/changeState
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 作品id   | 不能为空 |
| state  | 更改状态 | 不能为空 |

- 响应数据
~~~js
{
  "message":"审核状态：修改成功！"
  "status":200
}
~~~

### 3.3图表审核状态数据
- 请求路径：work/examine
- 请求方法：get
- 响应参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| reviewed   | 已审核   |      |
| unapproved | 未审核   |      |

- 响应数据
~~~js
{
    "data": {
        "reviewed": 3,
        "unapproved": 12
    },
    "meta": {
        "message": "获取数据成功！",
        "status": 200
    }
}
~~~

### 3.4图表每年作品提交数据
- 请求路径：work/everyyear
- 请求方法：get
- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| x      | x轴数据  |      |
| y      | y轴数据  |      |

- 响应数据
~~~js
{
    "data": {
        "x": ["2015","2016","2017","2018","2019","2020","2021","2022"],
        "y": [3,1,1,2,1,1,2,4]
    },
    "meta": {
        "message": "获取数据成功！",
        "status": 200
    }
}
~~~

### 3.5前台获取作品列表
- 请求路径：work/showWork
- 请求方法：get
- 响应参数

| 参数名           | 参数说明     | 备注 |
| ---------------- | ------------ | ---- |
| user_name        | 作者的用户名 |      |
| work_name        | 作品名称     |      |
| school           | 任教学校名称 |      |
| work_description | 作品描述     |      |

- 响应数据
~~~js
{
    "data": [
        {
            "work_name": "《正确的教学》",
            "user_name": "陈丽敏",
            "school": "广州华商学院",
            "video": "无"
        },
        {
            "work_name": "《一个月学完数据结构》",
            "user_name": "杨慧",
            "school": "清华大学",
            "video": "无"
        },
        {
            "work_name": "《不喝可乐》",
            "user_name": "BY666",
            "school": "广州华商学院",
            "video": "无"
        }
    ],
    "meta": {
        "message": "作品展示获取成功！",
        "status": 200
    }
}
~~~

### 3.6上传作品的文档
- 请求路径：work/uploadDocument
- 请求方法：post
- 请求参数

| 参数名 | 参数说明   | 备注     |
| ------ | ---------- | -------- |
| file   | 上传的文档 | 不能为空 |

- 响应参数

| 参数名       | 参数说明           | 备注      |
| ------------ | ------------------ | --------- |
| documentName | 上传文档的文件名   |           |
| message      | 上传成功的提示信息 |           |
| status       | 上传成功的状态码   | 200为成功 |

- 响应数据

~~~js
{
    "data": {
      "documentNmae": documentName //文档名字
    },
    "meta": {
      "message": "成功上传文档！",
      "status": 200
    }
}
~~~

### 3.7上传作品的视频
- 请求路径：work/uploadVideo
- 请求方法：post
- 请求参数

| 参数名 | 参数说明   | 备注     |
| ------ | ---------- | -------- |
| file   | 上传的视频 | 不能为空 |

- 响应参数

| 参数名    | 参数说明           | 备注      |
| --------- | ------------------ | --------- |
| videoName | 上传成功的文档名   |           |
| message   | 上传成功的提示信息 |           |
| status    | 上传成功的状态码   | 200为成功 |

- 响应数据

~~~js
{
    "data": {
      "videoName": videoName //视频名字
    },
    "meta": {
      "message": "成功上传视频！",
      "status": 200
    }
}
~~~

### 3.8记录完整的上传作品
- 请求路径：work/addWork
- 请求方法：post
- 请求参数

| 参数名          | 参数说明             | 备注     |
| --------------- | -------------------- | -------- |
| phone           | 上传作品的用户手机号 | 不能为空 |
| workName        | 作品名称             | 不能为空 |
| workDescription | 作品描述             | 不能为空 |
| documentName    | 作品的文档名字       | 不能为空 |
| videoName       | 作品的视频名字       | 不能为空 |

- 响应参数

| 参数名  | 参数说明               | 备注 |
| ------- | ---------------------- | ---- |
| message | 作品记录成功的提示信息 |      |
| status  | 作品记录成功的状态码   |      |

- 响应数据

~~~js
{
    "meta": {
            "message": "作品上传成功！",
            "status": 200
          }
}
~~~


## 4.用户管理
### 4.1用户列表
- 请求路径：user/userList
- 请求方法：get
- 请求参数

| 参数名   | 参数说明       | 备注     |
| -------- | -------------- | -------- |
| query    | 用户名称       | 可为空   |
| pageSize | 每页的数据数量 | 不能为空 |
| pageNum  | 当前页码       | 不能为空 |

- 响应参数

| 参数名  | 参数说明   | 备注 |
| ------- | ---------- | ---- |
| total   | 数据总条数 |      |
| pageNum | 当前页     |      |
| works   | 用户列表   |      |

- 响应数据
~~~js
{
    "data": {
        "total": 1,
        "pageNum": 4,
        "works": [
            {
                "id": 1,
                "username": "蔡徐坤",
                "phone": "17665698477",
                "school": "清华大学"
            }
        ]
    },
    "meta": {
        "message": "获取成功",
        "status": 200
    }
}
~~~

### 4.2添加用户
- 请求路径：user/addUser
- 请求方法：post
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| username | 添加的用户名 | 不能为空 |
| phone    | 添加的手机号 | 不能为空 |
| password | 添加的密码   | 不能为空 |
| school   | 添加的学校   | 不能为空 |

- 响应参数

| 参数名  | 参数说明                                 | 备注 |
| ------- | ---------------------------------------- | ---- |
| message | “用户名已存在！” 或 “用户添加成功！”     |      |
| status  | 412（用户名存在） 或 201（用户添加成功） |      |

- 响应数据
~~~js
{
  "message":"用户已存在！" / "用户添加成功!",
  "status":412 / 201
}
~~~

### 4.3修改密码
- 请求路径：user/changePassword
- 请求方法：put
- 请求参数

| 参数名   | 参数说明           | 备注     |
| -------- | ------------------ | -------- |
| phone    | 要修改密码的手机号 | 不能为空 |
| password | 修改的密码         | 不能为空 |

- 响应参数

| 参数名  | 参数说明     | 备注            |
| ------- | ------------ | --------------- |
| message | 密码修改成功 |                 |
| status  | 200          | 200表示修改成功 |

- 响应数据
~~~js
{
    "message": '密码更改成功！',
    "status": 200
}
~~~

### 4.4更换头像
- 请求路径：user/uploadAvater
- 请求方法：post
- 请求参数

| 参数名    | 参数说明       | 备注                                 |
| --------- | -------------- | ------------------------------------ |
| file      | 图片           | 不能为空                             |
| phone     | 用户电话       | 不能为空                             |
| oldAvatar | 旧的用户头像名 | 不能为空，用于更换新头像时删除旧头像 |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| path    | 图片名字 |      |
| message | 提示信息 |      |
| status  | 状态码   |      |

- 响应数据

~~~js
{
  "data":{
    "path":"图片名"
  },
  "meta":{
    "message":"更换头像成功！",
    "status":200
  }
}
~~~

### 4.5前台获取个人信息
- 请求路径：user/getUser
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| phone  | 电话     | 不能为空 |

- 响应参数

| 参数名      | 参数说明           | 备注      |
| ----------- | ------------------ | --------- |
| username    | 用户名             |           |
| phone       | 电话               |           |
| school      | 学校               |           |
| avatar      | 头像名             |           |
| work_name   | 作品名称           |           |
| upload_time | 作品提交时间       |           |
| message     | 请求返回数据的提示 |           |
| status      | 请求返回的状态     | 200为成功 |

- 响应数据

~~~js
{
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
}
~~~

### 4.6前台修改个人信息
- 请求路径：user/uploadUser
- 请求方法：put
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| username | 修改的用户名 | 不能为空 |
| phone    | 修改的电话   | 不能为空 |
| school   | 修改的学校   | 不能为空 |
| oldPhone | 修改前的电话 | 不能为空 |

- 响应参数

| 参数名  | 参数说明           | 备注      |
| ------- | ------------------ | --------- |
| message | 成功修改的提示信息 |           |
| status  | 成功修改的状态码   | 200为成功 |

- 响应数据
~~~js
{
    "message":"修改成功！",
    "status":200
}
~~~