const request = require('request')

module.exports.uploadImg = function (img) {
  // 返回一個 Promise
  return new Promise((resolve, reject) => {
    let data = { img }
    request({
      url: `URL`,
      strictSSL: false,
      method: 'POST',
      json: data,
    }, function (error, response, body) {
      if (error) {
        console.log('呼叫 uploadImg 失敗：', error)
        reject(error)
      } else {
        console.log(response.statusCode)
        resolve(body)
      }
    })
  })
}