const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited, userRegisterError, userDoesNotExist, userLoginError, invalidPassword } = require('../constant/err.types')
const { emit } = require('nodemon')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  if(!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })
    if(res){
      console.log('用户名已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.log('获取用户信息错误', err)
    ctx.app,emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

const crpytPassword = async (ctx,next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  // 判断用户是否存在(不存在就报错)
  // 密码是否匹配(不匹配就报错)
  const { user_name, password } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })

    if(!res) {
      console.error("用户名不存在", { user_name })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }

    if(!bcrypt.compareSync(password, res.password)){
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
    
  } catch (err) {
    console.error(err)
    ctx.app.emit('error', userLoginError, ctx)
    return
  }
  
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin
}
