const express = require('express')
const router = express.Router()
const multer = require('multer')

const workHandler = require('../router_handler/work')

//后台作品分页与查询
router.get('/backgroundWork', workHandler.backgroundWork)

router.put('/changeState', workHandler.changeState)

router.get('/examine', workHandler.examine)

router.get('/everyyear', workHandler.everyyear)

router.post('/uploadVideo', multer({ dest: '../upload/videos' }).single('file'), workHandler.uploadVideo)

router.post('/uploadDocument', multer({ dest: '../upload/documents' }).single('file'), workHandler.uploadDocument)

router.post('/addWork', workHandler.addWork)

router.get('/showWork', workHandler.showWork)

module.exports = router