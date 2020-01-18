/**
 * 歌曲表
 */
const {Sequelize, Model} = require('sequelize');
const moment = require('moment');
const {sequelize} = require('../../core/db');


class Videos extends Model {

}

Videos.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: '标题'
  },
  singer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '歌手id'
  },
  song_id: {
    type: Sequelize.INTEGER,
    comment: '歌曲id'
  },
  video_link: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '视频地址(哈希拼接或者http)'
  },
  duration: {
    type: Sequelize.FLOAT(255, 3),
    allowNull: false,
    defaultValue: 0,
    comment: '时长，单位秒'
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
  tableName: 'videos'
});

module.exports = {
  Videos
}