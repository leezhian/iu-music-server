/**
 * 登录注册接口
 */
const Router = require('koa-router');
const validator = require('validator');
// 登录枚举
const {LoginType, Scope} = require('../../lib/enum');
// 解密
const decrypt = require('../../lib/rsa');
// 生成token
const {generateToken} = require('../../../core/until');
const {User} = require('../../modules/user');
const {ParameterException, AuthFailed} = require('../../../core/http-exception');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/user'
});

// 登录
router.post('/login.do', async (ctx, next) => {
  const params = ctx.request.body;
  let phone = params.phone;
  let pwd = params.password;
  const type = params.type;

  if (!phone || !pwd || !type) {
    throw new ParameterException('参数不全', 10002);
  }

  // rsa解密
  pwd = decrypt.decrypt(pwd, 'utf-8');

  if (!validator.isMobilePhone(phone, 'zh-CN')) {
    throw new ParameterException('手机号码不正确');
  }

  if (!LoginType.isThisType(params.type)) {
    throw new ParameterException('type不合法');
  }

  let data;
  switch (params.type) {
    case LoginType.USER_MOBILE:
      // 手机号登录
      data = await phoneLogin(phone, pwd);
      break;
    case LoginType.USER_WECHAT:
      // 微信登录
      break;
    default:
      throw new AuthFailed('暂不支持该登录方式');
  }

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

// 手机号登录处理
async function phoneLogin(phone, pwd) {
  const user = await User.verifyPhonePwd(phone, pwd);
  const token = generateToken(user.id, Scope.GENERAL_USER);
  return {
    info: user,
    token
  };
}

// 注册
router.post('/register.do', async (ctx, next) => {
  const params = ctx.request.body;
  let phone = params.phone;
  let pwd = params.password;
  let code = params.code;

  if (!phone || !pwd || !code) {
    throw new ParameterException('参数不全', 10002);
  }

  if (!validator.isMobilePhone(phone, 'zh-CN')) {
    throw new ParameterException('手机号码不正确');
  }

  if (code != 888888) {
    throw new ParameterException('验证码错误', 10004);
  }

  const isHave = await User.ifExist(phone);

  if (isHave) {
    throw new AuthFailed('用户已存在', 20005);
  }

  // rsa解密
  pwd = decrypt.decrypt(pwd, 'utf-8');

  const user = {
    username: `iu_${phone}`,
    phone,
    password: pwd,
  }

  await User.create(user);
  ctx.body = {
    code: 200,
    message: '成功'
  }
});

// 忘记密码
router.post('/forget.do', async (ctx, next) => {
  const params = ctx.request.body;
  let phone = params.phone;
  let pwd = params.password;
  const code = params.code;

  if (!phone || !pwd || !code) {
    throw new ParameterException('参数不全', 10002);
  }

  if (!validator.isMobilePhone(phone, 'zh-CN')) {
    throw new ParameterException('手机号码不正确');
  }

  if (code != 888888) {
    throw new ParameterException('验证码错误', 10004);
  }

  pwd = decrypt.decrypt(pwd, 'utf-8');

  const isHave = await User.ifExist(phone);

  if (!isHave) {
    throw new AuthFailed('用户不存在', 20001);
  }

  await User.update({
    password: pwd
  }, {
    where: {
      phone: phone,
      isDel: 0
    }
  });

  ctx.body = {
    code: 200,
    message: '成功'
  }
});

module.exports = router;