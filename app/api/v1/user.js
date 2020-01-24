/**
 * 我的页接口
 */
const Router = require('koa-router');
const _ = require('lodash');

const {User} = require('../../modules/user');
const {Playlist} = require('../../modules/playlist');
const {Mylike} = require('../../modules/mylike');
const {Album} = require('../../modules/album');
const {Singer} = require('../../modules/singer');
const {Songs} = require('../../modules/songs');

const {Auth} = require('../../../middlewares/auth');
const {ParameterException, ApiError} = require('../../../core/http-exception');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/user'
});

// 获取用户信息
router.get('/info.do', new Auth().tokenInfo, async (ctx, next) => {
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
});

// 获取收藏的歌单或者专辑
router.get('/getRecordList.do', new Auth().tokenInfo, async (ctx, next) => {
  const query = ctx.request.query;
  let type = query.type; // 1是专辑 2是歌单
  const uid = ctx.auth.uid;

  if (!uid) {
    throw new ApiError();
  }

  if (!type) {
    throw new ParameterException('参数错误');
  }

  if (!Number(type)) {
    throw new ParameterException('参数类型错误', 10003);
  }

  type = Number(type);

  const likeData = await Mylike.selectData(uid);

  if (!likeData) {
    ctx.body = {
      code: 200,
      message: '成功',
      data: null
    }

    return
  }

  let updateName; // 记录要修改的列
  switch (type) {
    case 1:
      updateName = 'album_ids';
      break;
    case 2:
      updateName = 'playlist_ids';
      break;
  }
  // 取对应类型的数据
  const ids = likeData[updateName];
  // 如果没有数据
  if (!ids) {
    ctx.body = {
      code: 200,
      message: '成功',
      data: null
    }
    return
  }

  let data;
  if (type == 1) {
    // 获取收藏专辑
    data = await Album.selectAlbums(ids);
    await Singer.selectSingers(data);
  } else if (type == 2) {
    // 获取收藏歌单
    data = await Playlist.selectPlaylists(ids);
  }

  _.forEach(data, value => {
    value.isLike = true;
  });

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

// 我喜欢的
router.get('/getLikeSongs.do', new Auth().tokenInfo, async (ctx, next) => {
  const uid = ctx.auth.uid;

  if (!uid) {
    throw new ApiError();
  }

  const likeData = await Mylike.selectData(uid);

  if (!likeData) {
    ctx.body = {
      code: 200,
      message: '成功',
      data: null
    }
    return
  }

  // 取对应类型的数据
  const ids = likeData.song_ids;
  // 如果没有数据
  if (!ids) {
    ctx.body = {
      code: 200,
      message: '成功',
      data: null
    }
    return
  }

  const data = await Songs.selectSongList(ids);
  await Singer.selectSingers(data);
  _.forEach(data, value => {
    value.isLike = true;
  });

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

module.exports = router;