const Router = require('koa-router')

const { userValidator, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login, changePassword } = require('../controller/user.controller')
const router = new Router()

router.prefix('/users')

router.post('/register', userValidator, verifyUser, crpytPassword, register)
router.post('/login', userValidator, verifyLogin, login)
router.patch('/', auth, crpytPassword, changePassword)

module.exports = router
