const log4js = require('log4js')

log4js.configure({
  appenders: {
    out: { type: 'console' , layout:{type:'pattern' , pattern: '%[[%d][%c][%z][%h]%] %m'}},
    fileinfo: { type: 'dateFile' , filename: 'logger_info/log_info', pattern: '-yyyy-MM-dd.log' , layout:{type:'pattern' , pattern: '[%d][%c][%z][%h]%m'}, alwaysIncludePattern: true},
    filewarning: { type: 'dateFile' , filename: 'logger_warning/log_warning', pattern: '-yyyy-MM-dd.log' , layout:{type:'pattern' , pattern: '[%d][%c][%z][%h]%m'}, alwaysIncludePattern: true},
    filefatal: { type: 'dateFile' , filename: 'logger_fatal/log_fatal', pattern: '-yyyy-MM-dd.log' , layout:{type:'pattern' , pattern: '[%d][%c][%z][%h]%m'}, alwaysIncludePattern: true},
    // filesmtp: { type: '@log4js-node/smtp', transport: 'SMTP' , recipients: 'ss910316@tapbee.cc,michelle.wang@tapbee.cc' , SMTP: { host: 'smtp.gmail.com', port: 465 , secureConnection: true , auth: {user: "ss910316@tapbee.cc",  pass: "Q0W1E2R3" }, debug: true} },
    // _info: { type: 'logLevelFilter', appender: 'out', level: 'info', maxLevel: 'info'},
    // _error: { type: 'logLevelFilter', appender: 'file', level: 'error'}
  },
  categories: {
    default: { appenders: [ 'out'], level:'debug' },
    Info: { appenders: [ 'fileinfo' ], level: 'info'},
    Param_Warning: { appenders: [ 'filewarning' ], level: 'warn'},
    DB_Fatal: { appenders: [ 'filefatal' , 'out' ], level: 'fatal'},
  }
})

levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
}

exports.logger = function (name, level) {
    const logger = log4js.getLogger(name)
    logger.level = (levels[level] || levels['all'])
    return logger
}

// 配合 express 使用的方法
exports.use = function (app, level) {
    app.use(log4js.connectLogger(log4js.getLogger('general'), {
        level: levels[level] || levels['all'],
        format: ':method  :status :referrer :url :response-timems '
    }))
}
