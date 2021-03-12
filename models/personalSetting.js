module.exports = {
  mysql: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: true,
    socketPath: process.env.DB_SOCKETPATH,
    charset: 'utf8mb4'
  }
}