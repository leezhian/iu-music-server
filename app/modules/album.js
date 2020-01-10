/**
 * 专辑表
 */
const {Sequelize, Model} = require('sequelize');
const moment = require('moment');
const {sequelize} = require('../../core/db');

class Album extends Model {
  /**
   * 查询专辑列表
   * @param page 第几页
   * @param pageSize 每页几条
   * @returns {Promise<any>}
   */
  static async selectAlbum(page, pageSize) {
    const data = await Album.findAll({
      attributes: [
        'id',
        ['singer_id', 'singer_ids'],
        ['album_name', 'recordName'],
        'cover',
        ['song_ids', 'songIds'],
        'description',
        'price',
        ['buy_total', 'total'],
        'createAt',
        'updateAt'
      ],
      where: {
        'isDel': 0
      },
      order: [['createAt', 'DESC']],
      offset: (page - 1) * pageSize,
      limit: pageSize,
      raw: true
    });

    return data;
  }
}

Album.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  singer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '歌手id'
  },
  album_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: '专辑名'
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '专辑图'
  },
  description: {
    type: Sequelize.TEXT,
    comment: '简介'
  },
  song_ids: {
    type: Sequelize.TEXT,
    comment: '歌曲ids，逗号隔开'
  },
  buy_total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '购买总数量'
  },
  price: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    defaultValue: 0,
    comment: '是否收费，0代表免费，其余代表多少钱'
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
  tableName: 'album'
});

module.exports = {
  Album
}