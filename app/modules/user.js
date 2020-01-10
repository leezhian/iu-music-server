/**
 * 用户表
 */
const {Sequelize, Model} = require('sequelize');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const {sequelize} = require('../../core/db');
const {NotFound, AuthFailed} = require('../../core/http-exception');

class User extends Model {
  /**
   * 检验当前手机号密码是否正确
   * @param phone 手机号
   * @param plainPwd 加密密码
   * @returns {Promise<any>}
   */
  static async verifyPhonePwd(phone, plainPwd) {
    // 判断是否有该用户
    const user = await User.findOne({
      attributes: [
        'id',
        'username',
        'phone',
        'avatar',
        ['like_id', 'likeId'],
        ['buy_id', 'buyId']
      ],
      where: {
        phone,
        isDel: 0
      }
    });
    if (!user) {
      throw new NotFound('账号不存在');
    }
    // 判断是否密码正确
    const correct = bcrypt.compareSync(plainPwd.toString(), user.password);
    if (!correct) {
      throw new AuthFailed('用户名或密码错误', 20003);
    }
    return user;
  }
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
    unique: true,
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
    comment: '创建时间',
    get() {
      return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updateAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    comment: '修改时间',
    get() {
      return moment(this.getDataValue('updateAt')).format('YYYY-MM-DD HH:mm:ss');
    }
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