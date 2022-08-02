const Koa = require('koa')
const koaBody = require('koa-body')

const errHandler = require('./errHandler')

const index = require('../routes/index.router')
const user = require('../routes/user.router')

const app = new Koa()

// 中间件
app.use(koaBody())

// 路由
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// 统一错误处理
app.on('error', errHandler)

module.exports = app
