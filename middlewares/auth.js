/**
 * 验证token中间件
 */
const {Forbiden} = require('../core/http-exception');
const {security} = require('../config/config');
const jwt = require('jsonwebtoken');

class Auth {
  constructor() {

  }

  /**
   * 判断token是否有效，没有也不报错，即可选token，用于判断我的收藏
   * @param authorization http header的authorization参数
   * @returns
   */
  static async optionalToken(authorization) {
    let auth = authorization || '';
    if (auth == '') {
      return
    }
    const token = auth.split(' ')[1];
    if (token == '' || token == 'null') {
      return
    }
    let decode;
    try {
      // 解析token
      decode = jwt.verify(token, security.secretKey);
    } catch (err) {
      return
    }
    return {
      uid: decode.uid,
      scope: decode.scope
    }
  }

  get tokenInfo() {
    return async (ctx, next) => {
      let errMsg = 'token不合法';
      // 判断是否有token
      const authorization = ctx.header.authorization || '';
      if (authorization == '') {
        throw new Forbiden(errMsg);
      }
      const userToken = authorization.split(' ')[1];
      if (userToken == '' || userToken == 'null') {
        throw new Forbiden(errMsg);
      }
      let decode;
      try {
        // 解析token
        decode = jwt.verify(userToken, security.secretKey);
      } catch (err) {
        if (err.name == 'TokenExpiredError') {
          errMsg = 'token已过期';
        }
        throw new Forbiden(errMsg);
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next();
    }
  }
}

module.exports = {Auth}