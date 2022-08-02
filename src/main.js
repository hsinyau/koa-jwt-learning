const Koa = require('koa')

const { APP_PORT } = require('./config/config.default')
const index = require('./routes/index.router')
const ispeak = require('./routes/ispeak.router')

const app = new Koa()

// 路由
app.use(index.routes(), index.allowedMethods())
app.use(ispeak.routes(), ispeak.allowedMethods())

app.listen(APP_PORT, () => {
  console.log(`server is runing on http://localhost:${APP_PORT}`)
})
