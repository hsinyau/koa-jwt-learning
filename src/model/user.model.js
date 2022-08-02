const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 定义模型
const User = seq.define('litchi_user', {
  // id会自动创建
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 非空, 唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码"
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员, 0: 不是管理员, 默认'
  }
})

// 模型同步 如果表存在, 删除重建
User.sync({ force: true })
