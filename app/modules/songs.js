/**
 * 歌曲表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Songs extends Model {

}

Songs.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  song_name: {
    type: Sequelize.STRING(30),
    allowNull: false,
    comment: '歌名'
  },
  album_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '专辑id'
  },
  singer_ids: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '歌手ids，逗号隔开'
  },
  song_link: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '歌曲地址(哈希拼接或者http)'
  },
  duration: {
    type: Sequelize.FLOAT(255, 3),
    allowNull: false,
    defaultValue: 0,
    comment: '时长，单位秒'
  },
  last_total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '上一周的播放量'
  },
  now_total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '这周的播放量'
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
  tableName: 'songs'
});

module.exports = {
  Songs
}