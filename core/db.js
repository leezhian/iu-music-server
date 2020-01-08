/**
 * 连接数据库
 */
const Sequelize = require('sequelize');
// 获取数据库配置
const {dbName, host, port, user, password} = require('../config/config').database;
const isDev = global.config.mode === 'dev';

// sequelize接收4个参数：
// 1. dbName 数据库名
// 2. user 账号
// 3. password 密码
// 4. 对象（其他配置）
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  // 在控制台打印数据库每次操作
  logging: isDev,
  // 时区
  timezone: '+08:00',
  dialectOptions: {
    // 字符集
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  define: {
    // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
    timestamps: false
  }
});

sequelize.sync({
  force: false
});

module.exports = {
  sequelize
}