/**
 * 购买专辑表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Buyalbum extends Model {

}

Buyalbum.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  album_ids: {
    type: Sequelize.TEXT,
    comment: '专辑ids，逗号隔开'
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
  }
}, {
  sequelize,
  tableName: 'buyalbum'
});

module.exports = {
  Buyalbum
}