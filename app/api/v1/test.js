/**
 * 测试接口
 */
const Router = require('koa-router');
// 参数校验器
const validator = require('validator');
// 校验token
const {Auth} = require('../../../middlewares/auth');
const {User} = require('../../modules/user');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/test'
});

const {ParameterException} = require('../../../core/http-exception');

router.post('/', async (ctx, next) => {
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

module.exports = router;

