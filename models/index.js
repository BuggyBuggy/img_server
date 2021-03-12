const mysql = require('mysql')
let self = require('./personalSetting')

const pool = mysql.createPool({
  host: self.mysql.host,
  port: self.mysql.port,
  user: self.mysql.user,
  password: self.mysql.password,
  database: self.mysql.database,
  socketPath: self.mysql.socketPath,
  dateStrings: self.mysql.dateStrings
})

/*
  接收一個sql語法以及所需的values
  這裡修收第二參數values的原因是可以使用mysql的佔位符 '?'
  比如 query(`SELECT * FROM my_db WHERE id = ?`, [value])
*/
module.exports.query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        console.log(sql, values)
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 結束
          connection.release()
        })
      }
    })
  })
}