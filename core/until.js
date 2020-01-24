/**
 * 签发token
 */
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// 导入token配置
const {security} = require('../config/config');

const {Auth} = require('../middlewares/auth');
const {Mylike} = require('../app/modules/mylike');

/**
 * 签发token
 * @param uid
 * @param scope 权限
 */
const generateToken = function (uid, scope) {
  // 签发令牌
  // 参数：第一个参数是想要放的信息对象，第二个参数是私钥，第三个参数是可选参数项
  const token = jwt.sign({
      uid,
      scope
    },
    security.secretKey,
    {
      expiresIn: security.expiresIn
    }
  );
  return token;
}

/**
 * 修改数据，判断是否是自己收藏的
 * @param authorization http header的authorization参数
 * @param data 需要修改的数据
 * @param type 类型1专辑 2歌单 3单曲
 * @returns {Promise<void>}
 */
const whetherLike = async function (authorization, data, type) {
  const userInfo = await Auth.optionalToken(authorization);
  let ids;
  let haveLike = false;

  if (userInfo) {
    const likeData = await Mylike.selectData(userInfo.uid);

    if (likeData) {
      let temp;
      switch (type) {
        case 1:
          temp = 'album_ids';
          break;
        case 2:
          temp = 'playlist_ids';
          break;
        case 3:
          temp = 'song_ids';
          break;
      }

      if (likeData[temp] ) {
        ids = likeData[temp].split(',');

        if (ids) {
          haveLike = true;
        }
      }
    }
  }

  _.forEach(data, (value) => {
    if (haveLike) {
      const b = _.includes(ids, value.id.toString());
      value.isLike = b;
      return
    }
    value.isLike = haveLike;
  });
}

module.exports = {
  generateToken,
  whetherLike
}