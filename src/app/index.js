const Koa = require('koa')
const koaBody = require('koa-body')

const index = require('../routes/index.router')
const user = require('../routes/user.router')

const app = new Koa()

// 中间件
app.use(koaBody())

// 路由
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())

module.exports = app
