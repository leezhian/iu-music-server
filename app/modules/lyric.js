/**
 * 歌词表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Lyric extends Model {

}

Lyric.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  song_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '歌曲id'
  },
  lyric: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '歌词'
  }
}, {
  sequelize,
  tableName: 'lyric'
});

module.exports = {
  Lyric
}