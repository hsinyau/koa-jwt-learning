const Koa = require('koa')
const app = new Koa()

const { APP_PORT } = require('./config/config.default')

app.use((ctx, next) => {
  ctx.body = "hello"
})

app.listen(APP_PORT, () => {
  console.log("server is runing on http://localhost:2333")
})
