const fs = require("fs")

let ImgController = function () { }

ImgController.index = function (req, res) {
  res.render('index')
}

ImgController.action = function (req, res) {
  // 讀取上傳的圖片訊息
  const files = req.files
  let data = []

  // 設置返回結果
  let result = {}

  if (!files.length > 0) {
    result = {
      code: 1,
      msg: '上傳失敗'
    }
  } else {
    files.forEach(function (v) {
      data.push(v.path)
    })
    result = {
      code: 0,
      data: {
        url: data
      },
      msg: '上傳成功'
    }
    console.log('result: ', result)
    res.end(JSON.stringify(result))
  }
}

ImgController.delete = function (req, res) {
  const { path } = req.body
  fs.unlink(path, (err) => {
    if (err) {
      console.log(`delete ${path} file failed`)
      res.json({
        status: 1,
        msg: `delete ${path} file failed`
      })
      return false
    }
    console.log(`delete ${path} file success`);
    res.json({
      status: 0,
      msg: `delete ${path} file success`
    })
  })
}

ImgController.base64 = function (req, res) {
  // 讀取上傳的圖片訊息
  let { img, path } = req.body
  // path = (path) ? path : 'defalut path'


  //	console.log(img)
  console.log(img.length)
  let data = [];
  // 設置返回結果
  let result = {};
  if (!img.length > 0) {
    result.code = 1;
    result.errMsg = '上傳失败';
    console.log(result)
    res.end(JSON.stringify(result));
  } else {
    result.code = 0;
    result.errMsg = '上傳成功';

    const bar = new Promise((resolve, reject) => {
      img.forEach(function (v, k) {
        //找他的副檔名
        const key1 = v.indexOf('/')
        const key2 = v.indexOf(';')
        const resss = v.slice(key1 + 1, key2)
        console.log(resss)

        var name = `images/${path}/${Date.now()}-${k}.${resss}`;

        var base64Data = v.replace(new RegExp(`^data:image\/${resss};base64,`), '');
        fs.writeFile(name, base64Data, 'base64', function (err) {
          if (err) {
            result.code = 1;
            result.errMsg = '上傳失败';
            console.log(err);
            reject(err)
          } else {
            console.log("add")
            data.push(name);
            if (k === img.length - 1) resolve();
          }
        });
      })
    });

    bar.then(() => {
      result.data = {
        url: data
      }
      console.log(result)
      res.end(JSON.stringify(result));
    })
      .catch((err) => {
        console.log('錯誤')
        console.log(result)
        res.end(JSON.stringify(result));
      });



  }

}

module.exports = ImgController