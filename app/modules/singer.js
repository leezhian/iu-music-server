/**
 * 歌手表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Singer extends Model {

}

Singer.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  singer_name: {
    type: Sequelize.STRING(16),
    allowNull: false,
    comment: '歌手名'
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '歌手头像'
  },
  desc: {
    type: Sequelize.TEXT,
    comment: '简介'
  },
  surname: {
    type: Sequelize.STRING(1),
    allowNull: false,
    comment: '姓氏首字母'
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
  tableName: 'singer'
});

module.exports = {
  Singer
}