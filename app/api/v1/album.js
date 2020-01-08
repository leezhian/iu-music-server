/**
 * 专辑页接口
 */
const Router = require('koa-router');
const Base64 = require('js-base64').Base64;

const {Lyric} = require('../../modules/lyric');
const {ParameterException} = require('../../../core/http-exception');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/album'
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