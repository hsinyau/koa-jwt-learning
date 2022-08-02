const Router = require('koa-router')

const router = new Router()

router.prefix('/ispeak')

// GET /ispeak/
router.get('/', async (ctx, next) => {
  ctx.body = "hello ispeak"
})

module.exports = router
