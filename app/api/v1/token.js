/**
 * 检查token
 */
const Router = require('koa-router');
const {User} = require('../../modules/user');
// 错误
const {ApiError} = require('../../../core/http-exception');
const {Auth} = require('../../../middlewares/auth');

const router = new Router({
  prefix: '/api/v1'
});

// 检查token是否有效
router.get('/token.do', new Auth().tokenInfo, async (ctx) => {
  if (!ctx.auth) {
    throw new ApiError();
  }
  const data = await User.getUserInfo(ctx.auth.uid);
  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

module.exports = router;