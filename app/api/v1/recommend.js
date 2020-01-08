/**
 * 推荐页接口
 */
const Router = require('koa-router');
const Sequelize = require('sequelize');
// 参数校验器
const {Songs} = require('../../modules/songs');
const {Album} = require('../../modules/album');
const {Singer} = require('../../modules/singer');
const {Banner} = require('../../modules/banner');
const {Playlist} = require('../../modules/playlist');
const {User} = require('../../modules/user');

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
  let data = await Songs.findAll({
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

  await Singer.selectSingers(data);

  ctx.body = {
    code: '200',
    message: '成功',
    data
  };
});

// 获取轮播图
router.get('/getBanner.do', async (ctx, next) => {
  const data = await Banner.findAll({
    attributes: [
      'id',
      ['banner_url', 'bannerUrl'],
      'linkType',
      'link'
    ],
    limit: 9,
    sort: ['sort'],
    where: {
      state: 1
    }
  });

  ctx.body = {
    code: '200',
    message: '成功',
    data
  };
});

// 推荐歌单
router.get('/getRecommendPlayerList.do', async (ctx, next) => {
  // 建立关系
  const include = [{
    association: Playlist.belongsTo(User, {foreignKey: 'user_id'}),
    required: true,
    attributes: []
  }];

  const data = await Playlist.findAll({
    attributes: [
      'id',
      [Sequelize.col('User.username'), 'singer'],
      ['playlist_name', 'recordName'],
      'cover',
      ['song_ids', 'songIds'],
      ['listen_total', 'total'],
      'createAt',
      'updateAt'
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