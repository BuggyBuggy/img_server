const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")

/* middleware */
const setHeader = require('./middleware/setHeader')
const errorHandler = require('./middleware/errorHandler')
// const getUserID = require('./middleware/getUserID')

/* router */
const ImgRoute = require('./routes/ImgRoute')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.use(setHeader)

/* basic setting */
app.use(bodyParser.json({ limit: '1000kb' }))
app.use(express.static('public'))
/* view engine setup */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* router path */
app.use('/api', ImgRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

/* error handler */
app.use(errorHandler)

module.exports = app
