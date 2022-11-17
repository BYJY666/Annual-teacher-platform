const express = require('express')
const router = express.Router()

const loginHandler = require('../router_handler/login')

//管理员登录
router.post('/manager', loginHandler.manager)

//用户登录
router.post('/user', loginHandler.user)

module.exports = router