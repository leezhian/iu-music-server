/**
 * 专辑页接口
 */
const Router = require('koa-router');
const Base64 = require('js-base64').Base64;

const {Lyric} = require('../../modules/lyric');
const {Album} = require('../../modules/album');
const {Singer} = require('../../modules/singer');
const {Playlist} = require('../../modules/playlist');
const {Songs} = require('../../modules/songs');
const {ParameterException} = require('../../../core/http-exception');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/album'
});

// 获取专辑列表或歌单列表
router.get('/getRecordList.do', async (ctx, next) => {
  const query = ctx.request.query;
  let page = query.page || 1;
  let pageSize = query.pageSize || 6;
  const type = query.type || 1;

  if (!Number(page) || !Number(pageSize) || !Number(type)) {
    throw new ParameterException('参数类型错误', 10003);
  }

  page = parseInt(page);
  pageSize = parseInt(pageSize);

  let data = {};
  let result = [];
  // 获取专辑列表
  if (type == 1) {
    result = await Album.selectAlbum(page, pageSize);
    await Singer.selectSingers(result);
  } else if (type == 2) {
    // 获取歌单列表
    result = await Playlist.selectPlaylist(page, pageSize);
  }
  data.list = result || [];
  // 判断是否有下一页
  data.hasNextPage = result.length >= pageSize;

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

// 获取专辑详情
router.post('/getSongList.do', async (ctx, next) => {
  const params = ctx.request.body;
  const songIds = params.songIds;

  if (!songIds) {
    throw new ParameterException('参数为空');
  }

  if (typeof songIds != 'string') {
    throw new ParameterException('参数类型错误', 10003);
  }

  const data = await Songs.selectSongList(songIds);
  await Singer.selectSingers(data);

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

// 获取歌词
router.get('/getLyric.do', async (ctx, next) => {
  const id = ctx.request.query.id;

  if (!id) {
    throw new ParameterException('参数为空');
  }

  if (!Number(id)) {
    throw new ParameterException('参数类型错误', 10003);
  }

  const data = await Lyric.findOne({
    attributes: [
      'id',
      'lyric'
    ],
    where: {
      id: parseInt(id)
    }
  });

  if (data) {
    data.lyric = Base64.encode(data.lyric);
  }

  ctx.body = {
    code: 200,
    message: '成功',
    data
  }
});

module.exports = router;