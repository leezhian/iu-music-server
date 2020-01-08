/**
 * 登录类型
 */
function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true;
    }
  }
  return false;
}

const LoginType = {
  USER_MOBILE: 100,
  USER_MSG: 101,
  USER_WECHAT: 102,
  ADMIN_MOBILE: 200,
  isThisType
}

module.exports = {
  LoginType
}