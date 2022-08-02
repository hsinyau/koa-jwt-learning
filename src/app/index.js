const Koa = require('koa')

const index = require('../routes/index.router')
const user = require('../routes/user.router')

const app = new Koa()

// 路由
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())

module.exports = app
