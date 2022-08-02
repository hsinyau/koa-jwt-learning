const Router = require('koa-router')

const { userValidator, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login } = require('../controller/user.controller')
const router = new Router()

router.prefix('/users')

router.post('/register', userValidator, verifyUser, crpytPassword, register)
router.post('/login', userValidator, verifyLogin, login)
router.patch('/', auth, (ctx, next) => {
  ctx.body = '修改密码成功'
})

module.exports = router
