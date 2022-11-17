const express = require('express')
const router = express.Router()

const jurisdictionHandler = require('../router_handler/jurisdiction')

//左侧菜单栏权限
router.get('/menus', jurisdictionHandler.menus)

module.exports = router