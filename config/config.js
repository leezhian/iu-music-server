module.exports = {
  // 模式 dev开发 prod生产
  mode: 'dev',
  // 数据库配置
  database: {
    dbName: 'iu-music_db',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  // token相关
  security: {
    // 私钥
    secretKey: 'iu-music-19930516_kim',
    // 过期时间
    expiresIn: 60 * 60 * 2
  }
}