/**
 * 歌单表
 */
const {Sequelize, Model} = require('sequelize');
const moment = require('moment');
const {sequelize} = require('../../core/db');

class Playlist extends Model {

}

Playlist.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  playlist_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: '歌单名字'
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '歌单图(哈希拼接或http)'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '创建者id'
  },
  description: {
    type: Sequelize.TEXT,
    comment: '简介'
  },
  song_ids: {
    type: Sequelize.TEXT,
    comment: '歌曲ids，逗号隔开'
  },
  listen_total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '播放总次数'
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
  tableName: 'playlist'
});

module.exports = {
  Playlist
}