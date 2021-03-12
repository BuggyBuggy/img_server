const express = require('express')
const multer = require("multer")

let router = express.Router()

const ImgController 		= require('../controllers/ImgController')

// 設置圖片儲存路徑
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(req.body)
    cb(null, './images')
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// 新增配置文件到muler對象
const img = multer({ storage: storage })

router.post('/img', img.array('img', 20), ImgController.action)
router.post('/delete', ImgController.delete)
router.post('/base64', ImgController.base64)

module.exports = router
