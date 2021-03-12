module.exports = async function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Access-Token,X-Token')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method == 'OPTIONS') {
    res.send(200)
  }
  else {
    next()
  }
}