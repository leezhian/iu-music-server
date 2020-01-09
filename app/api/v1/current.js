/**
 * 通用接口
 */
const Router = require('koa-router');
const {Cover} = require('../../modules/cover');
const {ParameterException} = require('../../../core/http-exception');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1'
});

// 获取专辑页、歌单广场页、登录页封面图
router.get('/cover/getCover.do', async (ctx, next) => {
  const query = ctx.request.query;
  const type = query.type;

  if (!type) {
    throw new ParameterException('参数为空');
  }

  const data = await Cover.selectCover(type);

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});


module.exports = router;