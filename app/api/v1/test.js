/**
 * 测试接口
 */
const Router = require('koa-router');
// 校验token
const {Auth} = require('../../../middlewares/auth');
const {User} = require('../../modules/user');
const bcrypt = require('bcryptjs')

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/test'
});

const {ParameterException} = require('../../../core/http-exception');

router.post('/aa', async (ctx, next) => {
  const params = ctx.request.body;
  const user = {
    username: params.username,
    password: params.password,
    phone: params.phone,
    avatar: params.avatar,
    like_id: params.like_id,
    buy_id: params.buy_id,
  };

  await User.create(user);
  ctx.body = {
    msg: '成功',
    code: 200
  }
});

router.post('/', async (ctx, next) => {
  const salt = bcrypt.genSaltSync(10);
  // 返回加密后的密码
  const pwd = bcrypt.hashSync('123456', salt);

  ctx.body = {
    msg: '成功',
    code: 200,
    data: pwd
  }
});

module.exports = router;

