/**
 * 我的页接口
 */
const Router = require('koa-router');

const {User} = require('../../modules/user');
const {Playlist} = require('../../modules/playlist');
const {Auth} = require('../../../middlewares/auth');
const {ParameterException, ApiError} = require('../../../core/http-exception');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/user'
});

// 获取用户信息
router.get('/info.do', new Auth().tokenInfo,async (ctx, next) => {
  const uid = ctx.auth.uid;

  if (!uid) {
    throw new ApiError();
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

// 获取自己创建的歌单
router.get('/myPlaylist.do', new Auth().tokenInfo, async (ctx, next) => {
  const uid = ctx.auth.uid;

  if (!uid) {
    throw new ApiError();
  }
  const data = await Playlist.selectMyPlaylist(uid);

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
})

module.exports = router;