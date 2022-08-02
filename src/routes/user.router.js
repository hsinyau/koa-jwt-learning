const Router = require('koa-router')

const { userValidator, verifyUser, crpytPassword } = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')
const router = new Router()

router.prefix('/users')

router.post('/register', userValidator, verifyUser, crpytPassword, register)
router.post('/login', login)

module.exports = router
