const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  ctx.body = "hello"
})

app.listen(2333, () => {
  console.log("server is runing on http://localhost:2333")
})
