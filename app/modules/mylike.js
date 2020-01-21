/**
 * 收藏表
 */
const {Sequelize, Model} = require('sequelize');
const moment = require('moment');
const {sequelize} = require('../../core/db');

class Mylike extends Model {
  /**
   * 查询某uid的信息
   * @param uid 用户id
   * @returns {Promise<any>}
   */
  static async selectData(uid) {
    const data = await Mylike.findOne({
      raw: true,
      where: {
        u_id: uid
      }
    });

    return data;
  }

  /**
   * 修改某个字段的ids
   * @param ids ids字符串
   * @param updateName 字段名
   * @param id 表id
   * @returns {Promise<void>}
   */
  static async updateIds(ids, updateName, id) {
    await Mylike.update({
      [updateName]: ids,
      updateAt: new Date()
    }, {
      where: {
        id: id
      }
    })
  }
}

Mylike.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  u_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户id'
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
}, {
  sequelize,
  tableName: 'mylike'
});

module.exports = {
  Mylike
}