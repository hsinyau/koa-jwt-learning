const Router = require('koa-router')

const router = new Router()

// GET /ispeak/
router.get('/', async (ctx, next) => {
  ctx.body = "server is runing..."
})

module.exports = router
