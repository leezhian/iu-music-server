/**
 * 签发token
 */
const jwt = require('jsonwebtoken');
// 导入token配置
const {security} = require('../config/config');

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

module.exports = {
  generateToken
}