/**
 * 我的页接口
 */
const Router = require('koa-router');

const {User} = require('../../modules/user');
const {ParameterException} = require('../../../core/http-exception');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/user'
});

// 获取专辑列表或歌单列表
router.get('/info.do', async (ctx, next) => {
  const query = ctx.request.query;
  const uid = query.id;

  if (!uid) {
    throw new ParameterException('参数为空');
  }

  if (!Number(uid)) {
    throw new ParameterException('参数类型错误', 10003);
  }

  const data = await User.getUserInfo(uid);

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

module.exports = router;