const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited } = require('../constant/err.types')

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

  if(await getUserInfo({ user_name })){
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }
  await next()
}

module.exports = {
  userValidator,
  verifyUser
}
