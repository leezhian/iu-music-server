/**
 * 通用接口
 */
const Router = require('koa-router');
const {Cover} = require('../../modules/cover');
const {Mylike} = require('../../modules/mylike');
const {Auth} = require('../../../middlewares/auth');
const {ParameterException, ApiError} = require('../../../core/http-exception');

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

router.post('/like/updateLike.do', new Auth().tokenInfo, async (ctx, next) => {
  const params = ctx.request.body;
  const uid = ctx.auth.uid; // 用户id
  const likeId = params.likeid; // 喜欢的id
  const type = params.type; // 类型 1专辑 2歌单 3歌曲

  if (!uid) {
    throw new ApiError();
  }

  if (!likeId || !type) {
    throw new ParameterException();
  }

  if (!Number(likeId) || !Number(type)) {
    throw new ParameterException('参数类型错误', 10003);
  }

  let updateName; // 记录要修改的列
  switch (type) {
    case 1:
      updateName = 'album_ids';
      break;
    case 2:
      updateName = 'playlist_ids';
      break;
    case 3:
      updateName = 'song_ids';
      break;
  }

  const data = await Mylike.findData(uid);
  if (!data) {
    Mylike.create({
      u_id: uid,
      [updateName]: likeId.toString()
    });

    ctx.body = {
      code: 200,
      message: '成功'
    }
    return
  }
  // 取对应字段的数据
  let likeArr = data[updateName];
  // 如果对应字段没有数据
  if (!likeArr) {
    await Mylike.updateIds(likeId.toString(), updateName, data.id);

    ctx.body = {
      code: 200,
      message: '成功'
    }
    return
  }

  likeArr = likeArr.split(','); // 切割字符串
  // 查找是否已经收藏
  const index = likeArr.findIndex((value)=> {
    return value == likeId;
  });

  if (index > -1) {
    // 如果收藏了，则是取消收藏
    likeArr.splice(index, 1);
  } else {
    likeArr.push(likeId);
  }

  // 数组转成字符串
  const ids = likeArr.join(',');
  // 修改表数据
  await Mylike.updateIds(ids, updateName, data.id);

  ctx.body = {
    code: 200,
    message: '成功'
  }
});

module.exports = router;