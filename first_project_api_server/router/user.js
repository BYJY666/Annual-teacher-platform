const express = require('express')
const router = express.Router()
const multer = require('multer')

const userHandler = require('../router_handler/user')

router.get('/userList', userHandler.userList)

router.post('/addUser', userHandler.addUser)

router.put('/changePassword', userHandler.changePassword)

router.post('/uploadAvatar', multer({ dest: '../upload/images' }).single('file'), userHandler.uploadAvatar)

router.get('/getUser', userHandler.getUser)

router.put('/uploadUserinfo', userHandler.uploadUserinfo)

module.exports = router