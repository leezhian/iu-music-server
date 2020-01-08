/**
 * 推荐页接口
 */
const Router = require('koa-router');
const Sequelize = require('sequelize');
// 参数校验器
const validator = require('validator');
const {Songs} = require('../../modules/songs');
const {Album} = require('../../modules/album');

// 设置路由前缀
const router = new Router({
  prefix: '/api/v1/recommend'
});

const {ParameterException} = require('../../../core/http-exception');

// 获取推荐单曲
router.get('/getRecommendSongs.do', async (ctx, next) => {
  // 建立关系
  const include = [{
    association: Songs.belongsTo(Album, {foreignKey: 'album_id'}),
    required: true,
    attributes: []
  }];

  // 内联查询
  const data = await Songs.findAll({
    attributes: [
      'id',
      ['song_name', 'songName'],
      ['song_link', 'link'],
      [Sequelize.col('Album.album_name'), 'albumName'],
      Sequelize.col('Album.cover'),
      'duration',
      'singer_ids'
    ],
    include: include,
    where: {'isDel': 0},
    limit: 6,
    // 随机
    order: Sequelize.fn('RAND'),
    raw: true
  });
  ctx.body = {
    code: '200',
    message: '成功',
    data
  };
});

module.exports = router;