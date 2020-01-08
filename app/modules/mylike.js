/**
 * 收藏表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Mylike extends Model {

}

Mylike.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  song_ids: {
    type: Sequelize.TEXT,
    comment: '喜欢歌曲的ids，逗号隔开'
  },
  album_ids: {
    type: Sequelize.TEXT,
    comment: '喜欢的专辑ids'
  },
  playlist_ids: {
    type: Sequelize.TEXT,
    comment: '喜欢的歌单ids'
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
  tableName: 'mylike'
});

module.exports = {
  Mylike
}