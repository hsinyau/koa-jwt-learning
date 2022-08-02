const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { TokenExpiredError } = require('../constant/err.types')
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  console.log(token)

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch(err.name){
      case 'TokenExpiredError':
        console.error('Token已过期', err)
        return ctx.app.emit('error', TokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的Token', err)
        return ctx.app.emit('error', invalidPassword, ctx)
    }
  }
  
  await next()
}

module.exports = {
  auth
}
