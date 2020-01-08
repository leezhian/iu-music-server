/**
 * 歌手表
 */
const {Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');
const {ApiError, FindDataError} = require('../../core/http-exception');

class Singer extends Model {
  /**
   * 返回歌手id和歌手名
   * @param id 歌手id
   * @returns {Promise<any>}
   */
  static async selectSingerName(id) {
    const res = await Singer.findOne({
      attributes: ['id', ['singer_name', 'singerName']],
      where: {
        id: id
      }
    });
    if (!res) {
      throw new FindDataError();
    }
    return res;
  }

  /**
   * 根据data中的singer_ids, 查询data中所有的歌手信息
   * @param data 包含singer_ids的data
   * @returns {Promise<any>}
   */
  static async selectSingers(data) {
    // 缓存歌手列表
    let singers = {};
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      // 这首歌演唱歌手列表
      let singerList = [];
      if (!value.singer_ids) {
        throw new ApiError();
      }
      if (typeof value.singer_ids != 'String') {
        value.singer_ids = value.singer_ids.toString();
      }
      const ids = value.singer_ids.split(',');

      // 遍历歌手id列表
      for (let j = 0; j < ids.length; j++) {
        const item = ids[j];
        // 判断是否在缓存中
        if (singers[item]) {
          singerList.push(singers[item]);
        } else {
          const singerInfo = await this.selectSingerName(item);
          singerList.push(singerInfo);
          singers[item] = singerInfo;
        }
      }
      // 把获取的歌手列表添加到返回数据中
      value.singerList = singerList;
      delete value['singer_ids'];
    }

    return data;
  }
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