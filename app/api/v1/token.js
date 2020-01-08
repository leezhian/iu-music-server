/**
 * 生成token
 */
const Router = require('koa-router');
const validator = require('validator');
const {LoginType} = require('../../lib/enum');
// const {User} = require('../../modules/user');
// 生成token
const {generateToken} = require('../../../core/until');
// 错误
const {ParameterException, AuthFailed} = require('../../../core/http-exception');

const router = new Router({
  prefix: 'api/v1/token'
});

router.post('/', async (ctx) => {
  const params = ctx.request.body;


  if (!LoginType.isThisType(params.type)) {
    throw new ParameterException('type不合法');
  }

  let token;
  switch (params.type) {
    case LoginType.USER_MOBILE:
      token = await phoneLogin(params.phone, params.secret);
      break;
    case LoginType.USER_WECHAT:
      break;
    default:
      throw new AuthFailed('暂不支持该登录方式');
  }

  ctx.body = {
    token
  }
});

async function phoneLogin(phone, secret) {
  // const user = await User.verifyPhonePwd(phone, secret);
  // return generateToken(user.id, 2);
}

module.exports = router;