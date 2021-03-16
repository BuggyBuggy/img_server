const express = require("express");
const multer = require("multer");

let router = express.Router();

const ImgController = require("../controllers/ImgController");

// 初始化設定
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req.fillllle", req.files);
    cb(null, "public/img_upload");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});
const upload = multer({ storage: storage });

router.post("/single", upload.single("image"), ImgController.single);
router.post("/multiple", upload.array("images", 20), ImgController.multiple);
router.get("/index", ImgController.index);

module.exports = router;
