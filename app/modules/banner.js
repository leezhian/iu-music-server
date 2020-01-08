/**
 * 轮播图表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Banner extends Model {

}

Banner.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  banner_url: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '轮播图地址'
  },
  sort: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    defaultValue: 10,
    comment: '权重，按小到大排序'
  },
  linkType: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 1,
    comment: '链接类型，1官方歌单，2专辑'
  },
  link: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '链接，歌单专辑对应id'
  },
  state: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '0下架 1上架'
  }
}, {
  sequelize,
  tableName: 'banner'
});

module.exports = {
  Banner
}