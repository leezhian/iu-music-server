/**
 * 我的页接口
 */
const Router = require('koa-router');

const {User} = require('../../modules/user');
const {Auth} = require('../../../middlewares/auth');
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

// 修改用户昵称
router.post('/updateName.do', new Auth().tokenInfo, async (ctx, next) => {
  const params = ctx.request.body;
  const username = params.username;

  if (!username || username.trim() == '') {
    throw new ParameterException('参数错误');
  }

  const uid = ctx.auth.uid;

  await User.update({
    username: username,
    updateAt: new Date()
  }, {
    where: {
      id: uid,
      isDel: 0
    }
  });

  ctx.body = {
    code: 200,
    message: '成功'
  }
});

module.exports = router;