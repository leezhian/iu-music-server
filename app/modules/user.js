/**
 * 用户表
 */
const {Sequelize, Model} = require('sequelize');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../../core/db');

class User extends Model {

}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  username: {
    type: Sequelize.STRING(16),
    allowNull: false,
    comment: '昵称'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      // 生成salt， 参数越大越安全，同时成本越高
      const salt = bcrypt.genSaltSync(10);
      // 返回加密后的密码
      const pwd = bcrypt.hashSync(val, salt);
      this.setDataValue('password', pwd);
    },
    comment: '密码'
  },
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    comment: '手机号'
  },
  avatar: {
    type: Sequelize.STRING,
    comment: '头像'
  },
  like_id: {
    type: Sequelize.INTEGER,
    comment: 'mylike表id记录'
  },
  buy_id: {
    type: Sequelize.INTEGER,
    comment: 'buyalbum表id记录'
  },
  createAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    comment: '创建时间'
  },
  updateAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    comment: '修改时间'
  },
  isDel: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '是否删除，0否，1是'
  }
}, {
  sequelize,
  tableName: 'user'
});

module.exports = {
  User
}