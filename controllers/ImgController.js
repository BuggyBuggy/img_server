const fs = require("fs");

let ImgController = function () {};

ImgController.index = function (req, res) {
  res.render("index");
};

ImgController.single = async function (req, res) {
  const file = req.file;
  console.log(file);
  const fileInfo = {
    originalName: file.originalname,
    size: file.size,
    b64: new Buffer(fs.readFileSync(file.path)).toString("base64"),
  };
  // fs.unlink(file.path);
  res.send(fileInfo);
};

ImgController.multiple = async function (req, res) {
  let fileInfo = [];
  const files = req.files;
  console.log(files);
  // req.files.forEach(function (v) {
  //   fileInfo.push({
  //     originalName: v.originalname,
  //     size: v.size,
  //     b64: new Buffer(fs.readFile(v.path)).toString("base64"),
  //   });
  //   fs.unlink(v.path);
  // });
  res.send(fileInfo);
};

module.exports = ImgController;
