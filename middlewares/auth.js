/**
 * 验证token中间件
 */
const {Forbiden} = require('../core/http-exception');
const {security} = require('../config/config');
const jwt = require('jsonwebtoken');

class Auth {
  constructor() {

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
      if (userToken == '') {
        throw new Forbiden(errMsg);
      }
      try {
        // 解析token
        var decode = jwt.verify(userToken, security.secretKey);
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