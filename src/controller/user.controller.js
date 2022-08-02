const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.types')

class UserController {
  async register(ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body

    // 操作数据库
    try {
      const res = await createUser(user_name, password)
      // console.log(res)
      ctx.body = {
        code: 200,
        message: '用户注册成功',
        data: {
          id: res.id,
          user_name: res.user_name
        }
      }
    }catch (err) {
      console.log(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body
    ctx.body = `欢迎回来, ${user_name}`
  }
}

module.exports = new UserController()
