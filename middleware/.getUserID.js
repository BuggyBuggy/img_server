
var md5 = require('md5')

module.exports =
  async function (req, res, next) {

      let tapbeeData = req.cookies["tapbee_data"]
      // let tapbeeData = '{"user_id":"10536001","user_name":"momo","len":"zh-tw","factory_area":"tapbee"}:8c7910ac47b4d7e360d84745e3a2a6d2'		//雜錯錯誤
      // let tapbeeData = '{"user_id":"10536001","user_name":"momo","len":"zh-tw","factory_area":"tapbee"}:dd118390113ddabd820fff2193ecac40'		//雜錯正確
      let uid, uData
      // if(req.cookies.UID && req.cookies.UDATA){
      //   req.uid = req.cookies.UID.replace('.auo@Larzio', '')
      //   req.udata = req.cookies.UDATA
      //   console.log({'msg': '取得cookie資訊', 'uid':req.uid, 'udata': req.udata})
      // }else{
      // 準備解密
      // new Buffer('key1=value1&key2=value2').toString('base64')
      if (tapbeeData) {
        tapbeeData = new Buffer(tapbeeData, 'base64').toString()
        let lastIndex = tapbeeData.lastIndexOf(":")		// 找到最後一個『:』的index		
        let hashKey = tapbeeData.substring(lastIndex + 1, tapbeeData.length)		// 到最後一個冒號之後（雜臭字串）
        uData = tapbeeData.substring(0, lastIndex)		// 到最後一個冒號之前（user data）
        // console.log('uData', uData)
        // console.log('hashKey', hashKey)

        let superKey = "momolilymichelle"
        let result = md5(uData + superKey)
        // console.log('result', result)
        if (hashKey === result) {
          uData = JSON.parse(uData)
          req.uid = uid = uData.user_id
          req.udata = uData
          console.log({ 'msg': '解密完cookie資訊', 'uid': req.uid, 'udata': req.udata })
          res.cookie('UID', uid)
          res.cookie('UDATA', uData)
          next()			
        } else {
          console.log('資料被串改')
          // 資料被串改
          res.json({ code: 2001, message: 'key is not match' })
        }
      } else {
        if(req.cookies.UID && req.cookies.UDATA){
          req.uid = req.cookies.UID.replace('.auo@Larzio', '')
          req.udata = req.cookies.UDATA
          console.log({'msg': '取得cookie資訊', 'uid':req.uid, 'udata': req.udata})          
        }else{
          // 自設
          req.uid = 'lucy'
          req.udata = {
            "user_id": "lucy",
            "user_name": "lucy",
            "len": "zh-tw",
            "factory_area": "tapbee"
          }
          console.log({ 'msg': '自設cookie資訊', 'uid': req.uid, 'udata': req.udata })
          res.clearCookie("UID")
          res.clearCookie("UDATA")          
        }
        next()
      }
      // }
      // if( (!tapbeeData) && (!req.cookies.UID) ){
      // 	// user 可能不是用app進來的，所以無法取得user資訊
      // 	res.json({code:2002, message: 'user not found'})
      // }else{
      // 	next()
      // }		
      // next()
  }