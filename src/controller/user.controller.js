const { createUser, getUserInfo } = require('../service/user.service')
class UserController {
  async register(ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body
    
    // 合法性
    if(!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: 10001,
        message: '用户名或密码为空',
        data: ''
      }
      return
    }

    // 合理性
    if(getUserInfo({ user_name })){
      ctx.status = 409
      ctx.body = {
        code: 10002,
        message: '用户已存在',
        data: ''
      }
      return
    }
    // 操作数据库
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
  }

  async login(ctx, next) {
    ctx.body = "登录成功"
  }
}

module.exports = new UserController()
