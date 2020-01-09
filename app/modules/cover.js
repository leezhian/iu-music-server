/**
 * 歌单专辑登录封面表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Cover extends Model {
  /**
   * 查询封面图
   * @param type 类型
   * @returns {Promise<any>}
   */
  static async selectCover(type) {
    const data = await Cover.findOne({
      attributes: [
        'id',
        'cover'
      ],
      where: {
        type: type
      }
    });

    return data;
  }
}

Cover.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '封面地址'
  },
  type: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    comment: '类型，1专辑封面，2歌单广场，3登录'
  },
}, {
  sequelize,
  tableName: 'cover'
});

module.exports = {
  Cover
}